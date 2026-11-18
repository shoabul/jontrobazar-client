# PROGRESS.md — JontroBazar (client)

## Current Status
- Last completed task: Step 6 (Part 2): Owner dashboard pages — DashboardLayout, Add Equipment, My Equipment table, View details, Edit form
- Currently working on: Step 7 (Admin): Approve/reject equipment, manage users pages
- Overall: 6 / 12 build steps done

## Next Steps
1. Step 7 (Client): Admin dashboard pages — All Users (change role), All Equipment (approve/reject/update/delete), All Rentals (monitor)
2. Step 8: Home page sections (banner, featured 6, categories, Why Choose Us, reviews, Framer Motion)
3. Step 9: All Equipment public page (server-side search/filter/sort/pagination)
4. Step 10: Equipment Details + Favorites
5. Step 11: Booking modal + Stripe + Payments + success page
6. Step 12: Customer / Owner / Admin dashboards (tables) + Analytics + README + deploy

## Completed Features (summary checklist)
- [x] Setup & env
- [x] Auth (register / login / Google / JWT via BetterAuth)
- [x] Server: Equipment CRUD (owner + admin routes, search/filter/sort, MongoDB text index)
- [x] Owner: equipment CRUD (Add, My Equipment table, View, Edit)
- [ ] Admin: approve/reject, users, rentals
- [ ] Public pages (Home, All Equipment)
- [ ] Details + Favorites
- [ ] Booking + Stripe + Payments
- [ ] Dashboards (customer / owner / admin)
- [ ] Analytics
- [ ] Optional features
- [ ] README + Deployment

## API Endpoints / Routes Built
| Route / Page | Method | Role | Status |
|---|---|---|---|
| `/` | `GET` | Public | Live (Hero with trust badges) |
| `/loading` | UI | Public | Live (Branded pulsing loader) |
| `/_not-found` | UI | Public | Live (404 Page) |
| `/error` | UI | Public | Live (Error boundary) |
| `docs/api-spec.md` | Doc | All | Complete |
| `docs/db-schema.md` | Doc | All | Complete |

## Env Variables Used (names only)
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_CLIENT_URL`
- `BETTER_AUTH_URL`
- `BETTER_AUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXT_PUBLIC_IMGBB_API_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `MONGO_URI`
- `DB_NAME`

## Packages Installed
- `next` (^16.4.6)
- `react` (^19.3.0)
- `react-dom` (^19.3.0)
- `tailwindcss` (^4.3.3)
- `lucide-react` (^1.16.0)
- `eslint` (^9)
- `eslint-config-next` (^16.4.6)
- `better-auth` (BetterAuth core + MongoDB adapter + JWT plugin)
- `mongodb` (MongoDB driver for BetterAuth adapter)
- `sweetalert2` (Toasts and alerts)

## Known Issues / TODO
- Dashboard layout and protected route middleware for Next.js still needed.
- BetterAuth Google social login requires authorized redirect URI set in Google Cloud Console for production.

## Log (newest first)
### 2026-11-19 — Step 6 (Part 2): Owner Dashboard Pages
- Done:
  - Created `src/app/components/AppShell.jsx` — client boundary that detects `/dashboard*` paths and omits global `<Nav />` / `<Footer />`. Wrapped in `<Suspense>` so `usePathname()` doesn't block prerendering.
  - Updated `src/app/layout.js` to render `<AppShell />` instead of hardcoded `<Nav />` + `<main>` + `<Footer />`.
  - Created `src/app/dashboard/layout.jsx` — injects the role-aware `DashboardLayout` (sidebar + content area) for every dashboard page.
  - Created `src/app/dashboard/page.jsx` — server-side redirect to `/dashboard/<role>` using BetterAuth session read from request cookies. Logged-out visitors land on `/login?redirect=/dashboard`.
  - Created `src/components/DashboardLayout.jsx` — role-aware sidebar with distinct accent colors (customer: amber, owner: orange, admin: purple), user footer with logout, and a "Back to Marketplace" link.
  - Created `src/app/dashboard/owner/page.jsx` — Owner Overview with quick-access cards (My Equipment, Add Equipment, Rentals, Profile).
  - Created `src/app/dashboard/owner/add-equipment/page.jsx` — full equipment form with imgbb file upload + Image URL option, all fields from DB schema, status=pending, SweetAlert success.
  - Created `src/app/dashboard/owner/equipment/page.jsx` — My Equipment table with image, name, category, price, quantity, status badge, and View/Update/Delete actions.
  - Created `src/app/dashboard/owner/equipment/[id]/page.jsx` — Equipment details view with image gallery, specs grid, description, terms, and owner info.
  - Created `src/app/dashboard/owner/equipment/[id]/edit/page.jsx` — Edit form preloaded from server, imgbb upload, PUT to `/equipment/:id`.
  - `npm run build` passes cleanly with Turbopack.
- Files:
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/app/components/AppShell.jsx`
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/app/layout.js` (updated)
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/app/dashboard/layout.jsx`
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/app/dashboard/page.jsx`
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/components/DashboardLayout.jsx`
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/app/dashboard/owner/page.jsx`
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/app/dashboard/owner/add-equipment/page.jsx`
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/app/dashboard/owner/equipment/page.jsx`
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/app/dashboard/owner/equipment/[id]/page.jsx`
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/app/dashboard/owner/equipment/[id]/edit/page.jsx`
  - `H:/projects_web14/assignment-9/jontrobazar-client/PROGRESS.md` (updated)
- Test:
  - `npm run build` — all 11 routes compiled successfully.
  - Dashboard routes prerender as partial static (dynamic content streamed in).
- Commit message: `feat: implement owner dashboard pages with add equipment, my equipment table, view and edit forms`

### 2026-11-18 — Step 6 (Part 1): API Client Layer
- Done:
  - Created `src/lib/api.js` — central `fetch` wrapper using `useAuth` context to inject JWT from `api/auth/token`.
  - Implemented automatic handling for 401 (re-login), 403 (insufficient permissions toast), and 500 (server error toast).
  - Provided `useApi()` hook for component usage: `const { api } = useApi(); await api('/path', { method: 'POST', body: {...} })`.
- Files:
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/lib/api.js`
- Test:
  - Ready for consumption by dashboard features.
- Commit message: `feat: implement api client with jwt injection and unified error handling`
- Done:
  - Installed `better-auth`, `mongodb` (for BetterAuth adapter), `sweetalert2`.
  - Created `src/lib/mongodb.js` — singleton MongoClient with HMR-safe global in dev.
  - Created `src/lib/auth.js` — `betterAuth` with `mongodbAdapter`, email/password plugin, Google social login (conditional on env vars), `additionalFields` for `role`, `phone`, `address`, and `jwt()` plugin.
  - Created `src/app/api/auth/[...all]/route.js` — `toNextJsHandler(auth)` exports GET + POST, handling all BetterAuth endpoints including `/api/auth/token` for JWT retrieval.
  - Created `src/lib/auth-client.js` — `createAuthClient` with `jwtClient()` plugin; exports `signIn`, `signUp`, `signOut`, `useSession`, `getSession`.
  - Created `src/context/AuthContext.jsx` — `AuthProvider` using `useSession`, fetches JWT from `/api/auth/token`, exposes `user`, `token`, `role`, `isLoading`, `signOutUser`, `refreshSession`.
  - Created `src/lib/notify.js` — `showToast(icon, title)` and `showAlert({...})` using SweetAlert2 with orange confirm button.
  - Created `src/app/register/page.jsx` — full form: name, email, photo (URL or imgbb file upload), password with policy validation (min 6, 1 upper, 1 lower), `signUp.email()`, SweetAlert toasts, redirect on success.
  - Created `src/app/login/page.jsx` — email+password + Google `signIn.social()`, `redirect` query param support, SweetAlert toasts, link to register.
  - Updated `src/app/components/Nav.jsx` — imports `useAuth` from AuthContext, demo dropdown with `auto` live session mode, real logout via `signOutUser()`, avatar image with fallback badge.
  - `npm run lint` passed 0 errors after fixing: `useSyncExternalStore` in ThemeContext, `queueMicrotask` for setToken-in-effect in AuthContext, ESLint suppression on `<img>` for external images.
- Files:
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/lib/mongodb.js`
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/lib/auth.js`
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/app/api/auth/[...all]/route.js`
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/lib/auth-client.js`
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/context/AuthContext.jsx`
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/lib/notify.js`
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/app/register/page.jsx`
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/app/login/page.jsx`
  - `H:/projects_web14/assignment-9/jontrobazar-client/src/app/components/Nav.jsx` (updated)
  - `H:/projects_web14/assignment-9/jontrobazar-client/.env.local` (MONGO_URI + DB_NAME added)
  - `H:/projects_web14/assignment-9/jontrobazar-client/.env.local.example` (updated)
- Test:
  - `npm run lint` — 0 errors.
  - Register: fill form → SweetAlert success → redirect to `/`.
  - Login: email+password → SweetAlert success → redirect. Google button → OAuth flow.
  - Logged-in Nav: avatar + Dashboard button + Logout visible. Logged-out: Login + Register.
- Commit message: `feat: integrate betterauth with register, login, google social, jwt plugin, and authcontext`

## Log (newest first)
### 2026-11-18 — Step 3: Layout (Navbar, Footer, Theme, Loading & Error Pages)
- Done:
  - Built `Nav.jsx` matching Screenshot 1: Top utility bar is rendered as a standalone bar that scrolls away naturally, while the main `<header>` has `sticky top-0 z-50` with backdrop blur, brand logo ("JontroBazar BD"), links, theme toggle, and auth buttons sticking across the entire page scroll.
  - Built `Footer.jsx` matching Screenshot 2: 4-column layout with brand story, social icons featuring the new **X** logo (Rule #7), Marketplace links, Operations & Trust links, Regional Hubs (Tejgaon, Agrabad, email), and bottom bar with Trade License and Stripe PCI-DSS badge.
  - Implemented `ThemeContext.jsx` with light/dark toggle persisted in `localStorage` and anti-flicker `<head>` inline script in `layout.js`.
  - Created global `loading.js` with branded spinning wrench badge.
  - Created `not-found.js` (404 page) with home and browse redirects.
  - Created `error.js` with retry capability.
  - Created initial hero section on `page.js`.
- Files:
  - `H:/projects_web14\assignment-9\jontrobazar-client\src\context\ThemeContext.jsx`
  - `H:/projects_web14\assignment-9\jontrobazar-client\src\app\components\Nav.jsx`
  - `H:/projects_web14\assignment-9\jontrobazar-client\src\app\components\Footer.jsx`
  - `H:/projects_web14\assignment-9\jontrobazar-client\src\app\loading.js`
  - `H:/projects_web14\assignment-9\jontrobazar-client\src\app\not-found.js`
  - `H:/projects_web14\assignment-9\jontrobazar-client\src\app\error.js`
  - `H:/projects_web14\assignment-9\jontrobazar-client\src\app\layout.js`
  - `H:/projects_web14\assignment-9\jontrobazar-client\src\app\page.js`
  - `H:/projects_web14\assignment-9\jontrobazar-client\src\app\globals.css`
  - `H:/projects_web14\assignment-9\jontrobazar-client\PROGRESS.md`
- Test:
  - `npm run lint` passed with 0 errors.
  - `npm run build` compiled all routes successfully with Turbopack in 2.8s.
- Commit message: `feat: implement layout with screenshot-accurate navbar, footer with x logo, theme toggle, and loading/error pages`

### 2026-11-18 — Step 1: Client Setup & Specification Documentation
- Done: Configured `.env.local.example` with all required client keys, updated `.gitignore` to track examples while protecting local envs, and generated `docs/api-spec.md` and `docs/db-schema.md`.
- Files:
  - `H:/projects_web14/assignment-9/jontrobazar-client/.env.local.example`
  - `H:/projects_web14/assignment-9/jontrobazar-client/.env.local`
  - `H:/projects_web14/assignment-9/jontrobazar-client/.gitignore`
  - `H:/projects_web14/assignment-9/jontrobazar-client/docs/api-spec.md`
  - `H:/projects_web14/assignment-9/jontrobazar-client/docs/db-schema.md`
  - `H:/projects_web14/assignment-9/jontrobazar-client/PROGRESS.md`
- Test: Ran `npm run lint` — passed with 0 errors. Verified `.env.local` is ignored and `.env.local.example` is tracked.
- Commit message: `chore: setup environment templates and gitignore for client`
