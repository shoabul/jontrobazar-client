"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wrench,
  Clock,
  Truck,
  Zap,
  Award,
  Headphones,
} from "lucide-react";

const CATEGORIES = [
  {
    name: "Construction",
    icon: Wrench,
    iconBox: "bg-orange-100 dark:bg-orange-950/40 text-orange-600",
  },
  {
    name: "Photography",
    icon: Clock,
    iconBox: "bg-blue-100 dark:bg-blue-950/40 text-blue-600",
  },
  {
    name: "Vehicles & Transportation",
    icon: Truck,
    iconBox: "bg-purple-100 dark:bg-purple-950/40 text-purple-600",
  },
  {
    name: "Agriculture",
    icon: Zap,
    iconBox: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600",
  },
  {
    name: "Electronics",
    icon: Award,
    iconBox: "bg-pink-100 dark:bg-pink-950/40 text-pink-600",
  },
  {
    name: "Event Equipment",
    icon: Headphones,
    iconBox: "bg-cyan-100 dark:bg-cyan-950/40 text-cyan-600",
  },
];

/**
 * Category grid section for the home page.
 *
 * Six cards linking to filtered equipment views. Each card has a color-coded
 * icon box, name label, and hover border accent. Animates in on scroll.
 */
export default function CategoriesGrid() {
  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-[#0a0e17] border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            Browse by Category
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Find the right equipment for your industry
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <Link
                href={`/equipment?category=${encodeURIComponent(cat.name)}`}
                className="group p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-orange-500 dark:hover:border-orange-500 transition-all text-center"
              >
                <div
                  className={`w-12 h-12 mx-auto rounded-xl ${cat.iconBox} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                >
                  <cat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-bold text-neutral-900 dark:text-white">
                  {cat.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
