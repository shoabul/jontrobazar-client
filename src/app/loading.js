import React from "react";
import { Wrench } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center p-6 bg-white dark:bg-[#090d16] transition-colors">
      <div className="relative flex items-center justify-center">
        {/* Animated outer ring */}
        <div className="w-20 h-20 rounded-2xl border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
        
        {/* Centered logo badge */}
        <div className="absolute w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-md">
          <Wrench className="w-6 h-6 text-orange-500 animate-pulse" />
        </div>
      </div>

      <div className="mt-6 text-center space-y-1.5">
        <h3 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight">
          Loading Jontro<span className="text-orange-500">Bazar</span> Fleet
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Syncing verified equipment listings &amp; availability...
        </p>
      </div>
    </div>
  );
}
