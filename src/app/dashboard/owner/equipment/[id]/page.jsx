"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApi } from "../../../../../lib/api";
import {
  MapPin,
  Package,
  ArrowLeft,
  Pencil,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

export default function ViewEquipmentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { api } = useApi();

  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDetails = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await api(`/equipment/${id}`);
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Equipment not found");
      }
      setEquipment(data.data);
      setError("");
    } catch (err) {
      console.error("Fetch equipment details error:", err);
      setError(err.message || "Could not load equipment details.");
    } finally {
      setLoading(false);
    }
  }, [api, id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error || !equipment) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <AlertCircle className="w-10 h-10 text-red-500" />
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{error || "Equipment not found."}</p>
        <button
          onClick={() => router.push("/dashboard/owner/equipment")}
          className="px-5 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs transition-colors"
        >
          Back to My Equipment
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/dashboard/owner/equipment")}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Equipment List
        </button>

        <button
          onClick={() => router.push(`/dashboard/owner/equipment/${id}/edit`)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-sm transition-colors"
        >
          <Pencil className="w-4 h-4" />
          Edit Listing
        </button>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
        <div className="relative h-72 sm:h-96 w-full bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
          {equipment.image ? (
            <img
              src={equipment.image}
              alt={equipment.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400">
              <Package className="w-16 h-16" />
            </div>
          )}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider shadow-sm ${
              equipment.status === "approved"
                ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300"
                : equipment.status === "rejected"
                ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300"
                : "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300"
            }`}>
              {equipment.status}
            </span>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  {equipment.category}
                </span>
                {equipment.brand && (
                  <span className="px-3 py-1 rounded-md bg-orange-50 dark:bg-orange-950/40 text-xs font-bold text-orange-600 dark:text-orange-400">
                    {equipment.brand} {equipment.model}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                {equipment.name}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-sm text-neutral-500">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>{equipment.location}</span>
              </div>
            </div>

            <div className="text-right bg-neutral-50 dark:bg-neutral-950 px-6 py-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                Rental Rate
              </div>
              <div className="text-2xl font-black text-orange-600 dark:text-orange-400">
                ৳{equipment.price?.toLocaleString()}{""}
                <span className="text-xs font-normal text-neutral-500">
                  / {equipment.rentalType || "day"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-neutral-200 dark:border-neutral-800">
            <div>
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                Condition
              </div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white capitalize">
                {equipment.condition || "Excellent"}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                Quantity Available
              </div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white">
                {equipment.quantity || 1} Unit(s)
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                Rental Unit
              </div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white capitalize">
                Per {equipment.rentalType || "Day"}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                Listed On
              </div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white">
                {equipment.createdAt ? new Date(equipment.createdAt).toLocaleDateString() : "N/A"}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              Equipment Description &amp; Specifications
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 whitespace-pre-line">
              {equipment.description}
            </p>
          </div>

          {equipment.terms && (
            <div className="space-y-3 p-5 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50">
              <h3 className="text-sm font-bold text-orange-900 dark:text-orange-300 uppercase tracking-wider">
                Rental Terms &amp; Conditions
              </h3>
              <p className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
                {equipment.terms}
              </p>
            </div>
          )}

          {equipment.owner && (
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {equipment.owner.photo ? (
                  <img
                    src={equipment.owner.photo}
                    alt={equipment.owner.name}
                    className="w-10 h-10 rounded-full object-cover border border-orange-500"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                    {(equipment.owner.name || "O").charAt(0)}
                  </div>
                )}
                <div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white">
                    {equipment.owner.name}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {equipment.owner.email}
                  </div>
                </div>
              </div>
              <span className="text-xs text-neutral-400 font-medium">
                Owner Listing ID: {equipment._id}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}