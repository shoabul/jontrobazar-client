"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useApi } from "@/lib/api";
import { showToast } from "@/lib/notify";
import { motion } from "framer-motion";
import {
  Users,
  Package,
  Truck,
  DollarSign,
  TrendingUp,
  BarChart3,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
} from "lucide-react";
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
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const BOOKING_STATUS_STYLES = {
  confirmed: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  completed: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  pending: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  cancelled: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
};

const PAYMENT_STATUS_STYLES = {
  paid: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  unpaid: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  refunded: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
};

const EQUIPMENT_STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  approved: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  rejected: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
};

const EQUIPMENT_STATUS_ICONS = {
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

// Admin analytics component
function AdminAnalytics({ data }) {
  const monthlyBookings = data?.monthlyBookings || [];
  const monthlyRevenue = data?.monthlyRevenue || [];
  const usersByRole = data?.usersByRole || {};
  const equipmentByStatus = data?.equipmentByStatus || {};
  const equipmentByCategory = data?.equipmentByCategory || {};
  const bookingsByStatus = data?.bookingsByStatus || {};
  const paymentStatusData = data?.paymentStatusData || {};

  // Chart data
  const bookingsChartData = monthlyBookings.map((m) => ({
    month: m.month,
    bookings: m.count,
  }));

  const revenueChartData = monthlyRevenue.map((m) => ({
    month: m.month,
    revenue: m.revenue,
  }));

  const roleChartData = Object.entries(usersByRole).map(([role, count]) => ({
    role: role.charAt(0).toUpperCase() + role.slice(1),
    count,
  }));

  const equipmentStatusData = Object.entries(equipmentByStatus).map(([status, count]) => ({
    status,
    count,
    fill: status === "approved" ? "#10b981" : status === "pending" ? "#f59e0b" : "#ef4444",
  }));

  const categoryChartData = Object.entries(equipmentByCategory).map(([category, count]) => ({
    category,
    count,
  }));

  const bookingStatusData = Object.entries(bookingsByStatus).map(([status, count]) => ({
    status,
    count,
  }));

  const paymentStatusChartData = Object.entries(paymentStatusData).map(([status, count]) => ({
    status,
    count,
    fill:
      status === "paid"
        ? "#10b981"
        : status === "unpaid"
        ? "#f59e0b"
        : "#3b82f6",
  }));

  const COLORS = ["#f97316", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Total Users
              </p>
              <p className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-1">
                {formatNumber(data?.totalUsers)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

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
                Total Bookings
              </p>
              <p className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-1">
                {formatNumber(data?.totalBookings)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Total Revenue
              </p>
              <p className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-1">
                {formatCurrency(data?.totalRevenue)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Bookings Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-orange-500" />
            Monthly Bookings (Last 12 Months)
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bookingsChartData}>
                <defs>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
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
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                  labelStyle={{ color: "#9ca3af" }}
                  formatter={(value) => [value, "Bookings"]}
                />
                <Area
                  type="monotone"
                  dataKey="bookings"
                  stroke="#f97316"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorBookings)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            Monthly Revenue (Last 12 Months)
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
                  formatter={(value) => [`৳${Number(value).toLocaleString()}`, "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users by Role */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Users by Role
          </h3>
          <div className="h-72 flex items-center justify-center">
            {roleChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="count"
                    nameKey="role"
                    label={({ role, percent }) => `${role} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {roleChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [value, "Users"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-neutral-500 dark:text-neutral-400">No user data</p>
            )}
          </div>
        </div>

        {/* Equipment by Status */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-orange-500" />
            Equipment by Status
          </h3>
          <div className="h-72 flex items-center justify-center">
            {equipmentStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={equipmentStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="count"
                    nameKey="status"
                    label={({ status, percent }) =>
                      `${status.charAt(0).toUpperCase() + status.slice(1)} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {equipmentStatusData.map((item, index) => (
                      <Cell key={`cell-${index}`} fill={item.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [value, "Equipment"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-neutral-500 dark:text-neutral-400">No equipment data</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {equipmentStatusData.map((item) => {
              const StatusIcon = EQUIPMENT_STATUS_ICONS[item.status] || AlertCircle;
              return (
                <span
                  key={item.status}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${EQUIPMENT_STATUS_STYLES[item.status] || EQUIPMENT_STATUS_STYLES.pending}`}
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
                <BarChart data={categoryChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis
                    type="number"
                    stroke="#9ca3af"
                    fontSize={12}
                    tick={{ fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="category"
                    stroke="#9ca3af"
                    fontSize={12}
                    tick={{ fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#9ca3af" }}
                    formatter={(value) => [value, "Equipment"]}
                  />
                  <Bar
                    dataKey="count"
                    fill="#f97316"
                    radius={[0, 4, 4, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-neutral-500 dark:text-neutral-400">No equipment data</p>
            )}
          </div>
        </div>

        {/* Booking Status Distribution */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 lg:col-span-2">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-500" />
            Booking Status Distribution
          </h3>
          <div className="h-72 flex items-center justify-center">
            {bookingStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookingStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="count"
                    nameKey="status"
                    label={({ status, percent }) =>
                      `${status.charAt(0).toUpperCase() + status.slice(1)} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {bookingStatusData.map((item, index) => {
                      const fillColor =
                        item.status === "completed"
                          ? "#10b981"
                          : item.status === "confirmed"
                          ? "#3b82f6"
                          : item.status === "cancelled"
                          ? "#ef4444"
                          : "#f59e0b";
                      return <Cell key={`cell-${index}`} fill={fillColor} />;
                    })}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [value, "Bookings"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-neutral-500 dark:text-neutral-400">No booking data</p>
            )}
          </div>
        </div>

        {/* Payment Status */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 lg:col-span-2">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-500" />
            Payment Status
          </h3>
          <div className="h-72 flex items-center justify-center">
            {paymentStatusChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentStatusChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="count"
                    nameKey="status"
                    label={({ status, percent }) =>
                      `${status.charAt(0).toUpperCase() + status.slice(1)} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {paymentStatusChartData.map((item, index) => (
                      <Cell key={`cell-${index}`} fill={item.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [value, "Payments"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-neutral-500 dark:text-neutral-400">No payment data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  const { api } = useApi();
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setIsLoading(true);
        const res = await api("/analytics/admin");
        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to load analytics");
        }

        setAnalytics(data.data);
        setError("");
      } catch (err) {
        console.error("Admin analytics error:", err);
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
            Analytics Overview
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Platform-wide metrics and insights.
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
            Analytics Overview
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
          Analytics Overview
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Platform-wide metrics and insights.
        </p>
      </div>

      <AdminAnalytics data={analytics} />
    </div>
  );
}