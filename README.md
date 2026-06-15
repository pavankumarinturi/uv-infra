# UV Infra - Premium Residential Properties Website

A modern, responsive Next.js 16 website for UV Infra, showcasing premium residential properties in Hyderabad. The site includes interactive features, form handling, analytics, and comprehensive testing setup.

## 🚀 Features

### ✅ Implemented Features (PROMPT 1-12)

1. **Project Scaffold (PROMPT 1)**
   - Next.js 14+ with TypeScript
   - Tailwind CSS for styling
   - Custom configuration and theming

2. **Navbar Component (PROMPT 2)**
   - Responsive navigation with smooth scrolling
   - Active link tracking
   - Mobile-friendly menu

3. **Hero Section (PROMPT 3)**
   - Gradient background with decorative elements
   - Info panel with key highlights
   - Call-to-action buttons

4. **Enquiry Form with Validation (PROMPT 4)**
   - Client-side validation
   - Form fields: Name, Email, Phone, Project, Message
   - API endpoint for form submission
   - Success/error feedback

5. **Projects Section with Modal (PROMPT 5)**
   - Project cards with details
   - Interactive modal for detailed project information
   - Project amenities listing
   - Schedule visit buttons

6. **Floor Plan Viewer (PROMPT 6)**
   - Multiple floor plans (2BHK, 3BHK, 4BHK)
   - Interactive tab navigation
   - Detailed specifications
   - 3D model placeholder

7. **Gallery with Cloudinary (PROMPT 7)**
   - Category-based filtering
   - Image lightbox viewer
   - Image navigation
   - Responsive grid layout

8. **SEO & Metadata (PROMPT 8)**
   - Comprehensive meta tags
   - Open Graph tags for social sharing
   - Twitter Card support
   - Structured data (JSON-LD)
   - Organization and FAQ schemas
   - Sitemap and robots.txt configuration

9. **CI/CD GitHub Actions (PROMPT 9)**
   - Build and deploy workflow
   - Linting and type checking
   - Automated testing
   - Code quality checks
   - Vercel deployment integration

10. **WhatsApp Integration (PROMPT 10)**
    - Fixed WhatsApp button
    - Pre-filled message template
    - Chat widget with business hours
    - Direct phone call option

11. **Testing Setup (PROMPT 11)**
    - Jest configuration for unit tests
    - React Testing Library setup
    - Playwright E2E testing setup
    - Sample test files
    - Test scripts in package.json

12. **Analytics Dashboard (PROMPT 12)**
    - Google Analytics integration
    - Custom event tracking
    - Analytics dashboard page
    - Mock data for demonstration
    - Key metrics visualization

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd uv-infra
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file from `.env.example`:
```bash
cp .env.example .env.local
```

4. Update environment variables in `.env.local` with your configuration

## 🚀 Getting Started

### Development Server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Production Build

Build for production:

```bash
npm run build
npm start
```

## 📦 Scripts

```bash
# Development
npm run dev              # Start dev server

# Building
npm run build           # Build for production
npm start               # Start production server

# Linting & Type Checking
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript check

# Testing
npm test                # Run Jest tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report
npm run test:e2e        # Run Playwright E2E tests
npm run test:e2e:ui     # Run Playwright with UI
npm run test:e2e:debug  # Run Playwright in debug mode
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── enquiry/
│   │       └── route.ts          # Enquiry form API endpoint
│   ├── analytics/
│   │   └── page.tsx              # Analytics dashboard
│   ├── layout.tsx                # Root layout with SEO
│   ├── globals.css               # Global styles
│   └── page.tsx                  # Home page
├── components/
│   ├── layout/
│   │   └── Navbar.tsx            # Navigation component
│   ├── sections/
│   │   ├── Hero.tsx              # Hero section
│   │   ├── Projects.tsx          # Projects section with modal
│   │   ├── FloorPlanViewer.tsx   # Floor plans
│   │   ├── Gallery.tsx           # Gallery with filters
│   │   └── EnquiryForm.tsx       # Enquiry form
│   ├── ui/
│   │   └── Modal.tsx             # Reusable modal component
│   ├── seo/
│   │   └── StructuredData.tsx    # JSON-LD schemas
│   ├── Analytics.tsx             # Analytics tracker
│   └── WhatsAppButton.tsx        # WhatsApp integration
├── lib/
│   └── analytics.ts              # Analytics utility
├── __tests__/
│   ├── unit/
│   │   └── components/
│   │       └── EnquiryForm.test.tsx
│   └── e2e/
│       └── homepage.e2e.ts
├── public/                       # Static assets
└── styles/                       # Tailwind configuration
```

## 🔧 Configuration

### Environment Variables

See `.env.example` for all available configuration options.

Key variables:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary integration
- `NEXT_PUBLIC_WHATSAPP_NUMBER` - WhatsApp contact number
- `RESEND_API_KEY` - Email sending service
- `DATABASE_URL` - Database connection

### Tailwind CSS

Custom color scheme configured in `tailwind.config.js`:
- `primary` - Main brand color
- `dark` - Dark background color
- `background` - Light background color

## 🧪 Testing

### Unit Tests

```bash
npm test
npm run test:watch
npm run test:coverage
```

### E2E Tests

```bash
npm run test:e2e
npm run test:e2e:ui
```

## 📊 Analytics

The site includes Google Analytics integration:

1. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local`
2. View analytics dashboard at `/analytics`
3. Custom events are tracked automatically:
   - Page views
   - Button clicks
   - Form submissions
   - WhatsApp interactions
   - Project views

## 🚀 Deployment

### Vercel (Recommended)

The project is optimized for Vercel deployment:

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Manual Deployment

```bash
npm run build
npm start
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly buttons and inputs
- Optimized images for different screen sizes

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Form validation messages

## 🔒 Security

- Content Security Policy headers
- HTTPS enabled
- Environment variables for sensitive data
- Input validation on forms
- CORS configuration

## 📧 Contact & Support

**Phone:** +91 73860 86043  
**Email:** pavan@uv-infra.com

## 📄 License

This project is proprietary and owned by UV Infra.

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Playwright Testing](https://playwright.dev)
- [Jest Testing](https://jestjs.io)

## 🤝 Contributing

For internal team members, please follow the coding standards and testing requirements before submitting pull requests.

---

**Last Updated:** June 2026  
**Version:** 1.0.0
