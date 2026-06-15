# SECURITY.md — UV Infra Website Security Guide

## 🏆 Recommended Language: TypeScript

### Why TypeScript is the Most Secure Choice for This Application

```
TypeScript = JavaScript + Static Type Checking + Compile-Time Safety
```

| Security Benefit | How TypeScript Helps |
|-----------------|---------------------|
| **Type Safety** | Catches data injection bugs before they run |
| **Strict null checks** | Prevents null/undefined crashes attackers exploit |
| **Interface enforcement** | API inputs/outputs are validated at code level |
| **IDE warnings** | Security issues flagged during development, not production |
| **Zod integration** | Runtime schema validation on all form/API inputs |
| **Industry standard** | Used by Google, Microsoft, Vercel, GitHub |

### Language Comparison for This Use Case

| Language | Security | Learning Curve | Hosting Cost | Verdict |
|----------|----------|---------------|--------------|---------|
| **TypeScript (Next.js)** | ⭐⭐⭐⭐⭐ | Medium | Free (Vercel) | ✅ **Recommended** |
| Python (Django/FastAPI) | ⭐⭐⭐⭐ | Easy | Paid server needed | Good but costs more |
| Java (Spring Boot) | ⭐⭐⭐⭐⭐ | Hard | Paid server needed | Overkill for this |
| PHP (Laravel) | ⭐⭐⭐ | Easy | Cheap hosting | Older ecosystem |
| Go (Gin) | ⭐⭐⭐⭐⭐ | Hard | Paid server | Overkill |
| Plain HTML/JS | ⭐⭐ | Easy | Free | No backend security |

---

## 🔒 Security Implementation Checklist

### 1. HTTP Security Headers (next.config.ts)

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking
          { key: 'X-Frame-Options', value: 'DENY' },
          // Prevent MIME sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Force HTTPS
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // XSS protection
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // Referrer policy
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Permissions policy (disable camera/mic unless needed)
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https://res.cloudinary.com",
              "connect-src 'self' https://api.resend.com",
            ].join('; ')
          },
        ],
      },
    ]
  },
}

export default nextConfig
```

---

### 2. Input Validation with Zod (lib/validations.ts)

```typescript
// src/lib/validations.ts
import { z } from 'zod'

export const EnquirySchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters'),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),

  email: z
    .string()
    .email('Enter a valid email address')
    .optional()
    .or(z.literal('')),

  project: z
    .enum(['Sunshine Sapphire', "UV's Pearl", 'Upcoming Projects', ''])
    .optional(),

  message: z
    .string()
    .max(1000, 'Message too long')
    .optional(),
})

export type EnquiryInput = z.infer<typeof EnquirySchema>
```

---

### 3. Secure API Route (app/api/enquiry/route.ts)

```typescript
// src/app/api/enquiry/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { EnquirySchema } from '@/lib/validations'
import { sendEnquiryEmail } from '@/lib/email'

// Rate limiting store (use Vercel KV in production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5            // max 5 form submissions per 15 min per IP

  const record = rateLimitMap.get(ip)
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (record.count >= maxRequests) return false
  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // 2. Parse body safely
    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    // 3. Validate with Zod (rejects malicious input)
    const parsed = EnquirySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 422 }
      )
    }

    // 4. Send email notification
    await sendEnquiryEmail(parsed.data)

    // 5. Return success (never expose internal details)
    return NextResponse.json({ success: true }, { status: 200 })

  } catch (error) {
    // Never expose error details to client
    console.error('[Enquiry API Error]', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please call us directly.' },
      { status: 500 }
    )
  }
}

// Block non-POST methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
```

---

### 4. Environment Variables — Never Hardcode Secrets

```bash
# .env.local (NEVER commit this file to Git)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NOTIFICATION_EMAIL=pavan@uv-infra.com
NEXT_PUBLIC_SITE_URL=https://uv-infra.com
```

---

### 5. .gitignore — Protect Secrets

```gitignore
# .gitignore
.env
.env.local
.env.*.local
.env.production

# Dependencies
node_modules/

# Build output
.next/
out/

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# IDE
.vscode/
.idea/
```

---

## 🛡️ Security Rules Summary

| Rule | Action |
|------|--------|
| Never commit `.env` files | Add to `.gitignore` |
| Validate ALL form inputs | Use Zod schemas on API routes |
| Rate limit form submissions | Max 5 per IP per 15 min |
| Use HTTPS only | Enforced via HSTS header + Vercel |
| Sanitise all user input | Zod strips unknown fields |
| No SQL injection risk | No raw SQL; use ORM or KV |
| XSS protection | CSP headers + React auto-escaping |
| CSRF protection | Next.js built-in for API routes |
| Keep dependencies updated | Run `npm audit` weekly |
| Monitor for breaches | Enable Vercel alerts |

---

## 🔐 Vercel Security Features (Free)

- ✅ Automatic HTTPS/SSL certificates (Let's Encrypt)
- ✅ DDoS protection via Cloudflare
- ✅ Global CDN with edge caching
- ✅ Environment variable encryption at rest
- ✅ Deployment previews are password-protected
- ✅ Bot protection (upgrade to Pro for advanced)
