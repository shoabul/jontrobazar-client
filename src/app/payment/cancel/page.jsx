"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  XCircle,
  ArrowLeft,
  Home,
  CreditCard,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { showToast } from "@/lib/notify";

export default function PaymentCancelPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  React.useEffect(() => {
    showToast("warning", "Payment was cancelled. No charges were made.");
  }, []);

  const handleRetry = () => {
    if (sessionId) {
      // Could redirect back to equipment page with session_id for retry
      window.history.back();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#090d16] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md w-full bg-white dark:bg-[#0c1017] p-8 sm:p-10 rounded-2xl border border-neutral-200 dark:border-neutral-800"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center"
        >
          <XCircle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
        </motion.div>

        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          Payment Cancelled
        </h1>

        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Your payment was not completed. No charges have been made to your
          account.
        </p>

        <AlertTriangle className="w-5 h-5 text-amber-500 mx-auto mb-4" />

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6 text-left">
          <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            What happens next?
          </h3>
          <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1 pl-4 list-disc">
            <li>Your booking request has been saved as <strong>pending</strong></li>
            <li>You can complete payment anytime from your dashboard</li>
            <li>Equipment is held for a limited time</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleRetry}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Payment Again
          </button>
          <Link
            href="/dashboard/customer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go to Dashboard
          </Link>
          <Link
            href="/equipment"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-neutral-600 dark:text-neutral-400 font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse Equipment
          </Link>
        </div>

        {sessionId && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center text-xs text-neutral-400 dark:text-neutral-500 font-mono"
          >
            Session: {sessionId.slice(0, 20)}...
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}