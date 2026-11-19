"use client";

import React from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    step: 1,
    title: "Browse & Compare",
    desc: "Explore verified equipment across 6 categories and 64 districts.",
  },
  {
    step: 2,
    title: "Book with Escrow",
    desc: "Reserve your gear. Funds are held securely until check-in.",
  },
  {
    step: 3,
    title: "Delivery & Use",
    desc: "Equipment delivered to your site. Use it for your project.",
  },
  {
    step: 4,
    title: "Confirm & Release",
    desc: "Confirm receipt. Escrow releases payment to the owner.",
  },
];

/**
 * "How It Works" section for the home page.
 *
 * Four numbered steps in a responsive grid. Each step has a bold orange
 * number circle, title, and description. Animates in on scroll.
 */
export default function HowItWorks() {
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
            How It Works
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Simple 4-step process to rent equipment securely
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
            >
              <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-black text-sm mb-4">
                {step.step}
              </div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
                {step.title}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}