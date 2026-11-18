# PROGRESS.md — JontroBazar (client)

## Current Status
- Last completed task: Step 4 — BetterAuth integration (register, login, Google social, JWT plugin, AuthContext, Nav updated with real session)
- Currently working on: Step 5 — Server: Equipment CRUD routes + Step 6: Owner dashboard pages
- Overall: 4 / 12 build steps done

## Next Steps
1. Step 5 (Server): Equipment CRUD — `controllers/equipment.controller.js`, `routes/equipment.routes.js`, MongoDB text index, status workflow
2. Step 6 (Client): Owner dashboard pages — Add Equipment (imgbb upload), My Equipment table (update/delete/view)
3. Step 7 (Admin): Approve/reject equipment, manage users pages
4. Step 8: Home page sections (banner, featured 6, categories, Why Choose Us, reviews, Framer Motion)
5. Step 9: All Equipment public page (server-side search/filter/sort/pagination)

## Completed Features (summary checklist)
- [x] Setup & env
- [x] Auth (register / login / Google / JWT via BetterAuth)
- [ ] Role middlewares / protected routes
- [ ] Owner: equipment CRUD
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
### 2026-11-18 — Step 4: BetterAuth Integration (Register, Login, Google, JWT, AuthContext)
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
