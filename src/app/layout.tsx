import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Chatbot from "@/components/Chatbot";
import Analytics from "@/components/Analytics";
import StructuredData from "@/components/seo/StructuredData";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "UV Infra – Premium Residential Projects in Hyderabad",
  description: "Discover premium 2BHK, 3BHK apartments and 4BHK villas by UV Infra in Hyderabad. Modern architecture, luxury amenities, and thoughtfully designed floor plans. Contact +91 73860 86043",
  keywords: ["premium apartments", "residential projects", "flats in hyderabad", "2bhk", "3bhk", "villas"],
  authors: [{ name: "UV Infra" }],
  creator: "UV Infra",
  publisher: "UV Infra",
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://uv-infra.com",
    siteName: "UV Infra - Premium Residential Projects",
    title: "UV Infra – Premium Residential Projects in Hyderabad",
    description: "Discover premium residential properties with luxury amenities and modern design",
    images: [
      {
        url: "https://uv-infra.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "UV Infra - Premium Residential Projects",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UV Infra – Premium Residential Projects in Hyderabad",
    description: "Discover premium 2BHK, 3BHK apartments and 4BHK villas by UV Infra",
    creator: "@uvinfra",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "UV Infra",
  },
  applicationName: "UV Infra",
  referrer: "origin-when-cross-origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* SEO Structured Data */}
        <StructuredData />

        {/* Google Site Verification */}
        {/* <meta name="google-site-verification" content="your-verification-code" /> */}

        {/* Sitemap & Robots */}
        <link rel="sitemap" href="/sitemap.xml" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://uv-infra.com" />

        {/* Alternate Language */}
        <link rel="alternate" hrefLang="en-IN" href="https://uv-infra.com" />
        <link rel="alternate" hrefLang="hi" href="https://uv-infra.com/hi" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Theme Color */}
        <meta name="theme-color" content="#0066CC" />
      </head>
      <body className="min-h-full flex flex-col font-inter text-text">
        <Analytics />
        <Navbar />
        <main className="pt-20">{children}</main>
        <WhatsAppButton />
        <Chatbot />
      </body>
    </html>
  );
}
