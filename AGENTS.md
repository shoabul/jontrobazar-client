<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


# JontroBazar — Project Context for AI Agent

> Read this file fully before writing any code. Follow it strictly. If something is unclear, ask before assuming.

## 1. Project Summary
JontroBazar is a role-based equipment rental marketplace (Bangladesh market). Equipment **Owners** list equipment, **Customers** browse, book and pay (Stripe), and an **Admin** approves listings and manages the platform.

Roles: `customer`, `owner`, `admin`.

## 2. Tech Stack
- **Frontend:** Next.js (App Router), JavaScript , Tailwind CSS +  shadcn stay consistent, Framer Motion
- **Auth:** BetterAuth + MongoDB adapter, JWT access token, Google social login (default role = `customer`)
- **Backend:** Express.js + MongoDB (native driver or Mongoose)
- **Payment:** Stripe Checkout
- **Uploads:** imgbb (equipment image / profile photo)
- **Optional:** pagination, dark/light theme (localStorage), node-cron booking auto-complete, email notifications

## 3. Repo Structure (two separate repos/folders)
```
jontrobazar-client/   # Next.js
jontrobazar-server/   # Express API
```
Never put secrets in code. Use `.env` (client: `.env.local`) and keep a `.env.example`. Mongo URI, Stripe keys, JWT secret, BetterAuth secret, imgbb key, Firebase/Google keys must all be env variables.

## 4. Rules for the AI (IMPORTANT)
1. Make small, focused changes. Do NOT rewrite working code unless asked.
2. One feature per task. After each feature, stop and let me test + commit.
3. Suggest a descriptive commit message after each feature (need 20+ client commits, 12+ server commits).
4. Do not create extra files/folders beyond what the feature needs.
5. No fake/placeholder logic in finished features. No hardcoded secrets.
6. UI must look professional and consistent — not generic AI-looking. Same heading style, same button style, equal-height cards, proper spacing, fully responsive (mobile/tablet/desktop).
7. Use the new **X** logo (not the Twitter bird) in the footer.
8. Show a toast/SweetAlert on success and error actions.
9. Add loading page and error/404 page.
10. Reloading any route (including private ones) must NOT error and must NOT log a logged-in user out.
11. Production must have no CORS / 404 / 504 errors.

## 5. Authentication & Authorization
- Register: name, email, photo (URL or imgbb), password. Password: min 6 chars, 1 uppercase, 1 lowercase — otherwise show error toast.
- Login: email/password + Google. Links between Login and Register.
- JWT issued on login; sent with API requests.
- Server middlewares (custom Express): `verifyToken`, `verifyCustomer`, `verifyOwner`, `verifyAdmin`.
- Protect frontend private routes AND backend endpoints by role.
- No email verification, no forgot password.

## 6. Database Collections
- `users` — name, email, photo, phone, address, role, createdAt
- `equipment` — name, description, category, location, price, rentalType (daily/weekly/monthly), quantity, condition, brand, model, image, terms, status (`pending`/`approved`/`rejected`), owner {name, email, photo}, createdAt
- `bookings` — equipmentId, customer info, owner info, startDate, endDate, quantity, contact, address, notes, totalAmount, paymentStatus, bookingStatus, createdAt
- `payments` — bookingId, transactionId, amount, customerEmail, status, createdAt
- `favorites` — userEmail, equipmentId, createdAt

## 7. Pages & Features

### Layout
Navbar (dynamic) → Dynamic content → Footer.
Navbar: Logo + "JontroBazar", Home, All Equipment, About (opt), Contact (opt), How It Works (opt), Login, Register; when logged in: Dashboard + Logout.

### Home (public)
Banner (image + title + description), Featured Equipment (6 approved, Mongo `limit`; View Details → Login if logged out), Categories (Construction, Photography, Vehicles & Transportation, Agriculture, Electronics, Event Equipment), Why Choose Us, Customer Reviews (min 4: name, rating, comment), 2+ extra sections (e.g. How It Works, Recently Added). Framer Motion on Banner, Featured, Categories.

### All Equipment (public)
3-column grid of approved equipment. Card: image, name, category, price, rental type, location, availability, View Details.
**Backend** search (name, location, title/category), filters (category, rental type, price range, availability), sort (price low→high, high→low, recently added). Pagination optional.

### Equipment Details (private)
Name, description, category, price, rental type, location, available quantity, image, owner info, terms. **Add to Favorites** (saved in DB). **Book Now** modal: start date, end date, quantity, contact number, delivery address, notes → calculate total (days × price × quantity) → check availability → Stripe Checkout. After payment success: create booking, save transaction in `payments`, redirect to success page.

### Customer Dashboard
My Rentals (table: equipment, start, end, booking date, total, payment status, booking status) · Favorites (table: view details, remove) · Profile.

### Owner Dashboard
Add Equipment (all fields, imgbb upload, status = pending) · My Equipment (table + update/delete/view) · My Equipment Rental (customer info, equipment, duration, quantity, amount, payment status, booking status) · Profile · **Analytics**.

### Admin Dashboard
All Users (change role) · All Equipment (approve / reject / update / delete) · All Rentals (monitor) · Profile · **Analytics**.

### Profile (all roles)
Name, email, image, phone, address — editable.

## 8. Analytics (Challenge 3)
- **Admin:** total users, total equipment, total bookings, pending approvals, completed rentals, total revenue, monthly booking stats (chart).
- **Owner:** total listed equipment, completed rentals, total earnings, monthly earnings (chart).
Use charts (e.g. Recharts). Compute on the server with MongoDB aggregation.

## 9. Dashboard UI Requirements
Responsive (mobile + tablet), consistent color theme, full-width layout, charts, user profile section.

## 10. README (required)
Project name, purpose, live URL, key features, npm packages used.

## 11. Deployment Checklist
- [ ] Server live, no CORS/404/504
- [ ] Client live, no error on landing
- [ ] Reload works on every route
- [ ] Logged-in user stays logged in on private-route reload
- [ ] Env vars set on hosting (client + server)
- [ ] Google OAuth + Stripe + CORS allowed origins updated for production URL

## 12. Build Order (follow this sequence)
1. ✅ Setup both projects, env, MongoDB connection, git
2. ✅ Server: users collection + JWT + middlewares
3. ✅ Client: layout (navbar/footer), theme, loading + error page
4. ✅ Auth: register, login, Google, role handling
5. ✅ Server: Equipment CRUD (owner + admin routes, search/filter/sort)
6. ➡️ Client: Owner dashboard pages (Add Equipment, My Equipment table) ← CURRENT (Part 1: API Layer Done)
7. Client: Admin dashboard pages (approve/reject equipment, manage users)
8. Client: Public pages (Home sections + All Equipment)
9. Details page + favorites
10. Booking modal + Stripe + payments + success page
11. Customer / Owner / Admin dashboards (tables)
12. Analytics → README → deploy → test