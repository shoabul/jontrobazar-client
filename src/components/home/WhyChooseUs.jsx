"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle, Truck, Headphones } from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "Verified Owners",
    desc: "Every seller passes our business verification check.",
  },
  {
    icon: CheckCircle,
    title: "Quality Assured",
    desc: "Equipment fitness certificates and maintenance logs.",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    desc: "Direct transport to your project site across 64 districts.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Local dispatch team available around the clock.",
  },
];

/**
 * "Why Choose Us" section for the home page.
 *
 * Four value-promise cards with orange-accent icon boxes.
 * Animates in on scroll via framer-motion.
 */
export default function WhyChooseUs() {
  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#090d16] border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            Why Choose JontroBazar
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Built for Bangladesh&apos;s industrial and commercial needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
