"use client";

import React from "react";
import Hero from "@/app/components/home/Hero";
import FeaturedSection from "@/app/components/home/FeaturedSection";
import CategoriesGrid from "@/app/components/home/CategoriesGrid";
import WhyChooseUs from "@/app/components/home/WhyChooseUs";
import HowItWorks from "@/app/components/home/HowItWorks";
import CustomerReviews from "@/app/components/home/CustomerReviews";
import RecentlyAdded from "@/app/components/home/RecentlyAdded";

/**
 * Home page — thin orchestrator that composes all sections.
 *
 * Each section is a self-contained component with its own data fetching,
 * animations, and styling. This keeps page.js clean and maintainable.
 */
export default function Home() {
  return (
    <div className="w-full flex flex-col items-center font-sans">
      <Hero />
      <FeaturedSection />
      <CategoriesGrid />
      <WhyChooseUs />
      <HowItWorks />
      <CustomerReviews />
      <RecentlyAdded />
    </div>
  );
}