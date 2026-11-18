"use client";

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";

/**
 * Root shell wrapper.
 *
 * Dashboard routes under `/dashboard` render their own layout (sidebar + content)
 * and must NOT inherit the global `<Nav />` / `<Footer />`. This client boundary
 * inspects the current pathname and conditionally renders the public shell.
 *
 * Wrapped in `<Suspense>` because `usePathname()` is only available at runtime —
 * this allows Next.js to prerender the shell and stream the final pathname in.
 */
export default function AppShell({ children }) {
  return (
    <Suspense fallback={null}>
      <ShellContent>{children}</ShellContent>
    </Suspense>
  );
}

function ShellContent({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Nav />}
      <main className="flex-1 w-full">{children}</main>
      {!isDashboard && <Footer />}
    </>
  );
}