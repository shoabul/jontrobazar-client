# PROGRESS.md — JontroBazar (client)

## Current Status
- Last completed task: Step 3 — Client layout (dynamic responsive Nav matching screenshot 1, 4-column Footer matching screenshot 2 with new X logo, ThemeContext with light/dark toggle, loading page, not-found page, and error boundary)
- Currently working on: Ready for Step 4 (Auth: BetterAuth integration, register, login, Google social auth, role handling)
- Overall: 3 / 12 build steps done

## Next Steps
1. Configure BetterAuth in Next.js (`src/app/api/auth/[...all]/route.js`) with MongoDB adapter & JWT plugin
2. Create Auth client helper (`src/lib/auth-client.js`)
3. Build Register page with password policy validation (min 6 chars, 1 uppercase, 1 lowercase) and imgbb upload
4. Build Login page with email/password and Google social login
5. Connect active session to Navbar (profile avatar, role badge, dashboard link, and logout)

## Completed Features (summary checklist)
- [x] Setup & env
- [ ] Auth (register / login / Google / JWT via BetterAuth)
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

## Packages Installed
- `next` (^16.4.6)
- `react` (^19.3.0)
- `react-dom` (^19.3.0)
- `tailwindcss` (^4.3.3)
- `lucide-react` (^1.16.0)
- `eslint` (^9)
- `eslint-config-next` (^16.4.6)

## Known Issues / TODO
- BetterAuth endpoints to be wired in Step 4.

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
