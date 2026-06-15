# ENV_TEMPLATE.md — UV Infra Environment Variables

## What is an Environment Variable?

Environment variables are **secret configuration values** stored outside your code.
Think of them as a secure locker for passwords and API keys — never written into the code files, never uploaded to GitHub.

---

## .env.example (Safe to commit to GitHub)

Create this file in your project root — it shows what variables are needed WITHOUT real values:

```env
# ─── Site Configuration ───────────────────────────────
NEXT_PUBLIC_SITE_URL=https://uv-infra.com
NEXT_PUBLIC_SITE_NAME=UV Infra

# ─── Contact Information (Public - safe to expose) ────
NEXT_PUBLIC_PHONE_1=+917386086043
NEXT_PUBLIC_PHONE_2=+919505944456
NEXT_PUBLIC_WHATSAPP_NUMBER=917386086043
NEXT_PUBLIC_CONTACT_NAME=Pavan Kumar Inturi
NEXT_PUBLIC_ADDRESS=2Gether Heights, Ameenpur, Hyderabad 502032

# ─── Email Service (Resend) ───────────────────────────
# Get from: https://resend.com/api-keys
RESEND_API_KEY=re_REPLACE_WITH_YOUR_KEY

# Email where enquiries are sent
NOTIFICATION_EMAIL=your-email@gmail.com

# ─── Cloudinary (Image Hosting) ───────────────────────
# Get from: https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=REPLACE_WITH_CLOUD_NAME
CLOUDINARY_API_KEY=REPLACE_WITH_API_KEY
CLOUDINARY_API_SECRET=REPLACE_WITH_API_SECRET
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=REPLACE_WITH_CLOUD_NAME

# ─── Vercel KV (Lead Storage - Optional) ──────────────
# Auto-populated when you add KV store in Vercel dashboard
KV_URL=REPLACE_AFTER_VERCEL_KV_SETUP
KV_REST_API_URL=REPLACE_AFTER_VERCEL_KV_SETUP
KV_REST_API_TOKEN=REPLACE_AFTER_VERCEL_KV_SETUP
KV_REST_API_READ_ONLY_TOKEN=REPLACE_AFTER_VERCEL_KV_SETUP

# ─── Admin Panel (Optional Phase 2) ───────────────────
# Choose a strong password (min 16 chars)
ADMIN_PASSWORD=REPLACE_WITH_STRONG_PASSWORD
ADMIN_SESSION_SECRET=REPLACE_WITH_RANDOM_32_CHAR_STRING
```

---

## .env.local (NEVER commit — real values)

This is your actual file with real secrets. It lives only on your computer and on Vercel:

```env
# ─── Site Configuration ───────────────────────────────
NEXT_PUBLIC_SITE_URL=https://uv-infra.com
NEXT_PUBLIC_SITE_NAME=UV Infra

# ─── Contact Information ──────────────────────────────
NEXT_PUBLIC_PHONE_1=+917386086043
NEXT_PUBLIC_PHONE_2=+919505944456
NEXT_PUBLIC_WHATSAPP_NUMBER=917386086043
NEXT_PUBLIC_CONTACT_NAME=Pavan Kumar Inturi
NEXT_PUBLIC_ADDRESS=2Gether Heights, Ameenpur, Hyderabad 502032

# ─── Resend Email ─────────────────────────────────────
RESEND_API_KEY=re_abc123def456...    ← your real key from resend.com
NOTIFICATION_EMAIL=pavankumar@gmail.com

# ─── Cloudinary ───────────────────────────────────────
CLOUDINARY_CLOUD_NAME=uvinfra
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=uvinfra

# ─── Admin ────────────────────────────────────────────
ADMIN_PASSWORD=UVInfra@Secure2025!
ADMIN_SESSION_SECRET=a8f3k9x2m5p1n7q4r6t0w8y3z5b1c9d2
```

---

## How to Get Each Key

### Resend API Key
1. Go to https://resend.com → Sign up free
2. Dashboard → API Keys → Create API Key
3. Name: "UV Infra Production"
4. Copy the key starting with `re_`

### Cloudinary Credentials
1. Go to https://cloudinary.com → Sign up free
2. Dashboard → shows Cloud Name, API Key, API Secret
3. Copy all three values

### Vercel KV
1. Vercel Dashboard → Your Project → Storage tab
2. Create KV Database → Select Free plan
3. Environment Variables auto-populated by Vercel

### Admin Password
Generate a strong password: use at least:
- 16+ characters
- Uppercase + lowercase letters
- Numbers + special characters
Example: `UVInfra@Hyd2025!`

### Session Secret
Generate a random 32-character string:
```bash
# Run this in terminal to generate:
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

---

## Variable Naming Rules

| Prefix | Visible to | Use for |
|--------|-----------|---------|
| `NEXT_PUBLIC_` | Browser + Server | Non-secret public info (phone, name) |
| (no prefix) | Server only | Secrets (API keys, passwords) |

⚠️ **Critical:** NEVER put API keys or passwords in `NEXT_PUBLIC_` variables — they will be exposed to all website visitors!

---

## Vercel Environment Setup

In Vercel Dashboard → Settings → Environment Variables:

| Variable | Environment | Notes |
|----------|------------|-------|
| All variables | Production | Main site |
| All variables | Preview | Test deployments |
| All variables | Development | Local via `vercel env pull` |

To pull env variables from Vercel to local:
```bash
npx vercel env pull .env.local
```
