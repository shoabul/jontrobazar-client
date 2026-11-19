"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useApi } from "../../../../lib/api";
import { showToast } from "../../../../lib/notify";
import { Users, RefreshCw, AlertCircle, ShieldCheck } from "lucide-react";

const ROLE_STYLES = {
  customer:
    "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  owner:
    "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800",
  admin:
    "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
};

export default function AdminUsersPage() {
  const { api } = useApi();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api("/users");
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to load users");
      }

      setUsers(data.data || []);
      setError("");
    } catch (err) {
      console.error("Fetch users error:", err);
      setError(err.message || "Could not load user accounts.");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await api(`/users/${userId}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message || "Role update failed");

      showToast("success", `User role updated to ${newRole}.`);
      fetchUsers();
    } catch (err) {
      showToast("error", err.message || "Failed to update role.");
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
          onClick={fetchUsers}
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
          Manage Users
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          View registered accounts and modify their platform roles
        </p>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-850">
                <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  User
                </th>
                <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  Phone
                </th>
                <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  Role
                </th>
                <th className="px-4 py-3 text-right font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  Change Role
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id || u.email}
                  className="border-b border-neutral-100 dark:border-neutral-800/60 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-850/40 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {u.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={u.image}
                          alt={u.name}
                          className="w-10 h-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-800 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {(u.name || u.email || "U").charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="font-semibold text-neutral-900 dark:text-white">
                        {u.name || "Unnamed"}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-300">
                    {u.email}
                  </td>
                  <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">
                    {u.phone || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-bold uppercase tracking-wider ${ROLE_STYLES[u.role] || ROLE_STYLES.customer}`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {u.role || "customer"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <select
                      value={u.role || "customer"}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-semibold text-neutral-800 dark:text-neutral-200 cursor-pointer"
                    >
                      <option value="customer">Customer</option>
                      <option value="owner">Owner</option>
                      <option value="admin">Admin</option>
                    </select>
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