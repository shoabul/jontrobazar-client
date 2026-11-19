"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wrench,
  Shield,
  CheckCircle,
  ArrowRight,
  Truck,
  Clock,
  Star,
  Zap,
  Award,
  Headphones,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { apiFetch } from "../lib/api";

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

const HOW_IT_WORKS = [
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

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const res = await apiFetch("/equipment/featured");
        const data = await res.json();
        if (data.success) {
          setFeatured(data.data || []);
        }
      } catch (err) {
        console.error("Failed to load featured equipment:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

  return (
    <div className="w-full flex flex-col items-center font-sans">
      {/* HERO SECTION */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50/40 via-white to-white dark:from-[#0f1422] dark:via-[#090d16] dark:to-[#090d16] border-b border-neutral-200 dark:border-neutral-800/80">
        <motion.div
          className="max-w-5xl mx-auto text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-900/60 text-orange-700 dark:text-orange-400 text-xs font-bold tracking-wide shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            Bangladesh&apos;s #1 Equipment Rental Network
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight sm:leading-none">
            Rent Heavy Gear &amp; Machinery{" "}
            <br />
            <span className="text-orange-600 dark:text-orange-500">
              Across 64 Districts
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            From excavators and cranes to cinema broadcast cameras and harvester
            combines. Verified fleet owners, escrow security, and guaranteed
            site delivery.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link
              href="/equipment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-sm shadow-md shadow-orange-600/25 transition-all"
            >
              Explore Equipment Fleet
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-850 text-neutral-800 dark:text-neutral-200 font-semibold text-sm transition-colors"
            >
              How It Works
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <Shield className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Verified Fleet Only
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Every machine tested with fitness certification.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <Truck className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Site Delivery Available
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Direct dispatch to project yards nationwide.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <CheckCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Secure Escrow Stripe
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Funds released only upon confirmed equipment check-in.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FEATURED EQUIPMENT SECTION */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#090d16] border-b border-neutral-200 dark:border-neutral-800">
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
                Featured Equipment
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Top verified listings from trusted owners
              </p>
            </div>
            <Link
              href="/equipment"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 animate-pulse h-64"
                  />
                ))
              : featured.map((item, idx) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <Link href={`/equipment/${item._id}`}>
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
                  </motion.div>
                ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link
              href="/equipment"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold transition-colors"
            >
              View All Equipment
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
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

      {/* WHY CHOOSE US SECTION */}
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
            {[
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
            ].map((item, idx) => (
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

      {/* HOW IT WORKS SECTION */}
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
            {HOW_IT_WORKS.map((step, idx) => (
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

      {/* CUSTOMER REVIEWS SECTION */}
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

      {/* RECENTLY ADDED SECTION */}
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
                    className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <Link href={`/equipment/${item._id}`}>
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
                          <TrendingUp className="w-3 h-3" />
                          New Arrival
                        </div>
                      </div>
                    </Link>
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
    </div>
  );
}
