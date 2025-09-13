import type { Metadata } from "next";
import "./globals.css";
import FancyCursor from "@/components/FancyCursor";

export const metadata: Metadata = {
  title: "ESF — Edit Seputar Foto",
  description:
    "Jasa edit foto cepat, rapi, amanah untuk pasfoto, ganti pakaian, retouch, dan lain-lain.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        {children}
        <FancyCursor /> {/* ⬅️ kursor baru */}
      </body>
    </html>
  );
}
