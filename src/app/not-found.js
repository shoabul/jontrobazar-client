import React from "react";
import Link from "next/link";
import { Wrench, Home, ArrowRight, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] w-full flex flex-col items-center justify-center p-6 text-center bg-white dark:bg-[#090d16] transition-colors">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-3xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-xl">
          <Wrench className="w-12 h-12 text-orange-500 -rotate-45" />
        </div>
        <span className="absolute -bottom-2 -right-2 px-2.5 py-1 text-xs font-black bg-orange-600 text-white rounded-md shadow">
          404
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight mb-3">
        Equipment Or Page Not Found
      </h1>

      <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
        The equipment listing, rental portal, or page you are looking for might
        have been relocated, decommissioned, or never existed in the fleet.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm justify-center">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold shadow-sm shadow-orange-600/20 transition-all"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
        <Link
          href="/equipment"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-sm font-semibold transition-colors"
        >
          <Search className="w-4 h-4 text-orange-500" />
          Browse Equipment
        </Link>
      </div>
    </div>
  );
}
