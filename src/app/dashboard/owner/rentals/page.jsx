"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api";
import { showToast } from "../../../../lib/notify";
import { motion } from "framer-motion";
import MobileTable from "../../../components/MobileTable";
import {
  Calendar,
  Package,
  CreditCard,
  Truck,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Eye,
  MoreVertical,
} from "lucide-react";

const BOOKING_STATUS_STYLES = {
  confirmed: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  completed: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  pending: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  cancelled: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
};

const BOOKING_STATUS_ICONS = {
  confirmed: CheckCircle,
  completed: CheckCircle,
  pending: Clock,
  cancelled: XCircle,
};

const PAYMENT_STATUS_STYLES = {
  paid: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  unpaid: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  refunded: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
};

function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatCurrency(amount) {
  if (amount === undefined || amount === null) return "—";
  return `৳${Number(amount).toLocaleString()}`;
}

export default function OwnerRentalsPage() {
  const { api } = useApi();
  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchRentals = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api("/bookings/owner-rentals");
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to load rentals");
      }

      setRentals(data.data || []);
      setError("");
    } catch (err) {
      console.error("Fetch owner rentals error:", err);
      setError(err.message || "Could not load rentals.");
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchRentals();
  }, [fetchRentals]);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      setUpdatingId(bookingId);
      const res = await api(`/bookings/${bookingId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ bookingStatus: newStatus }),
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message || "Update failed");

      showToast("success", `Booking marked as ${newStatus}`);
      fetchRentals();
    } catch (err) {
      showToast("error", err.message || "Failed to update booking status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const getAvailableStatuses = (currentStatus) => {
    const transitions = {
      pending: ["confirmed", "cancelled"],
      confirmed: ["completed", "cancelled"],
      completed: [],
      cancelled: [],
    };
    return transitions[currentStatus] || [];
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
            My Rentals
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Monitor all bookings for your equipment.
          </p>
        </div>
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
          <MobileTable
            loading
            columns={[
              { label: "Equipment" },
              { label: "Customer" },
              { label: "Dates" },
              { label: "Total" },
              { label: "Payment" },
              { label: "Status" },
              { label: "Actions" },
            ]}
            data={[]}
            rowKey={() => ""}
            renderRow={() => []}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
            My Rentals
          </h2>
        </div>
        <div className="text-center py-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            Failed to load rentals
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400 mb-4">{error}</p>
          <button
            onClick={fetchRentals}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
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
          My Rentals
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Monitor all bookings for your equipment.{" "}
          <span className="font-medium text-neutral-700 dark:text-neutral-300">
            {rentals.length} booking{rentals.length !== 1 ? "s" : ""}
          </span>
        </p>
      </div>

      {rentals.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
          <Package className="w-16 h-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            No rentals yet
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400 mb-6">
            No customer has booked your equipment yet. List more equipment to attract rentals!
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
        <MobileTable
          columns={[
            { label: "Equipment" },
            { label: "Customer" },
            { label: "Dates" },
            { label: "Total" },
            { label: "Payment" },
            { label: "Status" },
            { label: "Actions", align: "right" },
          ]}
          data={rentals}
          rowKey={(rental) => rental._id}
          renderRow={(rental) => [
            <div key="equip" className="flex items-center gap-4">
              {rental.equipment?.image && (
                <img
                  src={rental.equipment.image}
                  alt={rental.equipment.name}
                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                />
              )}
              <div className="min-w-0">
                <h4 className="font-semibold text-neutral-900 dark:text-white truncate max-w-xs">
                  {rental.equipment?.name || "Equipment"}
                </h4>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate max-w-xs">
                  {rental.equipment?.category || ""}
                </p>
              </div>
            </div>,
            <div key="cust">
              <p className="font-medium text-neutral-900 dark:text-white">
                {rental.customer?.name || "Customer"}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {rental.customer?.email || ""}
              </p>
            </div>,
            <div key="dates" className="space-y-1 text-sm">
              <div className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
                <Calendar className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                <span>Start: {formatDate(rental.startDate)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
                <Calendar className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                <span>End: {formatDate(rental.endDate)}</span>
              </div>
              {rental.days && (
                <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
                  <Clock className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                  <span>{rental.days} day{rental.days !== 1 ? "s" : ""}</span>
                </div>
              )}
            </div>,
            <span key="total" className="font-semibold text-neutral-900 dark:text-white">
              {formatCurrency(rental.totalAmount)}
            </span>,
            <span key="payment">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${
                  PAYMENT_STATUS_STYLES[rental.paymentStatus] || PAYMENT_STATUS_STYLES.unpaid
                }`}
              >
                {rental.paymentStatus === "paid" && <CheckCircle className="w-3.5 h-3.5" />}
                {rental.paymentStatus === "unpaid" && <AlertCircle className="w-3.5 h-3.5" />}
                {rental.paymentStatus === "refunded" && <CreditCard className="w-3.5 h-3.5" />}
                {rental.paymentStatus.charAt(0).toUpperCase() + rental.paymentStatus.slice(1)}
              </span>
            </span>,
            <span key="status">
              {(() => {
                const StatusIcon = BOOKING_STATUS_ICONS[rental.bookingStatus] || Clock;
                return (
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${
                      BOOKING_STATUS_STYLES[rental.bookingStatus] || BOOKING_STATUS_STYLES.pending
                    }`}
                  >
                    <StatusIcon className="w-3.5 h-3.5" />
                    {rental.bookingStatus.charAt(0).toUpperCase() + rental.bookingStatus.slice(1)}
                  </span>
                );
              })()}
            </span>,
            <div key="actions" className="flex items-center justify-end gap-2">
              <a
                href={`/equipment/${rental.equipmentId}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                View
              </a>
              <div className="relative">
                <button
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
                <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-1 z-10">
                  {getAvailableStatuses(rental.bookingStatus).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusUpdate(rental._id, status)}
                      disabled={updatingId === rental._id}
                      className={`w-full px-4 py-2 text-sm text-left ${
                        updatingId === rental._id ? "opacity-50 cursor-not-allowed" : "hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      }`}
                    >
                      {updatingId === rental._id ? (
                        <>
                          <span className="animate-spin">⟳</span> Updating...
                        </>
                      ) : (
                        `Mark as ${status.charAt(0).toUpperCase() + status.slice(1)}`
                      )}
                    </button>
                  ))}
                  {getAvailableStatuses(rental.bookingStatus).length === 0 && (
                    <span className="px-4 py-2 text-sm text-neutral-500 dark:text-neutral-400 block">
                      No actions available
                    </span>
                  )}
                </div>
              </div>
            </div>,
          ]}
        />
      </div>
      )}
    </div>
  );
}