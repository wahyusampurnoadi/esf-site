// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import FancyCursor from "@/components/FancyCursor";
import { Inter } from "next/font/google";
import CrispWidget from "@/components/CrispWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  // ganti ke domain kamu
  metadataBase: new URL("https://esf.example.com"),
  title: {
    default: "ESF — Edit Seputar Foto",
    template: "%s • ESF",
  },
  description:
    "Jasa edit foto cepat, rapi, amanah untuk pasfoto, ganti pakaian, retouch, dan lain-lain.",
  alternates: { canonical: "/" },
  icons: {
    icon: "/icon.ico",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "ESF — Edit Seputar Foto",
    description:
      "Jasa edit foto cepat, rapi, amanah untuk pasfoto, ganti pakaian, retouch, dan lain-lain.",
    url: "/",
    siteName: "ESF",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "ESF" }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ESF — Edit Seputar Foto",
    description:
      "Jasa edit foto cepat, rapi, amanah untuk pasfoto, ganti pakaian, retouch, dan lain-lain.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ff", // tailwind purple-50 untuk address bar mobile
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-dvh antialiased`}>
        {children}
        <CrispWidget />
        <FancyCursor />
      </body>
    </html>
  );
}
