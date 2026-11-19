"use client";

import React from "react";
import Hero from "@/components/home/Hero";
import FeaturedSection from "@/components/home/FeaturedSection";
import CategoriesGrid from "@/components/home/CategoriesGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import CustomerReviews from "@/components/home/CustomerReviews";
import RecentlyAdded from "@/components/home/RecentlyAdded";

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