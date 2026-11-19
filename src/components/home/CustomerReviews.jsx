"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Rahim Ahmed",
    role: "Construction Contractor",
    rating: 5,
    comment:
      "JontroBazar made renting an excavator incredibly easy. Verified owner, smooth payment, and the machine was delivered on time.",
  },
  {
    name: "Fatima Khan",
    role: "Event Manager",
    rating: 5,
    comment:
      "Rented sound systems for a corporate event. The escrow system gave us peace of mind. Highly recommended!",
  },
  {
    name: "Karim Hassan",
    role: "Film Producer",
    rating: 5,
    comment:
      "Found cinema cameras and lighting gear all in one place. Owners are responsive and equipment is well-maintained.",
  },
  {
    name: "Nasrin Akter",
    role: "Agribusiness Owner",
    rating: 5,
    comment:
      "Harvester combines available right when we needed them. The platform is trustworthy and the support team is helpful.",
  },
];

/**
 * Customer Reviews section for the home page.
 *
 * Four review cards with star ratings, quoted comment, name, and role.
 * Meets the "min 4 reviews" requirement. Animates in on scroll.
 */
export default function CustomerReviews() {
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
            What Our Customers Say
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Trusted by contractors, studios, and businesses nationwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-orange-500 text-orange-500"
                  />
                ))}
              </div>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div>
                <div className="text-sm font-bold text-neutral-900 dark:text-white">
                  {review.name}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {review.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}