import React from "react";
import Link from "next/link";
import { Wrench, MapPin, Building2, Mail, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0b0f17] text-neutral-400 font-sans border-t border-neutral-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* 4-COLUMN MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14">
          {/* Column 1: Brand Info & Socials */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-sm">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Jontro<span className="text-orange-500">Bazar</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm leading-relaxed text-neutral-400 max-w-sm">
              Bangladesh&apos;s trusted B2B &amp; commercial equipment rental
              network. Connecting verified fleet owners in Dhaka, Chattogram,
              Gazipur, and Sylhet with contractors, studios, and agribusinesses.
            </p>

            {/* Social Media Links with the New X Logo (Rule #7) */}
            <div className="flex items-center gap-2 pt-2">
              {/* New X Logo */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-white flex items-center justify-center text-neutral-300 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-white flex items-center justify-center text-neutral-300 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-white flex items-center justify-center text-neutral-300 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: MARKETPLACE */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Marketplace
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/equipment"
                  className="hover:text-orange-400 transition-colors"
                >
                  Browse All Equipment
                </Link>
              </li>
              <li>
                <Link
                  href="/equipment?category=Construction"
                  className="hover:text-orange-400 transition-colors"
                >
                  Construction &amp; Excavators
                </Link>
              </li>
              <li>
                <Link
                  href="/equipment?category=Photography"
                  className="hover:text-orange-400 transition-colors"
                >
                  Cinema &amp; Broadcast Gear
                </Link>
              </li>
              <li>
                <Link
                  href="/equipment?category=Agriculture"
                  className="hover:text-orange-400 transition-colors"
                >
                  Agro &amp; Harvester Machinery
                </Link>
              </li>
              <li>
                <Link
                  href="/equipment?category=Event Equipment"
                  className="hover:text-orange-400 transition-colors"
                >
                  Event &amp; Convention Sound
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: OPERATIONS & TRUST */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Operations &amp; Trust
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-orange-400 transition-colors"
                >
                  How Escrow Rental Works
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-orange-400 transition-colors"
                >
                  Owner Verification Protocol
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-orange-400 transition-colors"
                >
                  Dhaka &amp; Chattogram Hubs
                </Link>
              </li>
              <li>
                <Link
                  href="/system-status"
                  className="hover:text-orange-400 transition-colors"
                >
                  System Status &amp; 404 Preview
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: REGIONAL HUBS */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Regional Hubs
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>
                  Level 7, Tejgaon Industrial Link Road,
                  <br />
                  Dhaka-1208, Bangladesh
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>
                  Yard #4, Agrabad Commercial Area,
                  <br />
                  Chattogram-4100
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <a
                  href="mailto:ops@jontrobazar.com.bd"
                  className="hover:text-orange-400 transition-colors"
                >
                  ops@jontrobazar.com.bd
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM SUB-FOOTER */}
        <div className="pt-8 border-t border-neutral-850 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>
            &copy; 2026 JontroBazar Technologies Ltd. Trade License
            #TRAD/DNCC/048912. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="inline-flex items-center gap-1.5 text-neutral-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Stripe PCI-DSS Secured
            </span>
            <span className="text-neutral-600 hidden sm:inline">|</span>
            <span>VAT Reg: 003918472-0101</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
