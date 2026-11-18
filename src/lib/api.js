"use client";

import { useAuth } from "../context/AuthContext";
import { showToast } from "./notify";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Core fetch wrapper.
 * - Injects JWT from AuthContext (Bearer token)
 * - Handles 401 → sign out + redirect to login
 * - Handles 403 → role-based error toast
 * - Handles 500 → generic error toast
 * - Shows SweetAlert toasts on success/error
 *
 * Usage:
 *   const data = await api("/equipment/featured");
 *   const res  = await api("/equipment", { method: "POST", body: {...} });
 */
export async function apiFetch(path, options = {}, token = null) {
  const url = path.startsWith("http")
    ? path
    : `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let res;
  try {
    res = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });
  } catch (err) {
    // Network failure (server down, CORS block, etc.)
    showToast("error", "Cannot reach server. Please check your connection.");
    throw err;
  }

  // 401 — token expired or invalid
  if (res.status === 401) {
    showToast("error", "Session expired. Please log in again.");
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("Unauthorized");
  }

  // 403 — forbidden (wrong role)
  if (res.status === 403) {
    const data = await res.json().catch(() => ({}));
    showToast("error", data.message || "Access denied. Insufficient permissions.");
    throw new Error("Forbidden");
  }

  // 500 — server error
  if (res.status >= 500) {
    showToast("error", "Server error. Please try again later.");
    throw new Error("Server error");
  }

  return res;
}

/**
 * React hook: returns { api, token, isLoading }
 * api() calls automatically include the current JWT.
 */
export function useApi() {
  const { token, getToken, isLoading } = useAuth();

  const call = async (path, options = {}) => {
    const currentToken = token || (await getToken());
    return apiFetch(path, options, currentToken);
  };

  return { api: call, token, isLoading };
}