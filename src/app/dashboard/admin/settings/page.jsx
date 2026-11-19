"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useApi } from "@/lib/api";
import { showToast } from "../../../../lib/notify";
import { Settings, AlertCircle, RefreshCw } from "lucide-react";

export default function AdminSettingsPage() {
  const { api } = useApi();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api("/admin/settings");
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to load settings");
      }

      setSettings(data.data || null);
      setError("");
    } catch (err) {
      console.error("Fetch settings error:", err);
      setError(err.message || "Could not load platform settings.");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

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
          onClick={fetchSettings}
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
          Platform Settings
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Configure marketplace-wide preferences and options.
        </p>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8">
        {settings ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(settings).map(([key, value]) => (
              <div
                key={key}
                className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800"
              >
                <h4 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                  {key.replace(/([A-Z])/g, " $1")}
                </h4>
                <div className="text-sm text-neutral-800 dark:text-neutral-100">
                  {typeof value === "object" ? JSON.stringify(value) : value}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Settings className="w-12 h-12 text-neutral-400 mb-3" />
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              No platform settings available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}