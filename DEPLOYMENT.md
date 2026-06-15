# DEPLOYMENT.md — UV Infra · Vercel + Namecheap + GitHub

## Overview

```
Your Code (VS Code)
     │
     ▼  git push
GitHub Repository (private)
     │
     ▼  auto-deploy
Vercel (hosting + CDN + SSL)
     │
     ▼  DNS
uv-infra.com (Namecheap domain)
```

---

## PHASE 1 — Local Setup

### Step 1: Install Prerequisites

```bash
# Install Node.js 20 LTS from https://nodejs.org
node --version   # should show v20.x.x
npm --version    # should show 10.x.x

# Install Git from https://git-scm.com
git --version    # should show git version 2.x.x
```

### Step 2: Create the Next.js Project

```bash
npx create-next-app@latest uv-infra \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd uv-infra
```

### Step 3: Install Required Packages

```bash
# Core dependencies
npm install resend zod react-hook-form @hookform/resolvers

# UI utilities
npm install lucide-react clsx tailwind-merge

# Analytics
npm install @vercel/analytics @vercel/speed-insights

# Image handling
npm install cloudinary next-cloudinary
```

### Step 4: Copy Website Files

Place the following into your project (convert from index.html):

```bash
# Convert each section of index.html into components:
src/components/sections/Hero.tsx        ← Hero section
src/components/sections/About.tsx       ← About section
src/components/sections/Projects.tsx    ← Projects section
src/components/sections/FloorPlan.tsx   ← Floor plan
src/components/sections/Specifications.tsx
src/components/sections/Gallery.tsx
src/components/sections/WhyUs.tsx
src/components/sections/Contact.tsx
src/components/layout/Navbar.tsx
src/components/layout/Footer.tsx
src/app/page.tsx                        ← assembles all sections
```

### Step 5: Create Environment File

```bash
# Create .env.local in project root
touch .env.local
```

Add these values (get from respective service dashboards):

```env
RESEND_API_KEY=re_your_key_here
NOTIFICATION_EMAIL=pavanкumar@uv-infra.com
NEXT_PUBLIC_SITE_URL=https://uv-infra.com
NEXT_PUBLIC_WHATSAPP_NUMBER=917386086043
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Step 6: Test Locally

```bash
npm run dev
# Open http://localhost:3000
# Test the form, navigation, all sections
```

---

## PHASE 2 — GitHub Setup

### Step 1: Create GitHub Account

1. Go to https://github.com → Sign up (free)
2. Create new repository: `uv-infra-website`
3. Set to **Private** (protects your code)

### Step 2: Push Code to GitHub

```bash
# Inside your uv-infra folder:
git init
git add .
git commit -m "Initial UV Infra website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/uv-infra-website.git
git push -u origin main
```

---

## PHASE 3 — Vercel Deployment

### Step 1: Create Vercel Account

1. Go to https://vercel.com → Sign up with GitHub (free)
2. Click **"Add New Project"**
3. Import your `uv-infra-website` repository
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy** → Wait ~2 minutes

Your site is now live at: `https://uv-infra-website.vercel.app`

### Step 2: Add Environment Variables in Vercel

1. Go to your project in Vercel Dashboard
2. Settings → **Environment Variables**
3. Add each variable from your `.env.local`:

```
RESEND_API_KEY          → re_your_key_here
NOTIFICATION_EMAIL      → your email
NEXT_PUBLIC_SITE_URL    → https://uv-infra.com
CLOUDINARY_CLOUD_NAME   → your_cloud_name
CLOUDINARY_API_KEY      → your_api_key
CLOUDINARY_API_SECRET   → your_api_secret
```

4. Select: **Production + Preview + Development**
5. Click **Save**
6. Go to **Deployments** → Redeploy latest

---

## PHASE 4 — Connect uv-infra.com Domain (Namecheap)

### Step 1: Add Domain in Vercel

1. Vercel Dashboard → Your Project → **Settings → Domains**
2. Type: `uv-infra.com` → Click **Add**
3. Also add: `www.uv-infra.com` → Add
4. Vercel shows you DNS records to add

### Step 2: Update DNS in Namecheap

1. Log into **namecheap.com**
2. Domain List → `uv-infra.com` → **Manage**
3. Click **Advanced DNS** tab
4. Delete all existing A/CNAME records
5. Add these new records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | @ | 76.76.21.21 | Automatic |
| CNAME | www | cname.vercel-dns.com | Automatic |

6. Click the ✓ checkmark to save each record

### Step 3: Verify (takes 5–30 minutes)

```bash
# Check DNS propagation:
nslookup uv-infra.com
# Should return: 76.76.21.21

# Or visit: https://dnschecker.org
# Type: uv-infra.com
```

7. Back in Vercel → Domains → Should show ✅ green checkmarks
8. SSL certificate auto-issued (Let's Encrypt) — takes 2–5 min

---

## PHASE 5 — Set Up Email Notifications (Resend)

### Step 1: Create Resend Account

1. Go to https://resend.com → Sign up free
2. Free tier: 3,000 emails/month — plenty for leads

### Step 2: Add Your Domain

1. Resend Dashboard → **Domains** → Add Domain
2. Enter: `uv-infra.com`
3. Add the DNS records Resend gives you to Namecheap Advanced DNS:

| Type | Host | Value |
|------|------|-------|
| TXT | @ | v=spf1 include:resend.com ~all |
| TXT | resend._domainkey | (Resend provides this value) |

4. Click Verify in Resend

### Step 3: Get API Key

1. Resend → **API Keys** → Create API Key
2. Name: `UV Infra Production`
3. Copy the key → paste into Vercel Environment Variables as `RESEND_API_KEY`

### Step 4: Email Template (src/lib/email.ts)

```typescript
import { Resend } from 'resend'
import type { EnquiryInput } from '@/types/enquiry'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEnquiryEmail(data: EnquiryInput) {
  await resend.emails.send({
    from: 'UV Infra Website <noreply@uv-infra.com>',
    to: process.env.NOTIFICATION_EMAIL!,
    subject: `New Enquiry: ${data.name} — ${data.project || 'General'}`,
    html: `
      <h2 style="color:#1E3A8A">New Enquiry — UV Infra Website</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${data.name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${data.phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${data.email || 'Not provided'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Project</td><td style="padding:8px;border:1px solid #ddd">${data.project || 'Not specified'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${data.message || 'None'}</td></tr>
      </table>
      <p style="color:#64748B;margin-top:16px">Received from uv-infra.com</p>
    `,
  })
}
```

---

## PHASE 6 — Ongoing Deployment Workflow

After initial setup, every code update is automatic:

```bash
# Make changes to your code
# Then:
git add .
git commit -m "Updated project details / added new photos"
git push

# → Vercel automatically detects the push
# → Builds and deploys in ~1 minute
# → Live on uv-infra.com immediately
```

---

## 📊 Vercel Free Plan Limits

| Resource | Free Limit | UV Infra Usage |
|----------|-----------|----------------|
| Bandwidth | 100 GB/month | ~1–2 GB |
| Deployments | Unlimited | As needed |
| Serverless functions | 100,000/month | ~500/month |
| Custom domains | 50 | 1–2 |
| SSL certificates | Included | ✅ |
| Analytics | 2,500 events/day | ✅ |

**Verdict: Free plan is more than enough for UV Infra.**

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| DNS not resolving | Wait 24hrs max; check Namecheap records |
| SSL not showing | Wait 10 min after DNS, check Vercel domains tab |
| Form not sending email | Check RESEND_API_KEY in Vercel env vars |
| Build fails | Run `npm run build` locally first, fix errors |
| Images not loading | Check Cloudinary config; add domain to next.config.ts |
