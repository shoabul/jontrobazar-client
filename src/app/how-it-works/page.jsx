"use client";

import React from "react";
import { motion } from "framer-motion";


const STEPS = [
  {
    step: 1,
    icon: "🔍",
    title: "Browse & Compare",
    desc: "Explore verified equipment across 6 categories and 64 districts. Filter by location, price, rental type, and availability. Compare specs side-by-side.",
    details: [
      "6 main categories: Construction, Photography, Vehicles & Transport, Agriculture, Electronics, Event Equipment",
      "Real-time availability with quantity tracking",
      "Detailed specs: brand, model, condition, terms"
    ]
  },
  {
    step: 2,
    icon: "💳",
    title: "Book with Escrow Protection",
    desc: "Reserve your gear for specific dates. Funds are held securely in Stripe-powered escrow until you confirm check-in. No money changes hands until equipment is in your possession.",
    details: [
      "Stripe Checkout for secure payments",
      "Escrow holds funds until delivery confirmation",
      "Flexible rental: daily, weekly, or monthly rates",
      "Automatic total calculation (days × price × quantity)"
    ]
  },
  {
    step: 3,
    icon: "🚚",
    title: "Delivery & Use",
    desc: "Equipment delivered to your site or pickup from owner's yard. Use it for your project with full terms & conditions. Owner contact details provided after booking.",
    details: [
      "Site delivery available across major districts",
      "Direct owner coordination for pickup/return",
      "Terms & conditions clearly listed per listing",
      "24/7 dispatch support: +880 9613-882200"
    ]
  },
  {
    step: 4,
    icon: "✅",
    title: "Confirm & Release Payment",
    desc: "After project completion, confirm equipment return. Escrow releases payment to the owner. Both parties leave reviews. Dispute resolution available if needed.",
    details: [
      "Quick confirmation via dashboard",
      "Automatic payment release to owner",
      "Review system builds trust in marketplace",
      "Admin mediation for disputes"
    ]
  },
];

const FOR_CUSTOMERS = [
  { title: "Verified Equipment", desc: "Every listing approved by admin. Real photos, real specs." },
  { title: "Escrow Security", desc: "Your money protected until you confirm delivery." },
  { title: "Wide Selection", desc: "6 categories, 64 districts, thousands of items." },
  { title: "Flexible Terms", desc: "Daily, weekly, monthly rentals. Pay for what you use." },
];

const FOR_OWNERS = [
  { title: "Easy Listing", desc: "Add equipment in minutes. Set your own prices & terms." },
  { title: "Guaranteed Payment", desc: "Escrow ensures you get paid after confirmed rental." },
  { title: "Dashboard Analytics", desc: "Track earnings, bookings, and equipment performance." },
  { title: "Verified Customers", desc: "Only authenticated users can book your gear." },
];

export default function HowItWorksPage() {
  return (
    <div className="w-full min-h-screen flex flex-col">

      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white dark:from-[#0a0e17] dark:to-[#0c1017] border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight"
            >
              How It <span className="text-orange-500">Works</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
            >
              Rent heavy gear & machinery securely in 4 simple steps. Escrow protection for every transaction.
            </motion.p>
          </div>
        </section>

        {/* 4-Step Process */}
        <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0c1017]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {STEPS.map((step, idx) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Step Number & Icon */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-orange-500/30">
                      {step.step}
                    </div>
                    <div className="pt-1">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Details List */}
                  <div className="mt-4 ml-18 border-l-2 border-orange-500/30 pl-4 space-y-2">
                    {step.details.map((detail, dIdx) => (
                      <motion.div
                        key={dIdx}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + dIdx * 0.05, duration: 0.3 }}
                        className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                      >
                        <span className="text-orange-500 shrink-0 mt-0.5">→</span>
                        <span>{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits for Customers & Owners */}
        <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-[#0a0e17] border-y border-neutral-200 dark:border-neutral-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* For Customers */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/80 flex items-center justify-center text-orange-600 dark:text-orange-400 text-sm font-black">👷</span>
                  For Customers
                </h2>
                <div className="space-y-4">
                  {FOR_CUSTOMERS.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08, duration: 0.4 }}
                      className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-orange-300 dark:hover:border-orange-800 transition-colors"
                    >
                      <h3 className="font-bold text-neutral-900 dark:text-white">{item.title}</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* For Owners */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-sm font-black">🏗️</span>
                  For Equipment Owners
                </h2>
                <div className="space-y-4">
                  {FOR_OWNERS.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08, duration: 0.4 }}
                      className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors"
                    >
                      <h3 className="font-bold text-neutral-900 dark:text-white">{item.title}</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0c1017]">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                Everything you need to know about renting on JontroBazar
              </p>
            </motion.div>

            <div className="space-y-4">
              {[
                { q: "How does escrow protect me?", a: "Your payment is held by Stripe until you confirm the equipment has been delivered and matches the listing. Only then is payment released to the owner." },
                { q: "What if equipment is damaged during rental?", a: "Owners specify terms & conditions. Damage beyond normal wear is handled per the agreement. Both parties can raise disputes for admin mediation." },
                { q: "Can I extend my rental period?", a: "Yes, if the equipment is available. Contact the owner through the dashboard to arrange an extension and additional payment." },
                { q: "What are the rental types?", a: "Daily, weekly, and monthly rates. Weekly gives ~15% discount, monthly ~30% off daily rate. Prices shown per unit." },
                { q: "How do I become a verified owner?", a: "Register as an owner, add equipment listings. Admin reviews and approves your listings. Verified badge appears on your profile and listings." },
                { q: "Is delivery available everywhere?", a: "Major districts (Dhaka, Chattogram, Gazipur, Sylhet) have partner logistics. Other locations coordinate directly with the owner for pickup/delivery." },
              ].map((faq, idx) => (
                <motion.details
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  className="group bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <h3 className="font-semibold text-neutral-900 dark:text-white pr-8">{faq.q}</h3>
                    <span className="text-orange-500 font-bold text-xl">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed border-t border-neutral-200 dark:border-neutral-800">
                    {faq.a}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-orange-700">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
              Ready to Rent or List Equipment?
            </h2>
            <p className="text-orange-100 mb-6">
              Join thousands of contractors, studios, and agribusinesses on Bangladesh's trusted equipment marketplace.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/equipment"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white text-orange-600 font-bold text-sm hover:bg-orange-50 transition-colors shadow-lg"
              >
                Browse Equipment
              </a>
              <a
                href="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg border-2 border-white text-white font-bold text-sm hover:bg-white/10 transition-colors"
              >
                List Your Gear
              </a>
            </div>
          </div>
        </section>
      </main>


    </div>
  );
}