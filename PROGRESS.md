# PROGRESS.md — JontroBazar (client)

## Current Status
- Last completed task: Step 2 — Server auth middlewares, JWT utils, and user routes completed
- Currently working on: Ready for Step 3 (Client: layout, navbar/footer, theme, loading & error pages)
- Overall: 2 / 12 build steps done

## Next Steps
1. Create global layout with dynamic responsive Navbar and Footer (with new X logo)
2. Setup theme support and styling consistency (Tailwind + shadcn styling)
3. Implement global loading page (`loading.js`) and error/404 handling (`error.js`, `not-found.js`)

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
| `/` | `GET` | Public | Boilerplate initialized |
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
- `eslint` (^9)
- `eslint-config-next` (^16.4.6)

## Known Issues / TODO
- Nav component in `src/app/components/Nav.jsx` is currently empty.
- BetterAuth client integration pending in Step 4.

## Log (newest first)
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
