"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Truck, Wrench, Users, Package } from "lucide-react";

/**
 * Owner Dashboard Overview
 *
 * Displays key metrics and quick access cards for owner workflows.
 */
export default function OwnerDashboardPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
          Owner Overview
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Welcome back! Manage your equipment fleet and incoming rentals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          onClick={() => router.push("/dashboard/owner/equipment")}
          className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-orange-500 cursor-pointer transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center font-bold mb-4">
            <Package className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            My Equipment
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            View, update, or remove listed machinery.
          </p>
        </div>

        <div
          onClick={() => router.push("/dashboard/owner/add-equipment")}
          className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-orange-500 cursor-pointer transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center font-bold mb-4">
            <Wrench className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            Add Equipment
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            List new equipment for rent with imgbb photos.
          </p>
        </div>

        <div
          onClick={() => router.push("/dashboard/owner/rentals")}
          className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-orange-500 cursor-pointer transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center font-bold mb-4">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            Rentals
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Monitor active customer bookings and schedules.
          </p>
        </div>

        <div
          onClick={() => router.push("/dashboard/owner/profile")}
          className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-orange-500 cursor-pointer transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center font-bold mb-4">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            Profile
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Manage your profile details and contact info.
          </p>
        </div>
      </div>
    </div>
  );
}