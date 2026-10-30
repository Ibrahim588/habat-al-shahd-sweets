import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Cairo } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import CartDrawer from "@/components/cart/CartDrawer";
import SearchModal from "@/components/common/SearchModal";
import CinematicPreloader from "@/components/common/CinematicPreloader";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#493126",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://habat-alshahd.com"),
  title: {
    default: "حلويات حبات الشهد | مذاق شرقي يملأ اللحظة حلاوة",
    template: "%s | حلويات حبات الشهد",
  },
  description:
    "حلويات حبات الشهد - تشكيلة فاخرة من الكنافة، البسبوسة، رموش الست، والحلويات الشرقية المصنوعة بأجود المكونات والسمن البلدي لمناسباتكم وضيافتكم.",
  keywords: [
    "حلويات حبات الشهد",
    "حلويات شرقية",
    "بسبوسة",
    "كنافة",
    "رموش الست",
    "بسيمة",
    "ضيافة مناسبات",
    "حلويات فاخرة",
    "بسبوسة قشطة",
  ],
  authors: [{ name: "حلويات حبات الشهد" }],
  creator: "حلويات حبات الشهد",
  publisher: "حلويات حبات الشهد",
  formatDetection: {
    telephone: true,
  },
  openGraph: {
    title: "حلويات حبات الشهد | مذاق شرقي يملأ اللحظة حلاوة",
    description:
      "تذوقوا حلاوة التفاصيل مع أفخر أصناف الحلويات الشرقية، البسبوسة، والكنافة الطازجة.",
    url: "https://habat-alshahd.com",
    siteName: "حلويات حبات الشهد",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "حلويات حبات الشهد",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "حلويات حبات الشهد",
    description: "حلاوة التفاصيل في كل حبة - حلويات شرقية فاخرة ومتميزة",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/apple-touch-icon.png",
  },
};

// Structured data for Google Rich Results (Schema.org)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  "name": "حلويات حبات الشهد",
  "image": "https://habat-alshahd.com/images/logo.png",
  "description": "حلويات شرقية فاخرة - كنافة، بسبوسة، رموش الست، تشكيلات ضيافة ومناسبات بالسمن البلدي.",
  "telephone": ["+966559978075", "+966545166206"],
  "priceRange": "$$",
  "servesCuisine": "حلويات شرقية",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "SA"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "09:00",
    "closes": "23:30"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${cairo.className}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-arabic bg-cream text-brown antialiased selection:bg-gold/20 selection:text-brown">
        <StoreProvider>
          <CartProvider>
            <CinematicPreloader />
            <AnnouncementBar />
            <Suspense fallback={<div className="h-16 bg-cream border-b border-beige" />}>
              <Header />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <SearchModal />
            <FloatingWhatsApp />
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
