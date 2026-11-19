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

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const { data: sessionData, isPending, refetch } = useSession();
  const [token, setToken] = useState(null);

  // Exchange BetterAuth session for Express-compatible JWT
  const fetchToken = useCallback(async () => {
    if (!sessionData?.user) return null;
    try {
      const res = await fetch(`${API_BASE}/users/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: sessionData.user.email,
          role: sessionData.user.role || "customer",
          name: sessionData.user.name || "User",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.token) {
          setToken(data.token);
          return data.token;
        }
      }
    } catch (err) {
      console.warn("Could not retrieve JWT token from Express:", err);
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

    fetchToken();

    return () => {
      isMounted = false;
    };
  }, [fetchToken]);

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
        getToken: fetchToken,
        signOutUser,
        refreshSession: refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
