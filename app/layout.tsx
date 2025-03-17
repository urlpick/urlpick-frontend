import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Script from "next/script";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "URLPick - Professional URL Shortener",
  description:
    "Create short, memorable links for your business and personal needs with URLPick's secure URL shortening service",
  keywords:
    "url shortener, link shortener, short url, url tracking, professional url shortener",
  authors: [{ name: "URLPick Team" }],
  creator: "URLPick",
  publisher: "URLPick",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://url.injun.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://url.injun.dev",
    title: "URLPick - Professional URL Shortener",
    description:
      "Create short, memorable links for your business and personal needs with URLPick's secure URL shortening service",
    siteName: "URLPick",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "URLPick - Professional URL Shortener",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "URLPick - Professional URL Shortener",
    description:
      "Create short, memorable links for your business and personal needs with URLPick's secure URL shortening service",
    images: ["/og-image.png"],
    creator: "@urlpick",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#3b82f6",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "verification_token",
  },
  generator: "v0.dev",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" richColors closeButton />
        </ThemeProvider>

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7004859261139401"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

import "./globals.css";
