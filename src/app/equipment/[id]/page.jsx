"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import {
  MapPin,
  Package,
  RotateCcw,
  Heart,
  Calendar,
  Users,
  Star,
  Shield,
  Truck,
  ArrowLeft,
  ChevronRight,
  X,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import { useApi } from "@/lib/api";
import { showToast, showConfirm } from "@/lib/notify";

const RENTAL_TYPE_LABELS = {
  daily: "Per Day",
  weekly: "Per Week",
  monthly: "Per Month",
};

const CONDITION_COLORS = {
  new: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  excellent: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  good: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  fair: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400",
};

const CONDITION_LABELS = {
  new: "Brand New",
  excellent: "Excellent",
  good: "Good",
  fair: "Fair",
};

export default function EquipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const equipmentId = params.id;

  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // ── API with auth ──
  const { api } = useApi();

  // ── Booking form state ──
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    quantity: 1,
    contact: "",
    address: "",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [availability, setAvailability] = useState(null);
  const [priceBreakdown, setPriceBreakdown] = useState(null);

  // ── Fetch equipment ──
  const loadEquipment = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api(`/equipment/${equipmentId}`);
      const data = await res.json();
      if (data.success) {
        setEquipment(data.data);
      } else {
        setError(data.message || "Equipment not found");
        // Use window.location for redirect to avoid router dependency in callback
        if (typeof window !== "undefined") {
          window.location.href = "/equipment";
        }
      }
    } catch (err) {
      setError("Failed to load equipment. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [equipmentId, api]);

  // ── Check favorite status ──
  const checkFavorite = useCallback(async () => {
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${API_BASE}/favorites/check/${equipmentId}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setIsFavorite(data.isFavorite);
        }
      }
      // Silent fail for favorite check (401 = not logged in, just don't show as favorite)
    } catch (err) {
      // Silent fail for favorite check
    }
  }, [equipmentId]);

  useEffect(() => {
    loadEquipment();
    checkFavorite();
  }, [loadEquipment, checkFavorite]);

  // ── Toggle favorite ──
  const toggleFavorite = async () => {
    if (favLoading) return;
    setFavLoading(true);
    try {
      if (isFavorite) {
        const res = await api(`/favorites/${equipmentId}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) {
          setIsFavorite(false);
          showToast("success", "Removed from favorites");
        }
      } else {
        const res = await api("/favorites", {
          method: "POST",
          body: JSON.stringify({ equipmentId }),
        });
        const data = await res.json();
        if (data.success) {
          setIsFavorite(true);
          showToast("success", "Added to favorites");
        }
      }
    } catch (err) {
      // Toast handled by apiFetch
    } finally {
      setFavLoading(false);
    }
  };

  // ── Validate booking form ──
  const validateForm = () => {
    const errors = {};
    if (!form.startDate) errors.startDate = "Start date is required";
    if (!form.endDate) errors.endDate = "End date is required";
    if (form.startDate && form.endDate && new Date(form.endDate) <= new Date(form.startDate)) {
      errors.endDate = "End date must be after start date";
    }
    if (!form.quantity || form.quantity < 1) errors.quantity = "Quantity must be at least 1";
    if (!form.contact.trim()) errors.contact = "Contact number is required";
    if (!form.address.trim()) errors.address = "Delivery address is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ── Calculate price & check availability ──
  const calculateBooking = useCallback(async () => {
    if (!form.startDate || !form.endDate || !form.quantity) {
      setPriceBreakdown(null);
      setAvailability(null);
      return;
    }
    if (new Date(form.endDate) <= new Date(form.startDate)) {
      setAvailability({ available: false, message: "End date must be after start date" });
      setPriceBreakdown(null);
      return;
    }

    try {
      const res = await api(
        `/equipment/${equipmentId}/availability?startDate=${form.startDate}&endDate=${form.endDate}&quantity=${form.quantity}`
      );
      const data = await res.json();
      if (data.success) {
        setAvailability(data.data);
        if (data.data.available && equipment) {
          const start = new Date(form.startDate);
          const end = new Date(form.endDate);
          const diffMs = end.getTime() - start.getTime();
          const days = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
          const dailyPrice = equipment.price;
          const subtotal = dailyPrice * days * form.quantity;
          setPriceBreakdown({
            dailyPrice,
            days,
            quantity: form.quantity,
            subtotal,
            total: subtotal, // No extra fees for now
          });
        } else {
          setPriceBreakdown(null);
        }
      }
    } catch (err) {
      setAvailability({ available: false, message: "Could not check availability" });
      setPriceBreakdown(null);
    }
  }, [form.startDate, form.endDate, form.quantity, equipmentId, equipment, api]);

  useEffect(() => {
    const t = setTimeout(calculateBooking, 300);
    return () => clearTimeout(t);
  }, [calculateBooking]);

  // ── Handle booking submit → create booking + Stripe ──
  const handleBookingSubmit = async () => {
    if (!validateForm()) return;

    const confirmed = await showConfirm({
      title: "Confirm Booking",
      text: `Book ${equipment.name} for ${priceBreakdown.days} day(s) × ${form.quantity} unit(s)? Total: ৳${priceBreakdown.total.toLocaleString()}`,
      confirmButtonText: "Proceed to Payment",
    });
    if (!confirmed) return;

    setBookingLoading(true);
    try {
      // 1. Create booking
      const bookingRes = await api("/bookings", {
        method: "POST",
        body: JSON.stringify({
          equipmentId,
          startDate: form.startDate,
          endDate: form.endDate,
          quantity: form.quantity,
          contact: form.contact,
          address: form.address,
          notes: form.notes,
        }),
      });
      const bookingData = await bookingRes.json();
      if (!bookingData.success) {
        showToast("error", bookingData.message || "Failed to create booking");
        return;
      }

      const bookingId = bookingData.data._id;

      // 2. Create Stripe checkout session
      const stripeRes = await api("/payments/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({ bookingId }),
      });
      const stripeData = await stripeRes.json();
      if (!stripeData.success) {
        showToast("error", stripeData.message || "Failed to create payment session");
        return;
      }

      // 3. Redirect to Stripe Checkout
      if (stripeData.url) {
        window.location.href = stripeData.url;
      }
    } catch (err) {
      // Toast handled by apiFetch
    } finally {
      setBookingLoading(false);
    }
  };

  // ── Render ──
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-[#090d16] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !equipment) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-[#090d16] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Equipment Not Found
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 mb-6">
            {error || "This equipment listing doesn't exist or has been removed."}
          </p>
          <Link
            href="/equipment"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse All Equipment
          </Link>
        </div>
      </div>
    );
  }

  const ownerName = equipment.owner?.name || "Equipment Owner";
  const ownerEmail = equipment.owner?.email || "";
  const ownerPhoto = equipment.owner?.photo || "";
  const qty = equipment.quantity || 0;
  const inStock = qty > 0;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#090d16]">
      {/* ── Back link ── */}
      <div className="bg-white dark:bg-[#0c1017] border-b border-neutral-200 dark:border-neutral-800 px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href="/equipment"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Equipment
        </Link>
      </div>

      {/* ── Hero image ── */}
      <div className="relative h-72 sm:h-96 bg-neutral-100 dark:bg-neutral-800">
        {equipment.image ? (
          <img
            src={equipment.image}
            alt={equipment.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400">
            <Package className="w-20 h-20" />
          </div>
        )}
        {/* Favorite button overlay */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={toggleFavorite}
            disabled={favLoading}
            className={`p-2 rounded-full shadow-lg transition-all ${
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white/90 dark:bg-neutral-900/90 text-neutral-700 dark:text-neutral-300 hover:bg-orange-50 hover:text-orange-600"
            }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main info ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-900">
                    {equipment.category}
                  </span>
                  <span className={`ml-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${CONDITION_COLORS[equipment.condition] || CONDITION_COLORS.good}`}>
                    {CONDITION_LABELS[equipment.condition] || equipment.condition}
                  </span>
                </div>
                {equipment.brand && (
                  <span className="text-sm text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                    {equipment.brand} {equipment.model && `· ${equipment.model}`}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight mb-2">
                {equipment.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {equipment.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Package className="w-4 h-4" />
                  {equipment.rentalType.charAt(0).toUpperCase() + equipment.rentalType.slice(1)} Rental
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {qty} {qty === 1 ? "Unit" : "Units"} Available
                </span>
              </div>
            </motion.div>

            {/* Price banner */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="rounded-2xl bg-orange-600 px-6 py-5 text-white"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm font-medium opacity-90">
                    {RENTAL_TYPE_LABELS[equipment.rentalType] || equipment.rentalType}
                  </p>
                  <p className="text-3xl sm:text-4xl font-black">
                    ৳{equipment.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-2 sm:pt-0 border-t border-orange-500/30 sm:border-t-0 sm:border-l sm:pl-6">
                  <div className="text-center">
                    <p className="text-xs font-medium opacity-90">Est. for 1 Day</p>
                    <p className="text-lg font-bold">৳{equipment.price.toLocaleString()}</p>
                  </div>
                  <div className="w-px h-10 bg-orange-500/30 hidden sm:block" />
                  <div className="text-center">
                    <p className="text-xs font-medium opacity-90">Est. for 7 Days</p>
                    <p className="text-lg font-bold">
                      ৳{(equipment.price * 7).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6"
            >
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
                Description
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line">
                {equipment.description}
              </p>
            </motion.div>

            {/* Specs grid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6"
            >
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
                Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Category", value: equipment.category, icon: Package },
                  { label: "Rental Type", value: RENTAL_TYPE_LABELS[equipment.rentalType] || equipment.rentalType, icon: RotateCcw },
                  { label: "Condition", value: CONDITION_LABELS[equipment.condition] || equipment.condition, icon: Star },
                  { label: "Location", value: equipment.location, icon: MapPin },
                  { label: "Brand", value: equipment.brand || "—", icon: Shield },
                  { label: "Model", value: equipment.model || "—", icon: Truck },
                  { label: "Available Qty", value: String(qty), icon: Users },
                  { label: "Status", value: equipment.status?.charAt(0).toUpperCase() + equipment.status?.slice(1), icon: Info },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      <spec.icon className="w-3.5 h-3.5" />
                      {spec.label}
                    </div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Terms */}
            {equipment.terms && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6"
              >
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-orange-500" />
                  Rental Terms & Conditions
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line">
                  {equipment.terms}
                </p>
              </motion.div>
            )}

            {/* Owner info */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6"
            >
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                Equipment Owner
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-900 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {ownerPhoto ? (
                    <img src={ownerPhoto} alt={ownerName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                      {ownerName.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-bold text-neutral-900 dark:text-white">{ownerName}</p>
                  {ownerEmail && (
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{ownerEmail}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Sidebar: Booking ── */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="sticky top-24 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Book This Equipment</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400">
                  Secure Checkout
                </span>
              </div>

              <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 space-y-4">
                {/* Date range */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      min={format(new Date(), "yyyy-MM-dd")}
                      value={form.startDate}
                      onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                        formErrors.startDate
                          ? "border-red-500 focus:ring-red-500"
                          : "border-neutral-300 dark:border-neutral-700 focus:ring-orange-500"
                      } bg-white dark:bg-neutral-850 text-neutral-900 dark:text-white`}
                    />
                    {formErrors.startDate && (
                      <p className="mt-1 text-xs text-red-500">{formErrors.startDate}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      min={form.startDate || format(new Date(), "yyyy-MM-dd")}
                      value={form.endDate}
                      onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                        formErrors.endDate
                          ? "border-red-500 focus:ring-red-500"
                          : "border-neutral-300 dark:border-neutral-700 focus:ring-orange-500"
                      } bg-white dark:bg-neutral-850 text-neutral-900 dark:text-white`}
                    />
                    {formErrors.endDate && (
                      <p className="mt-1 text-xs text-red-500">{formErrors.endDate}</p>
                    )}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Quantity <span className="text-red-500">*</span>
                    <span className="font-normal text-neutral-500"> (Max: {qty})</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={qty}
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: Math.min(qty, Math.max(1, parseInt(e.target.value) || 1)) })}
                    className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                      formErrors.quantity
                        ? "border-red-500 focus:ring-red-500"
                        : "border-neutral-300 dark:border-neutral-700 focus:ring-orange-500"
                    } bg-white dark:bg-neutral-850 text-neutral-900 dark:text-white`}
                  />
                  {formErrors.quantity && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.quantity}</p>
                  )}
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+880 1XXX XXXXXX"
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                      formErrors.contact
                        ? "border-red-500 focus:ring-red-500"
                        : "border-neutral-300 dark:border-neutral-700 focus:ring-orange-500"
                    } bg-white dark:bg-neutral-850 text-neutral-900 dark:text-white`}
                  />
                  {formErrors.contact && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.contact}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Full address for delivery/pickup"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors resize-none ${
                      formErrors.address
                        ? "border-red-500 focus:ring-red-500"
                        : "border-neutral-300 dark:border-neutral-700 focus:ring-orange-500"
                    } bg-white dark:bg-neutral-850 text-neutral-900 dark:text-white`}
                  />
                  {formErrors.address && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.address}</p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Special instructions, access details, etc."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-850 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  />
                </div>

                {/* Availability status */}
                {availability && (
                  <div
                    className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
                      availability.available
                        ? "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400"
                        : "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400"
                    }`}
                  >
                    {availability.available ? (
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    )}
                    <span>
                      {availability.message ||
                        (availability.available ? "Available for selected dates" : "Not available for selected dates")}
                    </span>
                  </div>
                )}

                {/* Price breakdown */}
                {priceBreakdown && (
                  <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 space-y-2 border border-neutral-200 dark:border-neutral-700">
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      Price Breakdown
                    </p>
                    <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
                      <span>৳{priceBreakdown.dailyPrice.toLocaleString()} × {priceBreakdown.days} day(s) × {priceBreakdown.quantity} unit(s)</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        ৳{priceBreakdown.subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-neutral-900 dark:text-white border-t border-neutral-200 dark:border-neutral-700 pt-2">
                      <span>Total (BDT)</span>
                      <span>৳{priceBreakdown.total.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Book button */}
                <button
                  onClick={handleBookingSubmit}
                  disabled={bookingLoading || !availability?.available || qty === 0}
                  className={`w-full py-3 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 ${
                    bookingLoading
                      ? "bg-neutral-300 dark:bg-neutral-700 text-neutral-500 cursor-not-allowed"
                      : !availability?.available || qty === 0
                        ? "bg-neutral-300 dark:bg-neutral-700 text-neutral-500 cursor-not-allowed"
                        : "bg-orange-600 hover:bg-orange-700 text-white shadow-sm hover:shadow-orange-600/20"
                  }`}
                >
                  {bookingLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing…
                    </>
                  ) : qty === 0 ? (
                    "Out of Stock"
                  ) : !availability?.available ? (
                    "Not Available"
                  ) : (
                    <>
                      <Shield className="w-4 h-4" />
                      Proceed to Payment
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-neutral-500 dark:text-neutral-400">
                  Secure payment via Stripe. You'll be redirected to complete checkout.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}