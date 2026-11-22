"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import {
  Wrench,
  Moon,
  Sun,
  Menu,
  X,
  LogOut,
} from "lucide-react";

export default function Nav() {
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, signOutUser } = useAuth();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Equipment", href: "/equipment" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  if (user) {
    navLinks.push({ name: "Dashboard", href: "/dashboard" });
  }

  return (
    <>
      {/* MAIN HEADER (Sticky on top across the entire page) */}
      <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#0c1017]/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800/80 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo & Tagline */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-neutral-950 dark:bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-md group-hover:border-orange-500 transition-colors">
              <Wrench className="w-5 h-5 text-orange-500 group-hover:rotate-12 transition-transform" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                  Jontro<span className="text-orange-500">Bazar</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-850">
                  BD
                </span>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 -mt-0.5">
                Industrial & Pro Gear Exchange
              </span>
            </div>
          </Link>

          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors py-1 relative ${
                    isActive
                      ? "text-orange-600 dark:text-orange-500 font-bold"
                      : "text-neutral-700 hover:text-orange-600 dark:text-neutral-300 dark:hover:text-orange-400"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Controls: Theme Toggle & Auth Buttons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-850 transition-colors cursor-pointer"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Auth Buttons */}
            {!user ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:text-orange-600 dark:hover:text-orange-400 px-3.5 py-2 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 px-5 py-2.5 rounded-lg shadow-sm transition-all shadow-orange-600/20 hover:shadow-orange-600/30"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-850 text-neutral-800 dark:text-neutral-200 hover:text-orange-500 transition-colors border border-neutral-200 dark:border-neutral-750"
                >
                  {user.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={user.image}
                      alt={user.name || "Avatar"}
                      className="w-5 h-5 rounded-full object-cover border border-orange-500"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-[10px]">
                      {(user.name || user.email || "U").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span>Dashboard</span>
                  <span className="ml-1 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-900">
                    {user.role}
                  </span>
                </Link>
                <button
                  onClick={async () => {
                    await signOutUser();
                  }}
                  className="p-2 rounded-lg text-neutral-500 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg lg:hidden text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* 3. MOBILE MENU DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0c1017] px-4 pt-3 pb-6 space-y-3">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-semibold ${
                    pathname === link.href
                      ? "bg-orange-50 dark:bg-neutral-800 text-orange-600 dark:text-orange-400 font-bold"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 rounded-lg"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2 text-sm font-bold text-white bg-orange-600 rounded-lg shadow-sm"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div className="flex items-center justify-between px-2 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                        {user.name}
                      </div>
                      <div className="text-xs text-neutral-400">
                        Role: {user.role}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      await signOutUser();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-600 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
