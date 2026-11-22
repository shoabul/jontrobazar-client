"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/api";
import { showToast } from "@/lib/notify";
import MobileTable from "../../components/MobileTable";
import { Truck, Wrench, Users, Package, DollarSign, TrendingUp, BarChart3, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  approved: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  rejected: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
};

const STATUS_ICONS = {
  pending: AlertCircle,
  approved: CheckCircle,
  rejected: XCircle,
};

function formatCurrency(amount) {
  if (amount === undefined || amount === null) return "৳0";
  return `৳${Number(amount).toLocaleString()}`;
}

function formatNumber(num) {
  if (num === undefined || num === null) return "0";
  return Number(num).toLocaleString();
}

// Skeleton loader for analytics
function AnalyticsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mt-2"></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 h-80">
          <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3 mb-6"></div>
          <div className="h-full bg-neutral-200 dark:bg-neutral-700 rounded"></div>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 h-80">
          <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3 mb-6"></div>
          <div className="h-full bg-neutral-200 dark:bg-neutral-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// Actual analytics component
function OwnerAnalytics({ data }) {
  const monthlyEarnings = data?.monthlyEarnings || [];
  const equipmentByStatus = data?.equipmentByStatus || {};
  const equipmentByCategory = data?.equipmentByCategory || {};
  const recentBookings = data?.recentBookings || [];

  // Chart data
  const earningsChartData = monthlyEarnings.map((m) => ({
    month: m.month,
    earnings: m.earnings,
  }));

  const statusChartData = Object.entries(equipmentByStatus).map(([status, count]) => ({
    status,
    count,
    fill: status === "approved" ? "#10b981" : status === "pending" ? "#f59e0b" : "#ef4444",
  }));

  const categoryChartData = Object.entries(equipmentByCategory).map(([category, count]) => ({
    category,
    count,
  }));

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Total Equipment
              </p>
              <p className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-1">
                {formatNumber(data?.totalEquipment)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Completed Rentals
              </p>
              <p className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-1">
                {formatNumber(data?.completedRentals)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Total Earnings
              </p>
              <p className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-1">
                {formatCurrency(data?.totalEarnings)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Monthly Trend
              </p>
              <p className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-1 flex items-center gap-1">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                <span>+12%</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Earnings Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-orange-500" />
            Monthly Earnings (Last 12 Months)
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsChartData}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#9ca3af"
                  fontSize={12}
                  tick={{ fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#9ca3af"
                  fontSize={12}
                  tick={{ fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `৳${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                  labelStyle={{ color: "#9ca3af" }}
                  formatter={(value) => [`৳${Number(value).toLocaleString()}`, "Earnings"]}
                />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#f97316"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorEarnings)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Equipment by Status */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-orange-500" />
            Equipment by Status
          </h3>
          <div className="h-72 flex items-center justify-center">
            {statusChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={statusChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis
                    dataKey="status"
                    stroke="#9ca3af"
                    fontSize={12}
                    tick={{ fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    fontSize={12}
                    tick={{ fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#9ca3af" }}
                  />
                  {statusChartData.map((item, index) => (
                    <Area
                      key={item.status}
                      type="monotone"
                      dataKey="count"
                      stroke={item.fill}
                      strokeWidth={2}
                      fillOpacity={0.1}
                      fill={item.fill}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-neutral-500 dark:text-neutral-400">No equipment data</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {statusChartData.map((item) => {
              const StatusIcon = STATUS_ICONS[item.status] || AlertCircle;
              return (
                <span
                  key={item.status}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[item.status] || STATUS_STYLES.pending}`}
                >
                  <StatusIcon className="w-3 h-3" />
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}: {item.count}
                </span>
              );
            })}
          </div>
        </div>

        {/* Equipment by Category */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 lg:col-span-2">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-orange-500" />
            Equipment by Category
          </h3>
          <div className="h-72">
            {categoryChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={categoryChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis
                    dataKey="category"
                    stroke="#9ca3af"
                    fontSize={12}
                    tick={{ fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    fontSize={12}
                    tick={{ fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#9ca3af" }}
                  />
                  {categoryChartData.map((item, index) => (
                    <Area
                      key={item.category}
                      type="monotone"
                      dataKey="count"
                      stroke={`hsl(${index * 40}, 70%, 50%)`}
                      strokeWidth={2}
                      fillOpacity={0.1}
                      fill={`hsl(${index * 40}, 70%, 50%)`}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-neutral-500 dark:text-neutral-400">No equipment data</p>
            )}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 lg:col-span-2">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5 text-orange-500" />
            Recent Bookings
          </h3>
          {recentBookings.length > 0 ? (
            <MobileTable
              columns={[
                { label: "Equipment" },
                { label: "Customer" },
                { label: "Dates" },
                { label: "Amount" },
                { label: "Payment" },
                { label: "Status" },
              ]}
              data={recentBookings}
              rowKey={(booking) => booking._id}
              renderRow={(booking) => [
                <span key="equip" className="font-medium text-neutral-900 dark:text-white">
                  {booking.equipmentName}
                </span>,
                <span key="cust" className="text-neutral-700 dark:text-neutral-300">
                  {booking.customerName}
                </span>,
                <div key="dates" className="text-neutral-700 dark:text-neutral-300">
                  {new Date(booking.startDate).toLocaleDateString("en-BD", { month: "short", day: "numeric" })} -{" "}
                  {new Date(booking.endDate).toLocaleDateString("en-BD", { month: "short", day: "numeric" })}
                </div>,
                <span key="amt" className="font-semibold text-orange-600 dark:text-orange-400">
                  {formatCurrency(booking.totalAmount)}
                </span>,
                <span key="payment">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      booking.paymentStatus === "paid"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>
                </span>,
                <span key="status">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      booking.bookingStatus === "completed"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : booking.bookingStatus === "confirmed"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : booking.bookingStatus === "cancelled"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}
                  >
                    {booking.bookingStatus}
                  </span>
                </span>,
              ]}
            />
          ) : (
            <p className="text-center text-neutral-500 dark:text-neutral-400 py-8">No recent bookings</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function OwnerDashboardClient() {
  const router = useRouter();
  const { api } = useApi();
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setIsLoading(true);
        const res = await api("/analytics/owner");
        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to load analytics");
        }

        setAnalytics(data.data);
        setError("");
      } catch (err) {
        console.error("Owner analytics error:", err);
        setError(err.message || "Could not load analytics.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalytics();
  }, [api]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
            Owner Overview
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Welcome back! Manage your equipment fleet and incoming rentals.
          </p>
        </div>
        <AnalyticsSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
            Owner Overview
          </h2>
        </div>
        <div className="text-center py-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            Failed to load analytics
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
          Owner Overview
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Welcome back! Manage your equipment fleet and incoming rentals.
        </p>
      </div>

      {/* Analytics Section */}
      <OwnerAnalytics data={analytics} />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          onClick={() => router.push("/dashboard/owner/equipment")}
          className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-orange-500 cursor-pointer transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center font-bold mb-4">
            <Package className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            My Equipment
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            View, update, or remove listed machinery.
          </p>
        </div>

        <div
          onClick={() => router.push("/dashboard/owner/add-equipment")}
          className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-orange-500 cursor-pointer transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center font-bold mb-4">
            <Wrench className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            Add Equipment
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            List new equipment for rent with imgbb photos.
          </p>
        </div>

        <div
          onClick={() => router.push("/dashboard/owner/rentals")}
          className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-orange-500 cursor-pointer transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center font-bold mb-4">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            Rentals
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Monitor active customer bookings and schedules.
          </p>
        </div>

        <div
          onClick={() => router.push("/dashboard/owner/profile")}
          className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-orange-500 cursor-pointer transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center font-bold mb-4">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            Profile
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Manage your profile details and contact info.
          </p>
        </div>
      </div>
    </div>
  );
}