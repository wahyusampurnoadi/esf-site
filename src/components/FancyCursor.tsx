"use client";

import { useEffect, useRef, useState } from "react";

export default function FancyCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    // aktifkan hanya di pointer fine (mouse/trackpad)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.body.classList.add("cursor-none");
    setEnabled(true);

    const hoverables = "a,button,[role='button'],input,textarea,select,label,[data-cursor='hover']";
    const ignoreSel = "[data-cursor='ignore']";

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      const ring = ringRef.current;
      if (!ring) return;

      const el = (e.target as Element) || null;
      const ignore = el && el.closest(ignoreSel);
      const interactive = el && el.closest(hoverables);

      // hanya membesar di elemen interaktif yang BUKAN area ignore
      ring.classList.toggle("cursor-ring-hover", Boolean(interactive && !ignore));
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => ringRef.current?.classList.remove("cursor-ring-hover");

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;

      const ring = ringRef.current;
      const dot = dotRef.current;
      if (ring) {
        ring.style.transform = `translate3d(${pos.current.x - 18}px, ${pos.current.y - 18}px, 0) scale(${pressed ? 0.9 : 1})`;
      }
      if (dot) {
        dot.style.transform = `translate3d(${target.current.x - 3}px, ${target.current.y - 3}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Ring: outline saja (tanpa fill & tanpa backdrop-blur) */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full
                   border-2 border-purple-500/70 bg-transparent
                   shadow-[0_0_14px_rgba(168,85,247,.22)]
                   transition-transform duration-150 ease-out will-change-transform"
      />
      {/* Titik kecil */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-1.5 w-1.5 rounded-full
                   bg-purple-600 will-change-transform"
      />
    </>
  );
}
