"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useApi } from "../../../../lib/api";
import { showToast } from "../../../../lib/notify";
import {
  Truck,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const BOOKING_STATUS_STYLES = {
  pending:
    "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  confirmed:
    "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  completed:
    "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  cancelled:
    "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
};

const PAYMENT_STATUS_STYLES = {
  paid:
    "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  unpaid:
    "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  failed:
    "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
  refunded:
    "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
};

export default function AdminRentalsPage() {
  const { api } = useApi();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRentals = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api("/bookings/all");
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to load rentals list");
      }

      setRentals(data.data || []);
      setError("");
    } catch (err) {
      console.error("Fetch all rentals error:", err);
      setError(err.message || "Could not load platform rentals.");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchRentals();
  }, [fetchRentals]);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const res = await api(`/bookings/${bookingId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ bookingStatus: newStatus }),
      });
      const data = await res.json();

      if (!data.success)
        throw new Error(data.message || "Booking status update failed");

      showToast("success", `Booking status updated to ${newStatus}.`);
      fetchRentals();
    } catch (err) {
      showToast("error", err.message || "Failed to update booking status.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <RefreshCw className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <AlertCircle className="w-10 h-10 text-red-500" />
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{error}</p>
        <button
          onClick={fetchRentals}
          className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
          All Rentals
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Monitor all customer bookings and resolve payment or status issues
        </p>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-850">
                <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  Customer
                </th>
                <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  Equipment
                </th>
                <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  Dates
                </th>
                <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  Total
                </th>
                <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  Payment
                </th>
                <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  Booking
                </th>
                <th className="px-4 py-3 text-right font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((r) => (
                <tr
                  key={r._id}
                  className="border-b border-neutral-100 dark:border-neutral-800/60 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-850/40 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="font-semibold text-neutral-900 dark:text-white text-xs">
                      {r.customer?.name || "Guest"}
                    </div>
                    <div className="text-[10px] text-neutral-400">
                      {r.customer?.email || "—"}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-neutral-700 dark:text-neutral-300 text-xs max-w-[180px] truncate">
                    {r.equipment?.name || r.equipmentId || "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-neutral-600 dark:text-neutral-300">
                    <div>
                      Start:{" "}
                      {r.startDate
                        ? new Date(r.startDate).toLocaleDateString()
                        : "—"}
                    </div>
                    <div className="text-neutral-400">
                      End:{" "}
                      {r.endDate
                        ? new Date(r.endDate).toLocaleDateString()
                        : "—"}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-purple-600 dark:text-purple-400">
                    ৳{r.totalAmount?.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs font-bold uppercase tracking-wider ${PAYMENT_STATUS_STYLES[r.paymentStatus] || PAYMENT_STATUS_STYLES.unpaid}`}
                    >
                      {r.paymentStatus || "unpaid"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs font-bold uppercase tracking-wider ${BOOKING_STATUS_STYLES[r.bookingStatus] || BOOKING_STATUS_STYLES.pending}`}
                    >
                      {r.bookingStatus || "pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {r.bookingStatus !== "completed" && (
                        <button
                          onClick={() =>
                            handleStatusChange(r._id, "completed")
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-emerald-200 dark:border-emerald-900 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors cursor-pointer"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          Complete
                        </button>
                      )}
                      {r.bookingStatus !== "cancelled" && (
                        <button
                          onClick={() =>
                            handleStatusChange(r._id, "cancelled")
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-red-200 dark:border-red-900 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}