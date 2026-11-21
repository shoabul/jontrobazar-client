import DashboardLayout from "../components/DashboardLayout";
import DashboardGuard from "../components/DashboardGuard";

/**
 * Dashboard layout.
 *
 * The root layout renders `<AppShell />`, which detects `/dashboard*` paths and
 * omits the global `<Nav />` / `<Footer />`. This layout injects the role-aware
 * `DashboardLayout` (sidebar + content area) for every dashboard page.
 * DashboardGuard protects all dashboard routes - unauthenticated users are
 * redirected to /login.
 */
export default function DashboardRootLayout({ children }) {
  return (
    <DashboardGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </DashboardGuard>
  );
}