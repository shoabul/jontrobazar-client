"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "../../lib/auth-client";
import { showToast, showAlert } from "../../lib/notify";
import {
  Wrench,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Email / Password Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      showToast("error", "Please provide both email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await signIn.email({
        email: email.trim().toLowerCase(),
        password,
      });

      if (res?.error) {
        showToast("error", res.error.message || "Invalid credentials.");
        return;
      }

      showToast("success", "Logged in successfully!");
      router.push(redirectTarget);
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      showToast("error", err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Google Social Login
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await signIn.social({
        provider: "google",
        callbackURL: redirectTarget,
      });
    } catch (err) {
      console.error("Google sign in error:", err);
      showToast("error", "Failed to initiate Google authentication.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-white dark:bg-[#0c1017] p-8 sm:p-10 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl dark:shadow-neutral-950/50">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex w-12 h-12 rounded-xl bg-neutral-950 dark:bg-neutral-900 border border-neutral-800 items-center justify-center shadow-sm">
          <Wrench className="w-6 h-6 text-orange-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
          Welcome Back
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          Sign in to access your rentals, listings, or dispatch dashboard
        </p>
      </div>

      {/* Google Social Login Button */}
      <div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-850 text-neutral-700 dark:text-neutral-200 text-sm font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>
            {googleLoading ? "Connecting Google..." : "Continue with Google"}
          </span>
        </button>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200 dark:border-neutral-800" />
          </div>
          <span className="relative px-3 bg-white dark:bg-[#0c1017] text-neutral-400 text-xs uppercase tracking-wider font-semibold">
            Or with email
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleEmailLogin} className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor="login-email"
            className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="login-password"
            className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your account password"
              className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-neutral-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || googleLoading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-orange-600/20 transition-all cursor-pointer mt-2"
        >
          {loading ? (
            <span>Signing in...</span>
          ) : (
            <>
              <span>Sign In to Account</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Register Link */}
      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 text-center">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          New to JontroBazar?{" "}
          <Link
            href="/register"
            className="text-orange-600 dark:text-orange-400 font-bold hover:underline"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50/20 via-white to-white dark:from-[#0d121c] dark:via-[#090d16] dark:to-[#090d16] transition-colors">
      <Suspense
        fallback={
          <div className="p-8 text-center text-sm text-neutral-500">
            Loading login form...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
