"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Wrench,
  Users,
  Settings,
  LogOut,
  ShieldCheck,
  Truck,
  AlertCircle,
  Package,
  Menu,
  X,
  Home,
} from "lucide-react";

/**
 * Role-aware dashboard layout with sidebar and content area.
 *
 * Desktop (lg+): fixed 256px sidebar on the left.
 * Mobile (< lg): off-canvas drawer opened from a hamburger button in the
 * header, with a click-away backdrop. The drawer auto-closes on navigation.
 */
export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { user, role, signOutUser } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll while the drawer is open (mobile).
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Close the drawer with the Escape key.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Role-specific sidebar configuration
  const roleConfig = {
    customer: {
      accentColor: "bg-amber-600",
      menu: [
        { name: "Dashboard", href: "/dashboard/customer", icon: LayoutDashboard },
        { name: "My Rentals", href: "/dashboard/customer/rentals", icon: Truck },
        { name: "Favorites", href: "/dashboard/customer/favorites", icon: ShieldCheck },
        { name: "Profile", href: "/dashboard/customer/profile", icon: Users },
      ],
    },
    owner: {
      accentColor: "bg-orange-600",
      menu: [
        { name: "Dashboard", href: "/dashboard/owner", icon: LayoutDashboard },
        { name: "Add Equipment", href: "/dashboard/owner/add-equipment", icon: Wrench },
        { name: "My Equipment", href: "/dashboard/owner/equipment", icon: Package },
        { name: "Rentals", href: "/dashboard/owner/rentals", icon: Truck },
        { name: "Profile", href: "/dashboard/owner/profile", icon: Users },
      ],
    },
    admin: {
      accentColor: "bg-purple-600",
      menu: [
        { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
        { name: "Users", href: "/dashboard/admin/users", icon: Users },
        { name: "Equipment", href: "/dashboard/admin/equipment", icon: Wrench },
        { name: "Rentals", href: "/dashboard/admin/rentals", icon: Truck },
        { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
      ],
    },
  };

  const config = roleConfig[role] || roleConfig.customer;

  // Shared sidebar markup used by both the fixed desktop aside and the
  // mobile drawer so branding, menu and user footer stay in sync.
  const sidebarContent = (
    <>
      <div className="p-4 lg:p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-neutral-950 dark:bg-neutral-900 border border-neutral-800 flex items-center justify-center text-orange-500 font-bold shrink-0">
            <Wrench className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-lg font-black tracking-tight text-neutral-900 dark:text-white">
              Jontro<span className="text-orange-500">Bazar</span>
            </span>
            <div className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              {role} Dashboard
            </div>
          </div>
        </div>
        <button
          onClick={() => setDrawerOpen(false)}
          className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          title="Close menu"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1.5">
          {config.menu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-orange-600 text-white shadow-sm shadow-orange-600/20"
                      : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Footer in Sidebar */}
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 truncate">
            {user?.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={user.image}
                alt={user.name || "Avatar"}
                className="w-8 h-8 rounded-full object-cover border border-orange-500 shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
              </div>
            )}
            <div className="truncate">
              <div className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                {user?.name || "User"}
              </div>
              <div className="text-[10px] text-neutral-500 truncate">
                {user?.email || ""}
              </div>
            </div>
          </div>
          <button
            onClick={signOutUser}
            className="p-2 rounded-lg text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#090d16] text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Fixed desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex-col fixed inset-y-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile off-canvas drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-200 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!drawerOpen}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          onClick={() => setDrawerOpen(false)}
        />
        <aside
          className={`absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-white dark:bg-neutral-900 flex flex-col shadow-xl transition-transform duration-300 ease-in-out ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Dashboard menu"
        >
          {sidebarContent}
        </aside>
      </div>

      {/* Main Content Area */}
      <div className="lg:pl-64 flex min-h-screen flex-col">
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-16 sm:h-20 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 shrink-0 sticky top-0 z-20">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden p-2 -ml-1 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Open menu"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <h1 className="text-base sm:text-xl font-black text-neutral-900 dark:text-white capitalize truncate">
                  {role} Portal
                </h1>
                <p className="hidden sm:block text-xs text-neutral-500 dark:text-neutral-400">
                  Manage your marketplace activities and fleet operations
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/"
                className="hidden sm:inline-flex px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                Back to Marketplace
              </Link>
              <Link
                href="/"
                className="sm:hidden p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title="Back to Marketplace"
              >
                <Home className="w-4 h-4" />
              </Link>
            </div>
          </header>

          <div className="p-4 sm:p-6 lg:p-8 flex-1">{children}</div>
        </main>
      </div>
    </div>
  );
}
