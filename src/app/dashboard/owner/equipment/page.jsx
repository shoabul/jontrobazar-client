"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useApi } from "@/lib/api";
import { showToast } from "../../../../lib/notify";
import MobileTable from "../../../components/MobileTable";
import {
  Package,
  Plus,
  Eye,
  Pencil,
  Trash2,
  AlertCircle,
  CheckCircle,
  XCircle,
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

const STATUS_ICONS = {
  pending: AlertCircle,
  approved: CheckCircle,
  rejected: XCircle,
};

export default function MyEquipmentPage() {
  const { api } = useApi();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEquipment = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api("/equipment/owner/my-equipment");
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to load equipment list");
      }

      setItems(data.data || []);
      setError("");
    } catch (err) {
      console.error("Fetch my equipment error:", err);
      setError(err.message || "Could not load your equipment.");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

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
        <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
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
          className="px-5 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
            My Equipment
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Manage your listed machinery and review approval status
          </p>
        </div>
        <Link
          href="/dashboard/owner/add-equipment"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Equipment
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <Package className="w-12 h-12 text-neutral-300 dark:text-neutral-700" />
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No equipment listed yet. Start by publishing your first machine.
          </p>
          <Link
            href="/dashboard/owner/add-equipment"
            className="px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm transition-colors"
          >
            Add Equipment
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <MobileTable
          columns={[
            { label: "Equipment" },
            { label: "Category" },
            { label: "Daily Rate" },
            { label: "Quantity" },
            { label: "Status" },
            { label: "Actions", align: "right" },
          ]}
          data={items}
          rowKey={(item) => item._id}
          renderRow={(item) => [
            <div key="equip" className="flex items-center gap-3">
              {item.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover border border-neutral-200 dark:border-neutral-800 shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 shrink-0">
                  <Package className="w-5 h-5" />
                </div>
              )}
              <div className="min-w-0">
                <div className="font-semibold text-neutral-900 dark:text-white truncate max-w-[220px]">
                  {item.name}
                </div>
                <div className="text-xs text-neutral-500 truncate max-w-[220px]">
                  {item.location}
                </div>
              </div>
            </div>,
            <span key="cat">
              <span className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-850 text-xs font-semibold text-neutral-700 dark:text-neutral-200">
                {item.category}
              </span>
            </span>,
            <span key="price" className="font-bold text-orange-600 dark:text-orange-400">
              ৳{item.price?.toLocaleString()}
            </span>,
            <span key="qty">
              <span className="text-neutral-700 dark:text-neutral-300">
                {item.quantity} unit{item.quantity > 1 ? "s" : ""}
              </span>
            </span>,
            <span key="status">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-bold uppercase tracking-wider ${STATUS_STYLES[item.status] || STATUS_STYLES.pending}`}
              >
                {(() => {
                  const StatusIcon = STATUS_ICONS[item.status] || AlertCircle;
                  return <StatusIcon className="w-3.5 h-3.5" />;
                })()}
                {item.status}
              </span>
            </span>,
            <div key="actions" className="flex items-center justify-end flex-wrap gap-2">
              <Link
                href={`/equipment/${item._id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                View
              </Link>
              <Link
                href={`/dashboard/owner/equipment/${item._id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-orange-200 dark:border-orange-900 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
                Update
              </Link>
              <button
                onClick={() => handleDelete(item)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-red-200 dark:border-red-900 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>,
          ]}
        />
      </div>
      )}
    </div>
  );
}