"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Wrench,
  Truck,
  ShieldCheck,
  Settings,
  ArrowRight,
} from "lucide-react";

/**
 * Admin Dashboard Overview
 *
 * Quick-access cards into admin workflows: user management, equipment
 * moderation, rental monitoring, and platform settings.
 */
export default function AdminDashboardPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
          Admin Overview
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Monitor platform activity and moderate marketplace content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          onClick={() => router.push("/dashboard/admin/users")}
          className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-purple-500 cursor-pointer transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center font-bold mb-4">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            Users
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            View accounts and change roles across the platform.
          </p>
        </div>

        <div
          onClick={() => router.push("/dashboard/admin/equipment")}
          className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-purple-500 cursor-pointer transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center font-bold mb-4">
            <Wrench className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            Equipment
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Approve, reject, update, or remove every listing.
          </p>
        </div>

        <div
          onClick={() => router.push("/dashboard/admin/rentals")}
          className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-purple-500 cursor-pointer transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center font-bold mb-4">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            Rentals
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Monitor all bookings and payment status platform-wide.
          </p>
        </div>

        <div
          onClick={() => router.push("/dashboard/admin/settings")}
          className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-purple-500 cursor-pointer transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center font-bold mb-4">
            <Settings className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            Settings
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Platform configuration and preferences.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Browse Marketplace
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Review approved listings as a logged-in admin.
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