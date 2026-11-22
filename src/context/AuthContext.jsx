"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut as betterAuthSignOut } from "@/lib/auth-client";
// import { authClient } from "@/lib/auth-client";


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
 * Fetch the BetterAuth session directly from cookies.
 * Uses a direct fetch call (not the React hook) so it works
 * even on page reload before React has finished hydrating.
 */
async function getSessionFromCookies() {
  try {
    const res = await fetch("/api/auth/get-session", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.user) return data.user;
    }
  } catch (err) {
    console.warn("Could not read session from cookies:", err);
  }
  return null;
}

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
  const [ssrUser, setSsrUser] = useState(null);
  const [ssrChecked, setSsrChecked] = useState(false);

  /**
   * Get the Express JWT token.
   * - If a token is cached, return it immediately.
   * - Otherwise, fetch the BetterAuth session from cookies (bypassing
   *   React state) and exchange it for a JWT. This works on page reload
   *   even before `useSession` has resolved.
   */
  const getToken = useCallback(async () => {
    // Try the cached token first
    if (token) return token;
    
    // Fallback: read session directly from cookies (works on reload)
    const ssr = await getSessionFromCookies();
    if (ssr) {
      const t = await exchangeSessionForJWT(ssr);
      if (t) {
        setToken(t);
        return t;
      }
    }

    // Final fallback: use SSR user if we have it
    if (ssrUser) {
      const t = await exchangeSessionForJWT(ssrUser);
      if (t) {
        setToken(t);
        return t;
      }
    }

    return null;
  }, [token, sessionData?.user, ssrUser]);

  // On mount, fetch session from cookies for immediate SSR-compatible auth
  useEffect(() => {
    let isMounted = true;
    getSessionFromCookies().then((ssr) => {
      if (isMounted && ssr) {
        setSsrUser(ssr);
      }
      if (isMounted) setSsrChecked(true);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Keep token in sync with React session when it resolves
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
      setSsrUser(null);
      setSsrChecked(false);
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  // Prefer SSR user until React session resolves
  const user = sessionData?.user ?? ssrUser;
  const role = user?.role || "customer";
  // Don't wait for isPending if we already have a valid SSR user
  const isLoading = (!ssrUser && isPending) || !ssrChecked;

  return (
    <AuthContext.Provider
      value={{
        user,
        session: sessionData?.session || null,
        token,
        role: user ? role : "visitor",
        isPending: isPending,
        isLoading,
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