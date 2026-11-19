"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useApi } from "@/lib/api";
import { showToast } from "../../../../lib/notify";
import {
  Wrench,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const STATUS_STYLES = {
  pending:
    "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  approved:
    "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  rejected:
    "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
};

export default function AdminEquipmentPage() {
  const { api } = useApi();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEquipment = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api("/admin/equipment");
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to load equipment list");
      }

      setItems(data.data || []);
      setError("");
    } catch (err) {
      console.error("Fetch admin equipment error:", err);
      setError(err.message || "Could not load equipment inventory.");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  const handleStatusChange = async (itemId, newStatus) => {
    try {
      const res = await api(`/equipment/${itemId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message || "Status update failed");

      showToast("success", `Equipment status updated to ${newStatus}.`);
      fetchEquipment();
    } catch (err) {
      showToast("error", err.message || "Failed to update status.");
    }
  };

  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      `Delete "${item.name}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      const res = await api(`/equipment/${item._id}`, { method: "DELETE" });
      const data = await res.json();

      if (!data.success) throw new Error(data.message || "Delete failed");

      showToast("success", "Equipment listing deleted.");
      fetchEquipment();
    } catch (err) {
      showToast("error", err.message || "Failed to delete equipment.");
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
          onClick={fetchEquipment}
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
          Equipment Moderation
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Review pending listings and manage marketplace inventory
        </p>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-850">
                <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  Equipment
                </th>
                <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  Owner
                </th>
                <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  Category
                </th>
                <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  Rate
                </th>
                <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  Status
                </th>
                <th className="px-4 py-3 text-right font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-neutral-100 dark:border-neutral-800/60 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-850/40 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover border border-neutral-200 dark:border-neutral-800 shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 shrink-0">
                          <Wrench className="w-5 h-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="font-semibold text-neutral-900 dark:text-white truncate max-w-[200px]">
                          {item.name}
                        </div>
                        <div className="text-xs text-neutral-500 truncate max-w-[200px]">
                          {item.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-300">
                    <div className="font-medium text-xs">
                      {item.owner?.name || "Owner"}
                    </div>
                    <div className="text-[10px] text-neutral-400">
                      {item.owner?.email || ""}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-850 text-xs font-semibold text-neutral-700 dark:text-neutral-200">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-purple-600 dark:text-purple-400">
                    ৳{item.price?.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs font-bold uppercase tracking-wider ${STATUS_STYLES[item.status] || STATUS_STYLES.pending}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/equipment/${item._id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </Link>
                      {item.status !== "approved" && (
                        <button
                          onClick={() =>
                            handleStatusChange(item._id, "approved")
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-emerald-200 dark:border-emerald-900 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors cursor-pointer"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          Approve
                        </button>
                      )}
                      {item.status !== "rejected" && (
                        <button
                          onClick={() =>
                            handleStatusChange(item._id, "rejected")
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-amber-200 dark:border-amber-900 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Reject
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-red-200 dark:border-red-900 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
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