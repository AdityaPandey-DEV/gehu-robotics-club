# GEHU RoboTech Club Website

> Official Robotics Club website for **Graphic Era Hill University (GEHU), Bhimtal Campus** — Electronics & Communication Engineering.

Built with **Next.js 15**, **Supabase**, **Razorpay**, and **Tailwind CSS**.

## Features

- 🤖 **Landing Page** with real GEHU Bhimtal campus imagery
- 👥 **3-Tier RBAC** — Faculty Advisor → President/Management → Member
- 📋 **Event Registration Forms** (Google Form-style) with Razorpay payments
- 🏆 **Certificate Generation & Verification** by roll number
- 📸 **Media Upload** — photos/videos via admin panel
- 🏫 **Multi-Campus Ready** — Bhimtal, Dehradun, Haldwani
- 📊 **Admin Dashboard** with stats, member management, event CRUD
- 🔐 **Supabase Auth** with email/password and role-based access
- 💳 **Razorpay Integration** for paid event registrations

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (cookie-based SSR) |
| Payments | Razorpay |
| File Storage | Supabase Storage |
| Animations | Framer Motion |
| Icons | Lucide React |
| Deployment | Vercel |

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/gehu-robotics-club.git
cd gehu-robotics-club
npm install
```

### 2. Set up environment variables
```bash
cp .env.local.example .env.local
```
Fill in your keys (see **Getting API Keys** section below).

### 3. Set up Supabase database
Run the SQL from `supabase/schema.sql` in your Supabase SQL Editor.

### 4. Start development server
```bash
npm run dev
```
Open http://localhost:3000

## Getting API Keys (All Free)

### Supabase (Free Tier)
1. Go to https://supabase.com → Sign up free
2. Click "New Project" → Name it, set a password, choose a region
3. After creation, go to **Settings → API**
4. Copy:
   - `NEXT_PUBLIC_SUPABASE_URL` = Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY` = service_role key
5. Go to **SQL Editor** and run the contents of `supabase/schema.sql`

### Razorpay (Free Test Mode)
1. Go to https://dashboard.razorpay.com → Sign up free
2. Dashboard opens in **Test Mode** by default
3. Go to **Settings → API Keys → Generate Test Key**
4. Copy:
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` = Key ID (starts with `rzp_test_`)
   - `RAZORPAY_KEY_SECRET` = Key Secret

> Note: Test mode is free and allows unlimited test transactions. Switch to Live mode for real payments after KYC.

## Deployment to Vercel

1. Push to GitHub
2. Go to https://vercel.com → Import your repo
3. Set environment variables in Vercel dashboard
4. Deploy!

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (public pages)      # Home, Events, Gallery, About, Verify
│   ├── login/ & signup/    # Auth pages
│   ├── dashboard/          # Role-based admin panel
│   ├── form/[eventId]/     # Event registration + Razorpay
│   └── api/                # Razorpay API routes
├── components/             # Reusable UI components
├── lib/                    # Supabase clients, utilities, constants
└── types/                  # TypeScript type definitions
```

## License

MIT — Built for GEHU Bhimtal ECE Department.
