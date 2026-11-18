import DashboardLayout from "../../components/DashboardLayout";

/**
 * Dashboard layout.
 *
 * The root layout renders `<AppShell />`, which detects `/dashboard*` paths and
 * omits the global `<Nav />` / `<Footer />`. This layout injects the role-aware
 * `DashboardLayout` (sidebar + content area) for every dashboard page.
 */
export default function DashboardRootLayout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}