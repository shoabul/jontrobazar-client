"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut as betterAuthSignOut } from "../lib/auth-client";
import { getSession } from "../lib/auth-client";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const AuthContext = createContext({
  user: null,
  session: null,
  token: null,
  role: "visitor",
  isLoading: true,
  getToken: async () => null,
  signOutUser: async () => {},
  refreshSession: () => {},
});

/**
 * Exchange a BetterAuth user for an Express-compatible JWT.
 * Reads the session from cookies (not React state), so it works
 * even on page reload before React has finished hydrating.
 */
async function exchangeSessionForJWT(user) {
  if (!user) return null;
  try {
    const res = await fetch(`${API_BASE}/users/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: user.email,
        role: user.role || "customer",
        name: user.name || "User",
      }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.token) return data.token;
    }
  } catch (err) {
    console.warn("Could not retrieve JWT token from Express:", err);
  }
  return null;
}

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const { data: sessionData, isPending, refetch } = useSession();
  const [token, setToken] = useState(null);

  /**
   * Get the Express JWT token.
   * - If a token is cached, return it immediately.
   * - Otherwise, fetch the BetterAuth session from cookies (bypassing
   *   React state) and exchange it for a JWT. This works on page reload
   *   even before `useSession` has resolved.
   */
  const getToken = useCallback(async () => {
    // Try the cached token first
    if (sessionData?.user) {
      return exchangeSessionForJWT(sessionData.user);
    }
    // Fallback: read session directly from cookies (works on reload)
    const ssr = await getSession();
    if (ssr?.user) {
      const t = await exchangeSessionForJWT(ssr.user);
      if (t) setToken(t);
      return t;
    }
    return null;
  }, [sessionData?.user]);

  useEffect(() => {
    let isMounted = true;

    if (!sessionData?.user) {
      queueMicrotask(() => {
        if (isMounted) setToken(null);
      });
      return () => {
        isMounted = false;
      };
    }

    exchangeSessionForJWT(sessionData.user).then((t) => {
      if (isMounted && t) setToken(t);
    });

    return () => {
      isMounted = false;
    };
  }, [sessionData?.user]);

  const signOutUser = async () => {
    try {
      await betterAuthSignOut();
      setToken(null);
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const user = sessionData?.user || null;
  const role = user?.role || "customer";

  return (
    <AuthContext.Provider
      value={{
        user,
        session: sessionData?.session || null,
        token,
        role: user ? role : "visitor",
        isPending: isPending,
        isLoading: isPending,
        getToken,
        signOutUser,
        refreshSession: refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
