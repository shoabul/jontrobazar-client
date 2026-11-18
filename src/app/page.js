import React from "react";
import Link from "next/link";
import { Wrench, Shield, CheckCircle, ArrowRight, Truck } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center font-sans">
      {/* HERO SECTION PREVIEW */}
      <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50/40 via-white to-white dark:from-[#0f1422] dark:via-[#090d16] dark:to-[#090d16] border-b border-neutral-200 dark:border-neutral-800/80">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-900/60 text-orange-700 dark:text-orange-400 text-xs font-bold tracking-wide shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            Bangladesh&apos;s #1 Equipment Rental Network
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight sm:leading-none">
            Rent Heavy Gear &amp; Machinery <br />
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
        </div>
      </section>
    </div>
  );
}
