"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Wrench, Heart, Package, ArrowRight } from "lucide-react";

/**
 * Customer Dashboard Overview
 *
 * Minimal landing page for logged-in customers. Quick-access cards route to
 * the full table views (My Rentals, Favorites, Profile) which are built out
 * later in the dashboard phase.
 */
export default function CustomerDashboardPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
          Customer Overview
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Welcome back! Track your rentals, saved items, and profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          onClick={() => router.push("/dashboard/customer/rentals")}
          className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-amber-500 cursor-pointer transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center font-bold mb-4">
            <Package className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            My Rentals
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            View active and past equipment bookings.
          </p>
        </div>

        <div
          onClick={() => router.push("/dashboard/customer/favorites")}
          className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-amber-500 cursor-pointer transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center font-bold mb-4">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            Favorites
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Saved equipment you bookmarked for later.
          </p>
        </div>

        <div
          onClick={() => router.push("/dashboard/customer/profile")}
          className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-amber-500 cursor-pointer transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center font-bold mb-4">
            <Wrench className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            Profile
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Update your name, phone, address, and photo.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Browse Equipment
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Find verified machinery and gear across 64 districts.
            </p>
          </div>
          <button
            onClick={() => router.push("/equipment")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold transition-colors"
          >
            Explore Fleet
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}