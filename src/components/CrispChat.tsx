"use client";
import { useEffect } from "react";

export default function CrispChat() {
  useEffect(() => {
    if ((window as any).$crisp) return;
    (window as any).$crisp = [];
    (window as any).CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID!;
    const s = document.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = true;
    document.head.appendChild(s);

    // geser bubble supaya tidak nabrak tombol ScrollToTop
    (window as any).$crisp.push(["config", "position:offset", [0, 96]]);
  }, []);
  return null;
}