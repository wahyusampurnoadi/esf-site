"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1 untuk ring progress

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setShow(y > 400);
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      id="scrolltop-fab"
      onClick={goTop}
      aria-label="Kembali ke atas"
      data-cursor="ignore"
      className={[
        "fixed right-5 bottom-22 z-50 h-12 w-12 rounded-full",
        "shadow-lg transition-all",
        show ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-3",
      ].join(" ")}
      style={{
        // ring progres parallax ungu
        backgroundImage: `conic-gradient(#a78bfa ${progress * 360}deg, #e9d5ff 0)`,
      }}
    >
      {/* inner bulatan */}
      <span className="grid place-items-center h-12 w-12">
        <span className="grid place-items-center h-10 w-10 rounded-full bg-purple-600 text-white hover:bg-purple-700">
          {/* ikon panah atas */}
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V6" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </span>
      </span>
    </button>
  );
}
