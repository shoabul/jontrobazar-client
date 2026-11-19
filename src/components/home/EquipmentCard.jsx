"use client";

import React from "react";
import Link from "next/link";
import { Wrench, MapPin } from "lucide-react";

/**
 * Shared equipment card used by FeaturedSection and RecentlyAdded.
 *
 * Renders an image, name, category, price + rental type, and location.
 * Pure presentational component — all data comes from props.
 */
export default function EquipmentCard({ item }) {
  return (
    <Link
      href={`/equipment/${item._id}`}
      className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
        {item.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400">
            <Wrench className="w-12 h-12" />
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-neutral-900 dark:text-white truncate">
          {item.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {item.category}
          </span>
          <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
            ৳{item.price?.toLocaleString()}
            <span className="text-xs font-normal text-neutral-500">
              /{item.rentalType}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <MapPin className="w-3 h-3" />
          {item.location}
        </div>
      </div>
    </Link>
  );
}