"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

/**
 * Dashboard guard component.
 * Redirects to /login if user is not authenticated.
 * Shows a minimal loading skeleton while checking auth state.
 */
export default function DashboardGuard({ children }) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
      router.refresh();
    }
  }, [user, isLoading, router]);

  // Show loading state while auth is being verified
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-[#090d16] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-10 h-10 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">
            Verifying session…
          </p>
        </motion.div>
      </div>
    );
  }

  // Not authenticated - redirecting (this shouldn't render but just in case)
  if (!user) {
    return null;
  }

  return <>{children}</>;
}