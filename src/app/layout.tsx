import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
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

export const metadata: Metadata = {
  title: "UV Infra – Premium Flats in Hyderabad | 2BHK Apartments Ameenpur",
  description: "UV Infra builds premium 2BHK apartments in Ameenpur, Hyderabad. Sunshine Sapphire & UV's Pearl projects. Contact Pavan Kumar Inturi: +91 73860 86043.",
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
      <body className="min-h-full flex flex-col font-inter text-text">
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
