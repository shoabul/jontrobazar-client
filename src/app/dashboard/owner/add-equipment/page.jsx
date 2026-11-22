export const instant = false;

import { AddEquipmentClient } from "./AddEquipmentClient";
import { Suspense } from "react";

export default function AddEquipmentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-3 border-orange-500 border-t-transparent" /></div>}>
      <AddEquipmentClient />
    </Suspense>
  );
}