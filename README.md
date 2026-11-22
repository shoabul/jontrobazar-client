# JontroBazar Client

A modern, responsive equipment rental marketplace frontend built with Next.js 16 (App Router). Users can browse equipment, make bookings, process payments via Stripe, and manage their rentals through role-based dashboards.

## 🌐 Live Demo

**Client:** [https://jontrobazar-client.vercel.app](https://jontrobazar-client.vercel.app)  
**API Server:** [https://jontrobazar-server.vercel.app](https://jontrobazar-server.vercel.app)

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `hasan@gmail.com` | `Rajin@321` |
| **Owner** | `demo-owner@gmail.com` | `Rajin@321` |
| **Customer** | `john-doe@visitor.com` | `John@321` |

> Use these credentials to explore all features of the platform.

---

## ✨ Key Features

### Public Pages
- **Home Page** – Hero banner, featured equipment, categories, customer reviews, how it works
- **All Equipment** – Search, filter (category, rental type, price, availability), sort, paginated grid
- **Equipment Details** – Full specs, owner info, terms, add to favorites, book now modal
- **About / Contact / How It Works** – Static informational pages

### Authentication (BetterAuth)
- Email/password registration with validation
- Login with JWT tokens (HttpOnly cookies)
- Google OAuth (default role: customer)
- Protected routes by role (customer / owner / admin)

### Customer Dashboard
- **My Rentals** – Table view with booking details, payment/booking status
- **Favorites** – Saved equipment with view/remove actions
- **Profile** – Editable name, phone, address, photo

### Owner Dashboard
- **Add Equipment** – Full form with imgbb image upload, status = pending
- **My Equipment** – Table with edit/delete/view actions
- **My Rentals** – Customer bookings for owned equipment
- **Profile** – Editable profile
- **Analytics** – Total listed equipment, completed rentals, total earnings, monthly chart

### Admin Dashboard
- **All Users** – View all users, change roles
- **All Equipment** – Approve/reject/update/delete listings
- **All Rentals** – Monitor all platform bookings
- **Profile** – Editable profile
- **Analytics** – Total users, equipment, bookings, pending approvals, revenue, monthly charts

### Payment Flow
- Stripe Checkout integration
- Booking creation → Payment → Verification → Success page
- Webhook fallback for reliability

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | JavaScript (ES Modules) |
| **Styling** | Tailwind CSS 4, shadcn/ui compatible components |
| **Animation** | Framer Motion |
| **Auth** | BetterAuth (MongoDB adapter, JWT, Google OAuth) |
| **Charts** | Recharts |
| **Notifications** | SweetAlert2 |
| **Date Handling** | date-fns |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- MongoDB database (local or Atlas)
- Stripe account (for payments)
- Google Cloud Console project (for OAuth)
- imgbb API key (for image uploads)

### 1. Clone Repository
```bash
git clone https://github.com/your-username/jontrobazar-client.git
cd jontrobazar-client
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create `.env.local` in the root directory:

```env
# API
NEXT_PUBLIC_API_URL=https://jontrobazar-server.vercel.app/api

# BetterAuth
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=https://jontrobazar-client.vercel.app

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

> **Note:** For local development, use `http://localhost:3000` for URLs and `http://localhost:5000/api` for API.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/       # BetterAuth API routes
│   ├── components/              # Shared components (Nav, Footer, etc.)
│   ├── context/                 # React Context (Auth, Theme)
│   ├── dashboard/
│   │   ├── admin/               # Admin dashboard pages
│   │   ├── customer/            # Customer dashboard pages
│   │   └── owner/               # Owner dashboard pages
│   ├── equipment/
│   │   └── [id]/                # Equipment detail page
│   ├── payment/
│   │   ├── success/             # Payment success page
│   │   └── cancel/              # Payment cancel page
│   ├── lib/                     # Utilities (api, notify, auth-client)
│   ├── globals.css              # Global styles + Tailwind
│   ├── layout.jsx               # Root layout
│   └── page.jsx                 # Home page
├── public/                      # Static assets
└── middleware.js                # Auth middleware for protected routes
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 📋 Key npm Packages

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.4.6 | React framework (App Router) |
| `react` / `react-dom` | 19.3.0 | UI library |
| `better-auth` | 1.7.25 | Authentication |
| `tailwindcss` | 4.3.3 | Utility-first CSS |
| `framer-motion` | 14.14.0 | Animations |
| `recharts` | 3.11.0 | Charts for analytics |
| `sweetalert2` | 11.26.25 | Toast/alert notifications |
| `lucide-react` | 1.74.0 | Icon library |
| `date-fns` | 4.4.0 | Date formatting |
| `mongodb` | 7.9.0 | MongoDB driver (for auth) |

---

## 🚀 Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

**Required Vercel Environment Variables:**
- `NEXT_PUBLIC_API_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

---

## 📝 License

MIT License - feel free to use for learning or commercial projects.

---

## 👨‍💻 Author

**Rajin** - [GitHub](https://github.com/your-username)