"use client";

import React, { useEffect, useState } from "react";
import { useApi } from "@/lib/api";
import { showToast } from "@/lib/notify";
import Link from "next/link";
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
  ArrowLeft,
} from "lucide-react";

/**
 * Customer My Rentals Page
 * Displays all bookings for the logged-in customer in a table.
 * Data: GET /api/bookings/my-rentals
 */

function StatusBadge({ status, type }) {
  const configs = {
    payment: {
      paid: { bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle, label: "Paid" },
      unpaid: { bg: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: AlertCircle, label: "Unpaid" },
      refunded: { bg: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: CreditCard, label: "Refunded" },
    },
    booking: {
      confirmed: { bg: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: CheckCircle, label: "Confirmed" },
      completed: { bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle, label: "Completed" },
      pending: { bg: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock, label: "Pending" },
      cancelled: { bg: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: XCircle, label: "Cancelled" },
    },
  };

  const config = configs[type][status] || configs[type].pending;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.bg}`}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}

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

export default function CustomerRentalsPage() {
  const { api } = useApi();
  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRentals = async () => {
      try {
        setIsLoading(true);
        const res = await api("/bookings/my-rentals");
        const data = await res.json();

        if (data.success) {
          setRentals(data.data || []);
        } else {
          setError(data.message || "Failed to load rentals");
          showToast("error", data.message || "Failed to load rentals");
        }
      } catch (err) {
        setError("Failed to load rentals. Please try again.");
        showToast("error", "Failed to load rentals");
      } finally {
        setIsLoading(false);
      }
    };

    loadRentals();
  }, [api]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
            My Rentals
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            View and manage your equipment bookings.
          </p>
        </div>
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
          <MobileTable
            loading
            columns={[
              { label: "Equipment" },
              { label: "Dates" },
              { label: "Booking Date" },
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
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
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
          View and manage your equipment bookings.{" "}
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
            You haven't booked any equipment yet. Start exploring our marketplace!
          </p>
          <Link
            href="/equipment"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors"
          >
            <Package className="w-4 h-4" />
            Browse Equipment
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
        <MobileTable
          columns={[
            { label: "Equipment" },
            { label: "Dates" },
            { label: "Booking Date" },
            { label: "Total" },
            { label: "Payment" },
            { label: "Status" },
            { label: "Actions" },
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
            <span key="bookingDate" className="text-sm text-neutral-700 dark:text-neutral-300">
              {formatDate(rental.createdAt)}
            </span>,
            <span key="total" className="font-semibold text-neutral-900 dark:text-white">
              {formatCurrency(rental.totalAmount)}
            </span>,
            <span key="payment">
              <StatusBadge status={rental.paymentStatus} type="payment" />
            </span>,
            <span key="status">
              <StatusBadge status={rental.bookingStatus} type="booking" />
            </span>,
            <span key="actions">
              {rental.equipmentId && (
                <Link
                  href={`/equipment/${rental.equipmentId}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                >
                  <Truck className="w-3.5 h-3.5" />
                  View Details
                </Link>
              )}
            </span>,
          ]}
        />
      </div>
      )}
    </div>
  );
}