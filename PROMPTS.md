# PROMPTS.md — Claude Code Prompts for UV Infra Website

## How to Use These Prompts

1. Install Claude Code: `npm install -g @anthropic-ai/claude-code`
2. Open terminal in your `uv-infra` project folder
3. Run: `claude` to start Claude Code
4. Paste each prompt below in order

---

## 🚀 PROMPT 1 — Project Scaffold

```
Create a Next.js 14 project with TypeScript and Tailwind CSS for a real estate 
company called "UV Infra" based in Hyderabad, India.

Requirements:
- App Router (not Pages Router)
- src/ directory structure
- Tailwind CSS configured with custom colors:
  - primary: #2563EB (blue-600)
  - dark: #1E3A8A (blue-800)
  - background: #EFF6FF (blue-50)
  - text: #0F172A
- Google Fonts: Playfair Display (headings) + Inter (body)
- Configure next.config.ts with:
  - Security headers (X-Frame-Options, CSP, HSTS, X-Content-Type-Options)
  - Image domains: res.cloudinary.com
  - TypeScript strict mode

Create the complete tsconfig.json, tailwind.config.ts, and next.config.ts files.
```

---

## 🎨 PROMPT 2 — Navbar Component

```
Create a responsive Navbar component for UV Infra real estate website.

File: src/components/layout/Navbar.tsx

Requirements:
- Fixed position at top, z-index 100
- White background with blur backdrop on scroll
- Logo: custom SVG house icon + "UV INFRA" in Montserrat font + "Builders & Developers" subtitle
- Navigation links: About, Projects, Floor Plans, Specifications, Gallery, Contact
- "Enquire Now" CTA button (blue, links to #contact)
- Mobile hamburger menu with smooth open/close animation
- Active link highlighting based on scroll position (Intersection Observer)
- TypeScript props interface
- Tailwind CSS only (no external UI library)
- Smooth scroll to sections on link click

Logo colors: icon background #2563EB, text #1E3A8A
```

---

## 🏠 PROMPT 3 — Hero Section

```
Create a Hero section component for UV Infra real estate website.

File: src/components/sections/Hero.tsx

Design:
- Full viewport height
- Light blue gradient background: from #EFF6FF via #DBEAFE to #EFF6FF
- Decorative dot grid pattern overlay (radial gradient dots, opacity 12%)
- Two soft radial glow circles (blue and lighter blue)
- Two-column grid layout (left: content, right: info panel)

Left column content:
- Pill badge: "Now Booking · Ameenpur, Hyderabad" with animated pulsing dot
- H1 heading (Playfair Display, 66px): "Build Your Dream Home With Confidence" 
  — "Dream Home" in italic #2563EB
- Description paragraph: "UV Infra delivers premium residential apartments across 
  Hyderabad — quality construction, thoughtful design, and transparent dealings 
  from foundation to key handover."
- Two buttons: "Explore Projects" (solid blue) + "Schedule a Visit" (ghost blue outline)
- Stats bar (white card, 4 columns):
  - 10+ Years Experience
  - 500+ Happy Families  
  - 15+ Projects Done
  - 5★ Customer Rating

Right column:
- White card with blue header (gradient #2563EB → #1E3A8A)
- Card header: "Sunshine Sapphire" title, "Ameenpur, Hyderabad" subtitle, "Available" green badge
- 6 spec rows: Configuration, Super Built-up Area, Facing Options, Road Width, Structure, Flooring
- Card footer: phone number + "Book Visit →" gold button

Add scroll-triggered fade-in animation using Intersection Observer.
TypeScript, Tailwind CSS.
```

---

## 📋 PROMPT 4 — Enquiry Form with Validation

```
Create a secure enquiry form component and API route for UV Infra.

Files to create:
1. src/components/ui/EnquiryForm.tsx
2. src/app/api/enquiry/route.ts
3. src/lib/validations.ts
4. src/lib/email.ts

Validation schema (Zod):
- name: string, min 2, max 100, letters only
- phone: Indian mobile number regex ^[6-9]\d{9}$
- email: optional valid email
- project: enum of project names or empty
- message: optional, max 1000 chars

API route features:
- Rate limiting: 5 requests per IP per 15 minutes
- Zod validation on all inputs
- Resend email notification to pavan@uv-infra.com
- Never expose internal errors to client
- Return proper HTTP status codes (200, 422, 429, 500)
- Block GET requests (method not allowed)

Form component features:
- React Hook Form + Zod resolver
- Real-time field validation with error messages
- Loading spinner during submission
- Success state with checkmark
- Phone field: auto-format Indian number
- All fields styled with light blue theme

Email template (HTML):
- UV Infra branded header (blue)
- Clean table layout with all form data
- "Received from uv-infra.com" footer
- Timestamp of submission

Use environment variable: process.env.RESEND_API_KEY
Notification email: process.env.NOTIFICATION_EMAIL
```

---

## 🏢 PROMPT 5 — Projects Section with Modal

```
Create a Projects section with clickable cards and modal detail view for UV Infra.

Files:
1. src/components/sections/Projects.tsx
2. src/components/ui/Modal.tsx
3. src/data/projects.ts

Project data (src/data/projects.ts):
Create a TypeScript interface Project with fields:
  id, slug, name, location, area, config, facing, status, 
  description, specs (array of key-value), badge, thumbnailColor

Projects array with 3 projects:
1. Sunshine Sapphire — Completed, Ameenpur, 1150 sft, 2BHK, East & West facing
2. UV's Pearl — Ongoing, Ameenpur, 2Gether Heights (Ekam & Dviyam Block)
3. New Launch 2025 — Upcoming, Hyderabad, TBA

Projects section:
- Section tag "Our Portfolio" in blue
- Heading "Flagship Projects" (Playfair Display)
- 3-column responsive grid
- Each card:
  - Gradient thumbnail (blue for completed, cyan for ongoing, slate for upcoming)
  - Status badge (green/blue/gold pill)
  - Location in blue uppercase
  - Project name (Playfair Display)
  - Description
  - Spec row with 3-4 data points
  - Hover: translateY(-6px) + larger shadow
  - Click: opens modal

Modal:
- Overlay with blue tint backdrop blur
- White card, max-width 620px
- Close button (×) top right
- Shows: status tag, project name (Playfair Display), floor plan image if available
- 2-column spec grid (light blue background chips)
- "Call to Enquire" button (blue) linking to tel:+917386086043
- Click outside to close
- ESC key to close
- Body scroll lock when open

TypeScript strict, no any types.
```

---

## 🗺️ PROMPT 6 — Floor Plan Viewer

```
Create an interactive Floor Plan viewer for Sunshine Sapphire project.

File: src/components/sections/FloorPlan.tsx

Data: 4 flats, each with:
- Flat 1 (East): Master Bed 13'0"×9'9", Child Bed 13'0"×9'0", 
  Family Living 14'6"×10'6", Dining 9'0"×16'0", Kitchen 10'6"×8'3",
  M.Toilet 4'0"×5'9", Att.Toilet 4'6"×7'0", Puja Room (Dedicated)
- Flat 2 (East): Master Bed 13'0"×9'3", Child Bed 13'0"×9'0",
  Family Living 14'6"×10'6", Dining 9'0"×16'0", Kitchen 10'6"×8'3",
  C.Toilet 7'0"×4'0", Att.Toilet 4'6"×6'6", Puja Room (Dedicated)
- Flat 3 (West): Master Bed 15'0"×9'3", Child Bed 13'0"×9'0",
  Family Living 15'0"×9'6", Dining 14'6"×9'6", Kitchen 11'6"×8'6",
  A.Toilet 6'0"×9'6", C.Toilet 5'6"×5'6", Balcony 3'9" Wide
- Flat 4 (West): Master Bed 13'0"×9'3", Child Bed 11'9"×10'3",
  Family Living 14'6"×9'6", Dining 12'0"×13'3", Kitchen 11'6"×8'6",
  A.Toilet 6'0"×9'6", C.Toilet 5'6"×5'6", Puja Room (Dedicated)

UI:
- Light blue/white container card (rounded-2xl, border)
- Tab bar at top: "Flat 1 — East Facing" etc., active tab has blue underline
- Two-column layout: left = info, right = floor plan image
- Left panel:
  - Flat title (Playfair Display)
  - Blue subtitle tag
  - Meta rows: Area, Facing, Bedrooms, Bathrooms, Balcony, Road Width
  - 2×4 room grid (light blue chips with room name + dimensions)
- Right panel:
  - Next.js Image component: /images/floor-plans/sunshine-sapphire.png
  - Rounded corners, border
- Tab switching: useState, smooth transition
- Mobile: stacks vertically (info then image)

All TypeScript, no any.
```

---

## 🖼️ PROMPT 7 — Gallery with Cloudinary

```
Create an image gallery section for UV Infra with Cloudinary integration.

Files:
1. src/components/sections/Gallery.tsx
2. src/lib/cloudinary.ts
3. src/app/api/gallery/route.ts (optional: fetch gallery from Cloudinary folder)

Gallery layout:
- CSS Grid mosaic: 3 cols, 2 rows
  - First item: spans 2 rows (tall)
  - Others: normal 1 row each
- Each item: rounded-xl, overflow hidden, border
- Hover: scale image 1.04 + blue overlay with 🔍 icon
- Placeholder state: gradient backgrounds with icons for each room type
  (construction, living room, bedroom, kitchen, balcony view)

Cloudinary config (src/lib/cloudinary.ts):
- Use next-cloudinary CldImage component
- Auto-format (WebP/AVIF), auto-quality
- Responsive srcset
- Blur placeholder while loading

Gallery data structure:
interface GalleryImage {
  id: string
  publicId: string  // Cloudinary public ID
  alt: string
  category: 'exterior' | 'living' | 'bedroom' | 'kitchen' | 'balcony'
}

Instructions for Pavan (displayed in component during placeholder state):
"Upload your project photos to Cloudinary under folder 'uv-infra/gallery/' 
and they will appear here automatically."

Add lightbox on click: full-screen image with prev/next navigation.
Use CSS transitions only (no animation library needed).
TypeScript strict.
```

---

## 🔍 PROMPT 8 — SEO & Metadata

```
Add comprehensive SEO metadata to the UV Infra Next.js website.

File: src/app/layout.tsx and src/app/page.tsx

Add Next.js Metadata API configuration:

Site metadata:
- title: "UV Infra – Premium Flats in Hyderabad | 2BHK Apartments Ameenpur"
- description: "UV Infra builds premium 2BHK apartments in Ameenpur, Hyderabad. 
  Sunshine Sapphire & UV's Pearl projects. Contact Pavan Kumar Inturi: 
  +91 73860 86043. RCC M25 grade, Vitrified flooring, UPVC windows."
- keywords: real estate hyderabad, 2bhk flats ameenpur, apartments hyderabad, 
  uv infra, sunshine sapphire hyderabad, uv pearl ameenpur
- canonical: https://uv-infra.com
- robots: index, follow

Open Graph (social preview):
- og:title, og:description, og:image (/og-image.jpg, 1200×630px)
- og:url, og:type: website, og:locale: en_IN

Twitter Card:
- twitter:card: summary_large_image
- twitter:title, twitter:description, twitter:image

Structured Data (JSON-LD for Google):
- Organization schema: UV Infra, telephone, address, url
- LocalBusiness schema: RealEstateAgent type
- Hyderabad geo coordinates

Also create src/app/sitemap.ts returning sitemap for:
- / (homepage)
- /projects
- /projects/sunshine-sapphire
- /projects/uvs-pearl
- /contact

And src/app/robots.ts:
- Allow all crawlers
- Sitemap URL: https://uv-infra.com/sitemap.xml
```

---

## ⚙️ PROMPT 9 — CI/CD GitHub Actions

```
Create GitHub Actions workflow for UV Infra website CI/CD pipeline.

File: .github/workflows/deploy.yml

Workflow triggers:
- Push to main branch → deploy to production
- Push to develop branch → deploy to preview
- Pull requests → run tests only

Jobs:
1. test:
   - Checkout code
   - Setup Node.js 20
   - npm ci (clean install)
   - npm run lint (ESLint)
   - npm run type-check (tsc --noEmit)
   - npm run build (check build passes)

2. deploy (depends on test, only on main):
   - Uses Vercel CLI
   - Deploys to production
   - Uses secrets: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID

3. lighthouse (after deploy):
   - Run Lighthouse CI on https://uv-infra.com
   - Assert: Performance > 90, Accessibility > 90, SEO > 95
   - Post results as PR comment

Required GitHub Secrets:
VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID

Add package.json scripts:
- "type-check": "tsc --noEmit"
- "lint": "next lint"
- "build": "next build"
- "dev": "next dev"
```

---

## 📱 PROMPT 10 — WhatsApp Integration

```
Add WhatsApp click-to-chat integration to UV Infra website.

Features:
1. WhatsApp floating button (bottom-right corner, always visible)
   - Green circular button with WhatsApp icon
   - Pulse animation to draw attention
   - Tooltip on hover: "Chat with us on WhatsApp"
   - Links to: https://wa.me/917386086043?text=Hi, I'm interested in UV Infra projects

2. WhatsApp CTA in Contact section
   - Green gradient card
   - "Chat with Pavan Kumar Inturi →"
   - Pre-filled message: "Hi, I'm interested in UV Infra apartments in Ameenpur."

3. Track WhatsApp clicks (Vercel Analytics event):
   track('whatsapp_click', { source: 'floating_button' | 'contact_section' })

File: src/components/ui/WhatsAppButton.tsx

Phone number from env: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = 917386086043
Pre-filled message should mention the website source.
Position: fixed, bottom-6, right-6, z-50
Mobile-friendly tap target: min 56px × 56px
TypeScript, Tailwind, no external dependencies.
```

---

## 🧪 PROMPT 11 — Testing Setup

```
Set up testing for UV Infra Next.js application.

Install and configure:
- Jest + @testing-library/react for unit/component tests
- Playwright for end-to-end tests

Unit tests to create:
1. src/__tests__/validations.test.ts
   - Test EnquirySchema with valid data
   - Test rejection of invalid phone numbers
   - Test XSS attempt in name field is rejected
   - Test message length limit

2. src/__tests__/api/enquiry.test.ts
   - Test POST with valid data returns 200
   - Test POST with invalid data returns 422
   - Test GET request returns 405
   - Test rate limiting returns 429

E2E tests (tests/e2e/homepage.spec.ts with Playwright):
- Page loads and displays UV Infra title
- Navigation links scroll to correct sections
- Enquiry form submits successfully
- Mobile menu opens and closes
- Floor plan tabs switch content correctly
- WhatsApp button is visible and clickable

Add to package.json:
- "test": "jest"
- "test:e2e": "playwright test"
- "test:coverage": "jest --coverage"
```

---

## 📊 PROMPT 12 — Analytics Dashboard (Optional Phase 2)

```
Create a simple admin page to view enquiry leads for UV Infra.

Route: /admin (password-protected via Next.js middleware)

Middleware (src/middleware.ts):
- Protect /admin/* routes
- Check for session cookie
- Redirect to /admin/login if not authenticated

Pages:
- /admin/login: Simple password form (password stored in env var ADMIN_PASSWORD)
- /admin: Dashboard showing leads table

Leads table columns:
- Date/Time, Name, Phone, Email, Project Interested, Message, Status

Data source: Vercel KV (Redis)
- Key pattern: enquiry:{timestamp}:{uuid}
- List all keys with prefix 'enquiry:'
- Return sorted by timestamp descending

Features:
- Mark lead as "Contacted" (updates status in KV)
- Export leads as CSV download
- Simple search by name or phone
- Pagination (20 per page)

No complex auth needed — single admin password is fine for Phase 1.
Use Vercel KV: npm install @vercel/kv
```
