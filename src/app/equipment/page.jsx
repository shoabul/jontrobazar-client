"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Package,
  RotateCcw,
  Inbox,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import EquipmentCard from "../components/home/EquipmentCard";

const CATEGORIES = [
  "Construction",
  "Photography",
  "Vehicles & Transportation",
  "Agriculture",
  "Electronics",
  "Event Equipment",
];

const RENTAL_TYPES = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const SORTS = [
  { value: "newest", label: "Recently Added" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const PAGE_SIZE = 12;

/**
 * All Equipment (public) — full browse page.
 *
 * Server-side search, filters (category, rental type, price range, availability),
 * sort, and pagination via GET /api/equipment. Reads `?category=` from the URL
 * so the Home page category cards deep-link correctly.
 */
export default function AllEquipmentPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [rentalType, setRentalType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const isFirstLoad = useRef(true);
  const abortRef = useRef(null);

  // ── Deep link: read ?category= from Home page category cards ──
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat && CATEGORIES.includes(cat)) {
      setCategory(cat);
    }
    const rt = params.get("rentalType");
    if (rt && RENTAL_TYPES.some((r) => r.value === rt)) {
      setRentalType(rt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Debounced search input → committed search ──
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput.trim());
    }, 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  // ── Fetch on every filter change ──
  const load = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const params = new URLSearchParams({
      page: String(page),
      limit: String(PAGE_SIZE),
      sort,
    });
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (rentalType) params.set("rentalType", rentalType);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (availableOnly) params.set("available", "true");

    setLoading(true);
    setError("");
    try {
      const res = await apiFetch(`/equipment?${params.toString()}`, {
        signal: controller.signal,
      });
      const data = await res.json();
      if (data.success) {
        setItems(data.data || []);
        setPagination(data.pagination || null);
      } else {
        setError(data.message || "Failed to load equipment");
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("Failed to load equipment. Please try again.");
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, [page, sort, search, category, rentalType, minPrice, maxPrice, availableOnly]);

  useEffect(() => {
    load();
  }, [load]);

  // Reset to page 1 whenever any filter changes (not on first mount)
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, rentalType, minPrice, maxPrice, availableOnly, sort]);

  const resetFilters = () => {
    setSearchInput("");
    setSearch("");
    setCategory("");
    setRentalType("");
    setMinPrice("");
    setMaxPrice("");
    setAvailableOnly(false);
    setSort("newest");
    setPage(1);
  };

  const activeFilterCount =
    (search ? 1 : 0) +
    (category ? 1 : 0) +
    (rentalType ? 1 : 0) +
    (minPrice || maxPrice ? 1 : 0) +
    (availableOnly ? 1 : 0);

  const selectClass =
    "w-full appearance-none bg-white dark:bg-neutral-850 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer";

  const inputClass =
    "w-full bg-white dark:bg-neutral-850 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500";

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#090d16]">
      {/* ── Page header ── */}
      <div className="bg-neutral-950 dark:bg-[#0c1017] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              All Equipment
            </h1>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-2xl">
              Browse the full verified fleet across Bangladesh. Search by name,
              location or category — every listing is owner-verified and
              payment-secured.
            </p>
          </motion.div>

          {/* Search + controls row */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by equipment, location, brand or category…"
                className="w-full bg-neutral-900 border border-neutral-750 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="sm:w-48 appearance-none bg-neutral-900 border border-neutral-750 rounded-lg px-4 py-2.5 text-sm font-medium text-neutral-200 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setFiltersOpen((v) => !v)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                  filtersOpen || activeFilterCount
                    ? "bg-orange-600 text-white"
                    : "bg-neutral-800 text-neutral-200 hover:bg-neutral-750"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-white text-orange-600 text-[11px] font-black">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filters panel ── */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0c1017]"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={selectClass}
                  >
                    <option value="">All Categories</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                    Rental Type
                  </label>
                  <select
                    value={rentalType}
                    onChange={(e) => setRentalType(e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Any</option>
                    {RENTAL_TYPES.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                    Price Range (৳)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className={inputClass}
                    />
                    <input
                      type="number"
                      min="0"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 lg:col-span-3 flex flex-wrap items-center gap-4">
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={availableOnly}
                      onChange={(e) => setAvailableOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600 accent-orange-600"
                    />
                    <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      In stock only
                    </span>
                  </label>
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1.5 ml-auto text-sm font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset all
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Results ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Result meta */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {loading
              ? "Loading equipment…"
              : pagination
                ? `Showing ${items.length} of ${pagination.total} listing${
                    pagination.total === 1 ? "" : "s"
                  }`
                : ""}
          </p>
          {activeFilterCount > 0 && !loading && (
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline inline-flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Clear filters
            </button>
          )}
        </div>

        {/* Error */}
        {error && !loading && (
          <div className="rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 p-8 text-center">
            <p className="text-red-600 dark:text-red-400 font-semibold">
              {error}
            </p>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 animate-pulse h-72"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && items.length === 0 && (
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4">
              <Inbox className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              No equipment found
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-md mx-auto">
              We couldn't find any listings matching your search or filters.
              Try widening your price range or clearing filters.
            </p>
            <button
              onClick={resetFilters}
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset filters
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && items.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, idx) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.4) }}
                >
                  <EquipmentCard item={item} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Pagination */}
        {!loading &&
          pagination &&
          pagination.totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-4 py-2 rounded-lg text-sm font-bold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              )
                .filter(
                  (p) =>
                    p === 1 ||
                    p === pagination.totalPages ||
                    Math.abs(p - page) <= 1
                )
                .map((p, idx, arr) => (
                  <React.Fragment key={p}>
                    {idx > 0 && p - arr[idx - 1] > 1 && (
                      <span className="text-neutral-400 px-1">…</span>
                    )}
                    <button
                      onClick={() => setPage(p)}
                      className={`min-w-10 px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                        p === page
                          ? "bg-orange-600 text-white shadow-sm"
                          : "border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      {p}
                    </button>
                  </React.Fragment>
                ))}
              <button
                disabled={page >= pagination.totalPages}
                onClick={() =>
                  setPage((p) => Math.min(pagination.totalPages, p + 1))
                }
                className="px-4 py-2 rounded-lg text-sm font-bold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
      </div>

      {/* ── Quick facts strip ── */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0c1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: Package,
              title: "64 Districts Covered",
              text: "Owners from every corner of Bangladesh",
            },
            {
              icon: MapPin,
              title: "Site Delivery",
              text: "Most listings include on-site delivery options",
            },
            {
              icon: RotateCcw,
              title: "Secure Payments",
              text: "Stripe-secured checkout with instant confirmation",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-orange-50 dark:bg-orange-950/50 border border-orange-100 dark:border-orange-900/50 flex items-center justify-center">
                <Icon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                  {title}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}