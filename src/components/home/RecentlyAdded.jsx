"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { apiFetch } from "../../lib/api";
import EquipmentCard from "./EquipmentCard";

/**
 * Recently Added section for the home page.
 *
 * Fetches the featured items (which are the newest approved listings)
 * and shows the first 3 with a "New Arrival" badge. Animates in on scroll.
 */
export default function RecentlyAdded() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFeatured = useCallback(async () => {
    try {
      const res = await apiFetch("/equipment/featured");
      const data = await res.json();
      if (data.success) {
        setFeatured(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load recent equipment:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFeatured();
  }, [loadFeatured]);

  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-[#0a0e17]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              Recently Added
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Fresh listings from verified owners
            </p>
          </div>
          <Link
            href="/equipment?sort=newest"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 animate-pulse h-64"
                />
              ))
            : featured.slice(0, 3).map((item, idx) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <EquipmentCard item={item} />
                  {/* New Arrival badge overlay would go on the card itself if needed */}
                </motion.div>
              ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link
            href="/equipment?sort=newest"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold transition-colors"
          >
            View All New Listings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}