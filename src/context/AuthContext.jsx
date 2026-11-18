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

  // Retrieve JWT from BetterAuth endpoint
  const fetchToken = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/token");
      if (res.ok) {
        const data = await res.json();
        if (data?.token) {
          setToken(data.token);
          return data.token;
        }
      }
    } catch (err) {
      console.warn("Could not retrieve JWT token from BetterAuth:", err);
    }
    return null;
  }, []);

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

    fetch("/api/auth/token")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data?.token) {
          setToken(data.token);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [sessionData]);

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
