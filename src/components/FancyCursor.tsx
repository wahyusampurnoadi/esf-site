"use client";

import * as React from "react";

/**
 * FancyCursor
 * - Menampilkan ring & dot mengikuti kursor (desktop saja)
 * - Menghilang otomatis pada device pointer "coarse" (mobile)
 * - Abaikan elemen yang diberi atribut data-cursor="ignore"
 */
export default function FancyCursor() {
  // Jangan render di mobile / tablet (pointer coarse)
  const [enabled, setEnabled] = React.useState(false);

  // posisi kursor (instan) & posisi ring (smoothed / inertial)
  const pos = React.useRef({ x: 0, y: 0 });
  const ring = React.useRef({ x: 0, y: 0 });

  // state visual
  const [pressed, setPressed] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  // refs elemen
  const dotRef = React.useRef<HTMLDivElement | null>(null);
  const ringRef = React.useRef<HTMLDivElement | null>(null);

  // aktifkan hanya di desktop
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);

    const handleChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener?.("change", handleChange);
    return () => mq.removeEventListener?.("change", handleChange);
  }, []);

  // tracking posisi kursor & sembunyikan saat hover elemen dengan data-cursor="ignore"
  React.useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      const target = e.target as HTMLElement | null;
      const ignore = target?.closest?.("[data-cursor='ignore']");
      setHidden(Boolean(ignore));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);

  // pointer down/up → scale/solid
  React.useEffect(() => {
    if (!enabled) return;

    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled]);

  // animasi smoothing untuk ring
  React.useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    const tick = () => {
      // smoothing (lerp)
      ring.current.x += (pos.current.x - ring.current.x) * 0.15;
      ring.current.y += (pos.current.y - ring.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 2}px, ${
          pos.current.y - 2
        }px)`;
        dotRef.current.style.opacity = hidden ? "0" : "1";
      }

      if (ringRef.current) {
        const scale = pressed ? 0.9 : 1.2;
        ringRef.current.style.transform = `translate(${ring.current.x - 16}px, ${
          ring.current.y - 16
        }px) scale(${scale})`;
        ringRef.current.style.opacity = hidden ? "0" : "1";
        ringRef.current.style.borderWidth = pressed ? "3px" : "2px";
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, pressed, hidden]);

  if (!enabled) return null;

  return (
    <>
      {/* DOT */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 rounded-full bg-purple-700 transition-opacity duration-150"
      />
      {/* RING */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] h-8 w-8 rounded-full border border-purple-500/90 bg-white/10 backdrop-blur-sm shadow-[0_0_12px_rgba(139,92,246,0.25)] transition-[opacity,border-width] duration-150"
      />
    </>
  );
}
