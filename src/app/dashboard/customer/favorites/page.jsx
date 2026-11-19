"use client";

import React, { useEffect, useState } from "react";
import { useApi } from "@/lib/api";
import { showToast } from "@/lib/notify";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  HeartOff,
  Package,
  Truck,
  Calendar,
  CreditCard,
  AlertCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";

/**
 * Customer Favorites Page
 * Displays all favorited equipment for the logged-in customer in a table.
 * Data: GET /api/favorites
 * Actions: DELETE /api/favorites/:equipmentId
 */

function formatCurrency(amount) {
  if (amount === undefined || amount === null) return "—";
  return `৳${Number(amount).toLocaleString()}`;
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

export default function CustomerFavoritesPage() {
  const { api } = useApi();
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setIsLoading(true);
        const res = await api("/favorites");
        const data = await res.json();

        if (data.success) {
          setFavorites(data.data || []);
        } else {
          setError(data.message || "Failed to load favorites");
          showToast("error", data.message || "Failed to load favorites");
        }
      } catch (err) {
        setError("Failed to load favorites. Please try again.");
        showToast("error", "Failed to load favorites");
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [api]);

  const handleRemove = async (equipmentId) => {
    try {
      setDeletingId(equipmentId);
      const res = await api(`/favorites/${equipmentId}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setFavorites((prev) => prev.filter((f) => f.equipmentId !== equipmentId));
        showToast("success", "Removed from favorites");
      } else {
        showToast("error", data.message || "Failed to remove favorite");
      }
    } catch (err) {
      showToast("error", "Failed to remove favorite");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
            Favorites
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Your saved equipment for quick access.
          </p>
        </div>
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Equipment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Saved On
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4"></div>
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

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
            Favorites
          </h2>
        </div>
        <div className="text-center py-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            Failed to load favorites
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
          Favorites
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Your saved equipment for quick access.{" "}
          <span className="font-medium text-neutral-700 dark:text-neutral-300">
            {favorites.length} item{favorites.length !== 1 ? "s" : ""}
          </span>
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
          <Heart className="w-16 h-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            No favorites yet
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400 mb-6">
            Save equipment you like by clicking the heart icon on equipment cards.
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Equipment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Saved On
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {favorites.map((fav) => {
                  const eq = fav.equipment;
                  return (
                    <motion.tr
                      key={fav._id || fav.equipmentId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          {eq?.image && (
                            <img
                              src={eq.image}
                              alt={eq.name}
                              className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <h4 className="font-semibold text-neutral-900 dark:text-white truncate max-w-xs">
                              {eq?.name || "Equipment"}
                            </h4>
                            {eq?.brand && (
                              <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate max-w-xs">
                                {eq.brand} {eq.model ? `· ${eq.model}` : ""}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                          {eq?.category || "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-white">
                        {formatCurrency(eq?.price)}
                        <span className="text-neutral-500 dark:text-neutral-400 font-normal ml-1">
                          /{eq?.rentalType || "day"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-300">
                        {eq?.location || "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-300">
                        {formatDate(fav.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {eq?._id && (
                            <Link
                              href={`/equipment/${eq._id}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                            >
                              <Truck className="w-3.5 h-3.5" />
                              View
                            </Link>
                          )}
                          <button
                            onClick={() => handleRemove(fav.equipmentId)}
                            disabled={deletingId === fav.equipmentId}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors disabled:opacity-50"
                          >
                            {deletingId === fav.equipmentId ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <>
                                <HeartOff className="w-3.5 h-3.5" />
                                Remove
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}