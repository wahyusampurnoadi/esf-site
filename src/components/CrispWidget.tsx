"use client";
import { useEffect } from "react";

export default function CrispWidget() {
  useEffect(() => {
    // Load Crisp sekali
    if (!window.$crisp) {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID!;
      const s = document.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      document.head.appendChild(s);
    }

    // Hitung jarak aman dari tombol scroll-top
    const applyOffset = () => {
      try {
        const GAP = 20;           // jarak aman antar elemen
        const MIN_Y = 120;        // minimal naik dari bawah
        const btn = document.getElementById("scrolltop-fab");
        let y = MIN_Y;

        if (btn) {
          const rect = btn.getBoundingClientRect();
          const distFromBottom = window.innerHeight - rect.top; // px dari bawah ke atas tombol
          y = Math.max(MIN_Y, distFromBottom + GAP);
        }

        // x = jarak dari kanan, y = jarak dari bawah (dalam px)
        window.$crisp.push(["config", "position:offset", [16, y]]);
      } catch {}
    };

    // Jalankan saat siap
    const boot = setInterval(() => {
      if (window.$crisp?.push) {
        applyOffset();
        // Re-apply saat chat open/close (Crisp kadang reset posisinya)
        window.$crisp.push(["on", "chat:opened", applyOffset]);
        window.$crisp.push(["on", "chat:closed", applyOffset]);
        clearInterval(boot);
      }
    }, 150);

    // Re-apply saat resize & scroll (muncul/hilangnya tombol)
    const onResize = () => applyOffset();
    const onScroll = () => applyOffset();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearInterval(boot);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
