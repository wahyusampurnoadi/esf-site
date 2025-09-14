"use client";

import * as React from "react";
import Image, { ImageProps } from "next/image";

type ParallaxImageProps = Omit<ImageProps, "alt"> & {
  alt?: string;
  /** seberapa kuat parallax, default 0.22 */
  strength?: number;
  /** batas maksimal translasi Y (px), default 70 */
  clamp?: number;
  /** rotasi maksimum (derajat) saat hover, default 12 */
  tiltMax?: number;
  /** skala saat hover, default 1.04 */
  tiltScale?: number;
  /** tambahan class untuk wrapper (bukan untuk <Image>) */
  className?: string;
};

/**
 * ParallaxImage
 * - Parallax saat scroll (translateY lembut)
 * - Efek tilt 3D saat hover (desktop saja)
 */
export default function ParallaxImage({
  alt = "",
  strength = 0.22,
  clamp = 70,
  tiltMax = 12,
  tiltScale = 1.04,
  className = "",
  ...imgProps
}: ParallaxImageProps) {
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const innerRef = React.useRef<HTMLDivElement | null>(null);

  // nonaktifkan tilt di perangkat pointer "coarse"
  const [tiltEnabled, setTiltEnabled] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    setTiltEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setTiltEnabled(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Parallax on scroll
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const el = wrapRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    let raf = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // delta jarak dari center viewport
      const delta = rect.top + rect.height / 2 - vh / 2;
      let ty = delta * strength;
      if (clamp > 0) {
        ty = Math.max(-clamp, Math.min(clamp, ty));
      }

      // apply transform—yang tilt akan ditambahkan oleh handler mouse
      const prev = inner.style.transform || "";
      // buang komponen translateY sebelumnya (jaga agar tilt masih berlaku)
      const clean = prev.replace(/translateY\([^)]+\)\s*/g, "").trim();
      inner.style.transform = `translateY(${ty.toFixed(2)}px) ${clean}`;
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [strength, clamp]);

  // Tilt 3D saat hover (desktop)
  React.useEffect(() => {
    if (!tiltEnabled) return;
    const el = wrapRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);

      const rotX = Math.max(-1, Math.min(1, -dy)) * tiltMax;
      const rotY = Math.max(-1, Math.min(1, dx)) * tiltMax;

      // gabungkan dengan translateY yang sudah diset efek parallax
      const current = inner.style.transform || "";
      const base = current.replace(/rotate[XY]\([^)]+\)|scale\([^)]+\)/g, "").trim();
      inner.style.transform = `${base} rotateX(${rotX.toFixed(
        2
      )}deg) rotateY(${rotY.toFixed(2)}deg) scale(${tiltScale})`;
      inner.style.transformStyle = "preserve-3d";
    };

    const onLeave = () => {
      // buang rotate & scale; sisakan translateY dari efek parallax
      const current = inner.style.transform || "";
      inner.style.transform = current
        .replace(/rotate[XY]\([^)]+\)|scale\([^)]+\)/g, "")
        .trim();
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [tiltEnabled, tiltMax, tiltScale]);

  return (
    <div
      ref={wrapRef}
      className={`relative will-change-transform [perspective:1000px] ${className}`}
    >
      <div ref={innerRef} className="will-change-transform">
        {/* alt default "" supaya lulus a11y lint bila dekoratif */}
        <Image alt={alt} {...imgProps} />
      </div>
    </div>
  );
}
