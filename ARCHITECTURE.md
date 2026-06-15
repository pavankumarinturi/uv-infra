# ARCHITECTURE.md — UV Infra Website

## 🏆 Recommended Tech Stack

### Why TypeScript + Next.js?

> **TypeScript** is the most secure, maintainable, and industry-standard language for modern web applications. It catches bugs at compile time (before they reach users), enforces strict data types, and is used by Google, Microsoft, Netflix, and all top real estate portals.

| Layer | Technology | Why |
|-------|-----------|-----|
| **Language** | TypeScript 5.x | Type-safe, secure, industry standard |
| **Framework** | Next.js 14 (App Router) | SSR + SSG + API routes in one package |
| **Styling** | Tailwind CSS 3.x | Utility-first, responsive, fast |
| **Forms** | React Hook Form + Zod | Type-safe form validation |
| **Email** | Resend (resend.com) | Reliable transactional email, free tier |
| **Images** | Cloudinary | CDN image hosting, optimisation, free tier |
| **Database** | Vercel KV (Redis) or Supabase | Lead storage, lightweight |
| **Hosting** | Vercel | Free tier, auto-deploy from GitHub |
| **Domain** | Namecheap → uv-infra.com | Already purchased |
| **Analytics** | Vercel Analytics | Free, GDPR-friendly |
| **Security** | Next.js middleware + CSP headers | Built-in protection |

---

## 📁 Folder Structure

```
uv-infra/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (navbar, footer, meta)
│   │   ├── page.tsx                  # Homepage (/)
│   │   ├── projects/
│   │   │   ├── page.tsx              # /projects — all projects
│   │   │   └── [slug]/page.tsx       # /projects/sunshine-sapphire
│   │   ├── contact/
│   │   │   └── page.tsx              # /contact page
│   │   └── api/
│   │       ├── enquiry/route.ts      # POST /api/enquiry — form handler
│   │       └── health/route.ts       # GET /api/health — uptime check
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── FloorPlan.tsx
│   │   │   ├── Specifications.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── WhyUs.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── Card.tsx
│   │       ├── Modal.tsx
│   │       └── EnquiryForm.tsx
│   │
│   ├── lib/
│   │   ├── email.ts                  # Resend email helper
│   │   ├── cloudinary.ts             # Image upload helper
│   │   ├── validations.ts            # Zod schemas
│   │   └── constants.ts              # Site-wide constants (phone, address)
│   │
│   ├── types/
│   │   ├── project.ts                # Project type definitions
│   │   └── enquiry.ts                # Enquiry form types
│   │
│   └── data/
│       ├── projects.ts               # Project data (static)
│       └── specifications.ts         # Specs data (static)
│
├── public/
│   ├── images/
│   │   ├── floor-plans/
│   │   │   └── sunshine-sapphire.png
│   │   ├── projects/
│   │   └── gallery/
│   ├── favicon.ico
│   └── og-image.jpg                  # Open Graph social preview
│
├── .env.local                        # Local secrets (never commit)
├── .env.example                      # Template (safe to commit)
├── next.config.ts                    # Next.js config + security headers
├── tailwind.config.ts
├── tsconfig.json
├── .eslintrc.json
├── .gitignore
└── package.json
```

---

## 🔄 Data Flow

```
User visits uv-infra.com
        │
        ▼
   Vercel CDN (Global Edge Network)
        │
        ▼
   Next.js App Router (SSG pages — ultra fast)
        │
   ┌────┴────────────────────────────────┐
   │                                     │
   ▼                                     ▼
Static Pages                     Dynamic API Routes
(Hero, Projects,                 /api/enquiry  →  Resend Email
 Specs, Gallery)                              →  Vercel KV (store lead)
                                              →  WhatsApp notification
```

---

## 📊 Page Strategy

| Page | Rendering | Reason |
|------|-----------|--------|
| `/` (Home) | SSG (Static) | Fast load, SEO |
| `/projects` | SSG | Static project data |
| `/projects/[slug]` | SSG + ISR | Individual project pages |
| `/contact` | SSG | Static form, API for submit |
| `/api/enquiry` | Server (API Route) | Secure form processing |

**ISR = Incremental Static Regeneration** — pages rebuild every 60 seconds automatically on Vercel, no server management needed.

---

## 🗄️ Database Options

### Option A — Vercel KV (Recommended for start)
- Free up to 30,000 requests/month
- Redis-based key-value store
- Built into Vercel dashboard
- Perfect for storing leads

### Option B — Supabase (Recommended for growth)
- Free PostgreSQL database
- Real-time subscriptions
- Built-in auth for admin panel
- REST + GraphQL API
- 500MB free storage

### Option C — No Database (Simplest)
- Form submissions go directly to email via Resend
- No database needed at all
- Perfect for Phase 1 (just a marketing site)

---

## 🖼️ Image Strategy

All project images, gallery photos, and floor plans → **Cloudinary**

```
Your local image → Upload to Cloudinary → Get CDN URL
                                          → Use in Next.js Image component
                                          → Auto-optimised (WebP, AVIF)
                                          → Served from 200+ global CDN nodes
```

Free tier: 25GB storage, 25GB bandwidth/month — more than enough.
