# UV Infra — Cloud Deployment Guide
### Professional Real Estate Website · Full Stack · Secure · Production-Ready

---

## 📁 Document Index

| File | Purpose |
|------|---------|
| `README.md` | This file — project overview & quick start |
| `ARCHITECTURE.md` | Tech stack, folder structure, system design |
| `SECURITY.md` | Security best practices, language recommendation |
| `DEPLOYMENT.md` | Step-by-step Vercel + Namecheap deployment |
| `PROMPTS.md` | AI prompts to build each feature with Claude Code |
| `ENV_TEMPLATE.md` | All environment variables needed |
| `CI_CD.md` | GitHub Actions pipeline setup |

---

## 🏗️ What We Are Building

A **production-grade real estate marketing website** for UV Infra with:

- ✅ Static + dynamic pages (Next.js 14 App Router)
- ✅ Lead capture form with email notifications
- ✅ Project gallery with image upload (Cloudinary)
- ✅ Floor plan viewer
- ✅ SEO optimised for Hyderabad real estate searches
- ✅ WhatsApp enquiry integration
- ✅ Admin dashboard to manage leads (optional Phase 2)
- ✅ Hosted on Vercel · Domain: uv-infra.com (Namecheap)

---

## ⚡ Quick Start (5 minutes)

```bash
# 1. Install Node.js 20+ from nodejs.org, then:
npx create-next-app@latest uv-infra --typescript --tailwind --eslint --app --src-dir
cd uv-infra

# 2. Install dependencies
npm install resend @vercel/analytics cloudinary react-hook-form zod
npm install @hookform/resolvers lucide-react clsx tailwind-merge

# 3. Copy your index.html content into the Next.js structure (see ARCHITECTURE.md)

# 4. Set up environment variables (see ENV_TEMPLATE.md)
cp .env.example .env.local

# 5. Run locally
npm run dev
# Open http://localhost:3000
```

---

## 🌐 Live URLs

| Environment | URL |
|-------------|-----|
| Production  | https://uv-infra.com |
| Preview     | https://uv-infra.vercel.app |
| Local Dev   | http://localhost:3000 |

---

## 👤 Owner / Contact

**Pavan Kumar Inturi** — Promoter & Developer, UV Infra  
📞 +91 73860 86043 · +91 95059 44456  
📍 2Gether Heights, Ameenpur, Hyderabad – 502032

---

> **Note:** Keep all `.env.local` files private. Never commit secrets to Git. See `SECURITY.md` for full guidelines.
