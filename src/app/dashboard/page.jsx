import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "../../lib/auth";

/**
 * `/dashboard` redirects to the role-specific dashboard route.
 *
 * The redirect happens on the server (no flash) using the BetterAuth session
 * read from request cookies, so a logged-out visitor lands on `/login`
 * instead of a broken dashboard shell.
 *
 * Calling `headers()` here forces dynamic rendering — Next.js detects the
 * request-time API usage and skips static generation for this route.
 */
export default async function DashboardIndex() {
  const h = await headers();
  const session = await auth.api.session({ headers: h });
  if (!session?.user) {
    redirect("/login?redirect=/dashboard");
  }
  const role = session.user.role || "customer";
  redirect(`/dashboard/${role}`);
}