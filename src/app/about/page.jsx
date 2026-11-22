"use client";

import React from "react";
import { motion } from "framer-motion";

import { ShieldCheck, Users, MapPin, Building2, Award, Zap, Globe, Heart } from "lucide-react";

const VALUES = [
  { icon: ShieldCheck, title: "Trust First", desc: "Every owner verified. Every listing approved. Escrow on every transaction." },
  { icon: Users, title: "Community Driven", desc: "Built for Bangladesh's contractors, studios, and agribusinesses. Local knowledge, global standards." },
  { icon: MapPin, title: "Nationwide Reach", desc: "64 districts covered. From Dhaka shipyards to Sylhet tea estates — equipment where you need it." },
  { icon: Zap, title: "Speed & Simplicity", desc: "Book in minutes. Pay securely. Get to work. No paperwork maze, no hidden fees." },
  { icon: Heart, title: "Owner Success", desc: "Your earnings protected. Your fleet visible. Your business growing. We win when you win." },
  { icon: Award, title: "Quality Assured", desc: "Condition ratings, real photos, detailed specs. What you see is what you rent." },
];

const TEAM = [
  { name: "Rashid Hassan", role: "Founder & CEO", bio: "15+ years in heavy equipment logistics. Former operations at major Dhaka construction firms." },
  { name: "Tanvir Ahmed", role: "CTO", bio: "Full-stack architect. Built payment & marketplace systems for fintech startups in BD & SG." },
  { name: "Farhana Islam", role: "Head of Operations", bio: "Managed fleet operations for top rental companies. Expert in owner onboarding & compliance." },
  { name: "Karim Uddin", role: "Business Development", bio: "Connected 200+ verified owners in Year 1. Deep network across construction & event sectors." },
];

const STATS = [
  { label: "Verified Owners", value: "200+" },
  { label: "Equipment Listings", value: "1,500+" },
  { label: "Completed Rentals", value: "3,200+" },
  { label: "Districts Covered", value: "64" },
];

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen flex flex-col">

      
      <main className="flex-1">
        {/* Hero */}
        <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white dark:from-[#0a0e17] dark:to-[#0c1017] border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-6 border border-orange-200 dark:border-orange-900"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>Bangladesh's Trusted Equipment Rental Network</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight"
            >
              About <span className="text-orange-500">JontroBazar</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed"
            >
              Connecting verified fleet owners with the contractors, studios, and agribusinesses that power Bangladesh's growth. 
              Secure. Transparent. Local.
            </motion.p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0c1017]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl font-black text-neutral-900 dark:text-white mb-4"
                >
                  Our Mission
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4"
                >
                  To democratize access to professional-grade equipment across Bangladesh. Whether you're building a high-rise in Gulshan, 
                  filming a commercial in Chattogram, or harvesting rice in Sylhet — the right gear should be a few clicks away, 
                  not weeks of phone calls and uncertainty.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed"
                >
                  We eliminate the trust gap with verified listings, escrow-protected payments, and a review system that keeps everyone honest. 
                  Owners get guaranteed payment; renters get peace of mind.
                </motion.p>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border border-orange-200 dark:border-orange-900"
                >
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-orange-500" />
                    Our Vision
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    To become Bangladesh's default equipment marketplace — where every contractor, studio, and farm finds what they need, 
                    when they need it, at a fair price. A platform that grows the local rental economy and powers the nation's infrastructure.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-neutral-900 dark:bg-[#0a0e17]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {STATS.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="text-center"
                >
                  <div className="text-4xl sm:text-5xl font-black text-orange-400 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-400 mt-1 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0c1017]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-black text-neutral-900 dark:text-white">
                Our Core Values
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2 max-w-xl mx-auto">
                Every decision we make flows from these principles
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {VALUES.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-orange-300 dark:hover:border-orange-800 transition-colors h-full"
                  >
                    <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/80 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {value.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-[#0a0e17] border-y border-neutral-200 dark:border-neutral-800">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-black text-neutral-900 dark:text-white">
                The Team Behind JontroBazar
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                Experienced operators, builders, and technologists from Bangladesh's equipment ecosystem
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map((member, idx) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-black text-2xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="font-bold text-neutral-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-orange-600 dark:text-orange-400 font-semibold mb-2">{member.role}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0c1017]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-orange-500" />
                    Company Information
                  </h3>
                  <dl className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                      <dt className="font-semibold text-neutral-900 dark:text-white">Legal Name:</dt>
                      <dd>JontroBazar Technologies Ltd.</dd>
                      <dt className="font-semibold text-neutral-900 dark:text-white">Trade License:</dt>
                      <dd>#TRAD/DNCC/048912</dd>
                      <dt className="font-semibold text-neutral-900 dark:text-white">VAT Registration:</dt>
                      <dd>003918472-0101</dd>
                      <dt className="font-semibold text-neutral-900 dark:text-white">Incorporated:</dt>
                      <dd>2024</dd>
                      <dt className="font-semibold text-neutral-900 dark:text-white">Headquarters:</dt>
                      <dd>Level 7, Tejgaon Industrial Link Road, Dhaka-1208</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    Regional Hubs
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                      <h4 className="font-semibold text-neutral-900 dark:text-white">Dhaka Hub</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        Level 7, Tejgaon Industrial Link Road, Dhaka-1208
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                        Primary operations, owner onboarding, dispatch coordination
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                      <h4 className="font-semibold text-neutral-900 dark:text-white">Chattogram Hub</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        Yard #4, Agrabad Commercial Area, Chattogram-4100
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                        Port logistics, heavy equipment yard, southern region support
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-600 to-orange-700 text-white sticky top-24">
                  <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                  <div className="space-y-4 text-sm">
                    <a
                      href="mailto:ops@jontrobazar.com.bd"
                      className="flex items-center gap-2 hover:text-orange-100 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      ops@jontrobazar.com.bd
                    </a>
                    <a
                      href="tel:+8809613882200"
                      className="flex items-center gap-2 hover:text-orange-100 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      +880 9613-882200
                    </a>
                    <p className="text-xs text-orange-100 pt-2 border-t border-orange-500/30">
                      24/7 Dispatch Support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-orange-700">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
              Join the Network
            </h2>
            <p className="text-orange-100 mb-6">
              Whether you're an owner with idle fleet or a contractor needing gear — JontroBazar connects you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white text-orange-600 font-bold text-sm hover:bg-orange-50 transition-colors shadow-lg"
              >
                Get Started Free
              </a>
              <a
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg border-2 border-white text-white font-bold text-sm hover:bg-white/10 transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </section>
      </main>


    </div>
  );
}