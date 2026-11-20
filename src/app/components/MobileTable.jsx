"use client";

import React from "react";
import Link from "next/link";

/**
 * Responsive table wrapper.
 *
 * Renders a native `<table>` on desktop (md+) and a stacked card layout on
 * mobile (< md). Cards preserve the same data and actions as the table rows,
 * so the user never loses functionality on small screens.
 *
 * Each column must declare a `breakpoint`:
 *   - "always"  — shown on every card (e.g. the primary label)
 *   - "md"      — hidden on mobile, shown on desktop only (default)
 *   - "sm"      — hidden below sm
 *
 * Pass `rowKey` + `renderRow` (returns the array of column objects for a row)
 * plus `columns` (header labels in display order).
 */
export default function MobileTable({
  columns,
  data,
  renderRow,
  rowKey,
  emptyMessage = "No records found.",
  emptyIcon: EmptyIcon,
  loading,
  skeletonRows = 5,
}) {
  if (loading) {
    return (
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 md:overflow-x-auto">
        <div className="hidden md:table w-full">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-850">
              {columns.map((col, i) => (
                <th key={i} className="px-4 py-3">
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-20 animate-pulse" />
                </th>
              ))}
            </tr>
          </thead>
        </div>
        <div className="md:hidden space-y-3 p-4">
          {[...Array(skeletonRows)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16 text-neutral-500 dark:text-neutral-400">
        {EmptyIcon && <EmptyIcon className="w-12 h-12 mx-auto mb-3 text-neutral-300 dark:text-neutral-600" />}
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-850">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`px-4 py-3 text-left font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300 ${col.align === "right" ? "text-right" : ""}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const cells = renderRow(row);
              return (
                <tr
                  key={rowKey(row)}
                  className="border-b border-neutral-100 dark:border-neutral-800/60 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-850/40 transition-colors"
                >
                  {cells.map((cell, i) => (
                    <td
                      key={i}
                      className={`px-4 py-3 align-top ${columns[i]?.align === "right" ? "text-right" : ""}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden divide-y divide-neutral-200 dark:divide-neutral-800">
        {data.map((row) => {
          const cells = renderRow(row);
          const visibleCells = cells
            .map((cell, i) => ({ cell, col: columns[i] }))
            .filter(({ col }) => !col.breakpoint || col.breakpoint !== "md");

          return (
            <div key={rowKey(row)} className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-850/30 transition-colors">
              {visibleCells.map(({ cell, col }, i) => (
                <div key={i} className="flex items-start justify-between gap-3 py-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 shrink-0">
                    {col.label}
                  </span>
                  <span className="text-sm text-neutral-700 dark:text-neutral-300 text-right break-words">
                    {cell}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}