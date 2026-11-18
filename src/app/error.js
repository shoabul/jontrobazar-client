"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] w-full flex flex-col items-center justify-center p-6 text-center bg-white dark:bg-[#090d16] transition-colors">
      <div className="w-20 h-20 rounded-2xl bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900 flex items-center justify-center text-red-600 dark:text-red-400 mb-6 shadow-sm">
        <AlertTriangle className="w-10 h-10" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight mb-2">
        Something Went Wrong
      </h1>

      <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400 mb-6">
        An unexpected error occurred while processing this request. Our technical
        dispatch has been notified.
      </p>

      {error?.message && (
        <div className="max-w-md w-full mb-6 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-left">
          <p className="text-xs font-mono text-neutral-700 dark:text-neutral-300 break-words">
            {error.message}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold shadow-sm transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-sm font-semibold transition-colors"
        >
          <Home className="w-4 h-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
