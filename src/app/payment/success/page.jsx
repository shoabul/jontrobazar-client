"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Loader2,
  CreditCard,
  Calendar,
  Package,
  ArrowLeft,
  Home,
  AlertCircle,
} from "lucide-react";
import { useApi } from "@/lib/api";
import { showToast } from "@/lib/notify";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { api } = useApi();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState("verifying"); // verifying | success | failed
  const [payment, setPayment] = useState(null);
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setStatus("failed");
        setError("No session ID provided. Payment verification failed.");
        showToast("error", "Invalid payment session");
        return;
      }

      try {
        const res = await api("/payments/verify", {
          method: "POST",
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();

        if (data.success) {
          setStatus("success");
          setPayment(data.data?.payment);
          setBooking(data.data?.booking);
          showToast("success", "Payment verified! Your booking is confirmed.");
        } else {
          setStatus("failed");
          setError(data.message || "Payment verification failed");
          showToast("error", data.message || "Payment verification failed");
        }
      } catch (err) {
        setStatus("failed");
        setError("Network error. Please contact support if payment was deducted.");
        showToast("error", "Verification failed. Please contact support.");
      }
    };

    verifyPayment();
  }, [sessionId]);

  const handleBackToDashboard = () => {
    router.push("/dashboard/customer");
    router.refresh();
  };

  const handleBackToEquipment = () => {
    if (booking?.equipmentId) {
      router.push(`/equipment/${booking.equipmentId}`);
    } else {
      router.push("/equipment");
    }
  };

  if (status === "verifying") {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-[#090d16] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md w-full"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
            Verifying Payment
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Please wait while we confirm your payment with Stripe...
          </p>
        </motion.div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-[#090d16] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md w-full bg-white dark:bg-[#0c1017] p-8 sm:p-10 rounded-2xl border border-neutral-200 dark:border-neutral-800"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center"
          >
            <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </motion.div>

          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Payment Verification Failed
          </h1>

          {error && (
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">{error}</p>
          )}

          <AlertCircle className="w-5 h-5 text-amber-500 mx-auto mb-4" />

          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
            If you were charged but see this message, please contact support with
            your session ID: <code className="font-mono text-xs bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
              {sessionId || "N/A"}
            </code>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard/customer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors"
            >
              <Home className="w-4 h-4" />
              Go to Dashboard
            </Link>
            <Link
              href="/equipment"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Browse Equipment
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#090d16] py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        {/* Success Card */}
        <div className="bg-white dark:bg-[#0c1017] rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-6 sm:px-8 sm:py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
              Payment Successful!
            </h1>
            <p className="text-emerald-100 text-center">
              Your booking has been confirmed and payment verified.
            </p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Transaction Details */}
            {payment && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">
                      Transaction Complete
                    </h3>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                      Amount: ৳{payment.amount?.toLocaleString() || "—"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-emerald-700 dark:text-emerald-300">Transaction ID</p>
                    <p className="font-mono text-xs text-neutral-700 dark:text-neutral-300 break-all">
                      {payment.transactionId || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-emerald-700 dark:text-emerald-300">Date</p>
                    <p className="font-mono text-xs text-neutral-700 dark:text-neutral-300">
                      {payment.createdAt
                        ? new Date(payment.createdAt).toLocaleDateString("en-BD", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Booking Details */}
            {booking && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Package className="w-5 h-5 text-orange-600" />
                  Booking Details
                </h3>

                <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-xl p-5 space-y-4">
                  <div className="flex items-start gap-4">
                    {booking.equipment?.image && (
                      <img
                        src={booking.equipment.image}
                        alt={booking.equipment.name}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-neutral-900 dark:text-white truncate">
                        {booking.equipment?.name || "Equipment"}
                      </h4>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {booking.equipment?.category || ""}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <div className="text-sm">
                        <p className="text-neutral-500 dark:text-neutral-400">Start</p>
                        <p className="font-medium text-neutral-900 dark:text-white">
                          {booking.startDate
                            ? new Date(booking.startDate).toLocaleDateString("en-BD", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "—"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <div className="text-sm">
                        <p className="text-neutral-500 dark:text-neutral-400">End</p>
                        <p className="font-medium text-neutral-900 dark:text-white">
                          {booking.endDate
                            ? new Date(booking.endDate).toLocaleDateString("en-BD", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "—"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-neutral-400" />
                      <div className="text-sm">
                        <p className="text-neutral-500 dark:text-neutral-400">Qty</p>
                        <p className="font-medium text-neutral-900 dark:text-white">
                          {booking.quantity || 1}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-neutral-400" />
                      <div className="text-sm">
                        <p className="text-neutral-500 dark:text-neutral-400">Total</p>
                        <p className="font-bold text-orange-600 dark:text-orange-400">
                          ৳{booking.totalAmount?.toLocaleString() || "—"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {(booking.contact || booking.address) && (
                    <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 space-y-2">
                      {booking.contact && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          <strong>Contact:</strong> {booking.contact}
                        </p>
                      )}
                      {booking.address && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          <strong>Delivery:</strong> {booking.address}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                      booking.paymentStatus === "paid"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                    Payment:{' '}
                    {booking.paymentStatus === "paid" ? "Paid" : "Pending"}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                      booking.bookingStatus === "confirmed"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : booking.bookingStatus === "completed"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                    Status:{' '}
                    {booking.bookingStatus?.charAt(0).toUpperCase() +
                      booking.bookingStatus?.slice(1)}
                  </span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={handleBackToDashboard}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors"
              >
                <Home className="w-4 h-4" />
                View My Rentals
              </button>
              <button
                onClick={handleBackToEquipment}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Equipment
              </button>
            </div>
          </div>
        </div>

        {/* Help note */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400"
        >
          A confirmation email has been sent to your registered email address.
          You can view this booking anytime in your dashboard.
        </motion.p>
      </motion.div>
    </div>
  );
}