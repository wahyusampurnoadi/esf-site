"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = Omit<ImageProps, "style"> & {
  /** kekuatan parallax saat scroll (0.10–0.40 enak) */
  strength?: number;
  /** batas gerak parallax (px) */
  clamp?: number;
  /** maksimal derajat miring saat hover (deg) */
  tiltMax?: number;
  /** scale saat hover */
  tiltScale?: number;
  className?: string;
};

export default function ParallaxImage({
  strength = 0.22,
  clamp = 60,
  tiltMax = 12,
  tiltScale = 1.04,
  className,
  ...imgProps
}: Props) {
  const outerRef = useRef<HTMLDivElement>(null); // untuk parallax (translateY)
  const tiltRef = useRef<HTMLDivElement>(null);  // untuk 3D tilt (rotate/scale)
  const glareRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  // ------ Scroll Parallax ------
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768; // nonaktif di mobile
    if (reduce || small) return;

    setEnabled(true);
    const el = outerRef.current!;
    let ticking = false;

    const update = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const centerOffset = rect.top + rect.height / 2 - vh / 2;
      const offset = Math.max(-clamp, Math.min(clamp, -centerOffset * strength));
      el.style.transform = `translateY(${offset}px)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength, clamp]);

  // ------ Hover 3D Tilt ------
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const container = outerRef.current!;
    const inner = tiltRef.current!;
    const glare = glareRef.current!;

    const onMove = (e: MouseEvent) => {
      const r = inner.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;   // 0..1
      const py = (e.clientY - r.top) / r.height;   // 0..1

      const rotX = (0.5 - py) * 2 * tiltMax;       // -tilt..tilt
      const rotY = (px - 0.5) * 2 * tiltMax;

      inner.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${tiltScale})`;
      glare.style.opacity = "1";
      glare.style.background = `radial-gradient(400px 400px at ${px * 100}% ${
        py * 100
      }%, rgba(255,255,255,0.35), transparent 60%)`;
    };

    const onLeave = () => {
      inner.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
      glare.style.opacity = "0";
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [tiltMax, tiltScale]);

  return (
    <div
      ref={outerRef}
      className="will-change-transform"
      style={{ transform: "translateY(0px)", perspective: "900px" }}
    >
      <div
        ref={tiltRef}
        className="relative will-change-transform transition-transform duration-200 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image {...imgProps} className={className} />
        {/* glare highlight */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200"
        />
      </div>
    </div>
  );
}
