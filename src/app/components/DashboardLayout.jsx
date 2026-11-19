"use client";

import React from "react";
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
} from "lucide-react";

/**
 * Role-aware dashboard layout with sidebar and content area.
 *
 * The sidebar menu is built dynamically based on the user's role. Each role
 * gets its own set of navigation links and a distinct sidebar accent color.
 */
export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { user, role, signOutUser } = useAuth();

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

  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-[#090d16] text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-neutral-950 dark:bg-neutral-900 border border-neutral-800 flex items-center justify-center text-orange-500 font-bold">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-neutral-900 dark:text-white">
              Jontro<span className="text-orange-500">Bazar</span>
            </span>
            <div className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              {role} Dashboard
            </div>
          </div>
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
                    <span>{item.name}</span>
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
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-20 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-8 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-xl font-black text-neutral-900 dark:text-white capitalize">
              {role} Portal
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Manage your marketplace activities and fleet operations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Back to Marketplace
            </Link>
          </div>
        </header>

        <div className="p-8 flex-1">{children}</div>
      </main>
    </div>
  );
}