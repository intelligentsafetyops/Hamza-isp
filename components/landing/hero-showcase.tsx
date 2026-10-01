"use client";

import { useEffect, useRef } from "react";
import { DashboardShot } from "@/components/landing/dashboard-shot";
import { HeroCopy } from "@/components/landing/hero";
import { HeroBackdrop } from "@/components/landing/hero-3d/hero-backdrop";

/**
 * Product showcase: centred copy over the 3D dot wave, then the real dashboard, tilted back in 3D.
 * Scrolling the first ~500px flattens it toward the reader. One CSS variable (--tilt, 1 → 0)
 * drives the transform, set straight on the element: no React state, no re-renders.
 */
export function HeroShowcase() {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const t = 1 - Math.min(1, Math.max(0, window.scrollY / 520));
      el.style.setProperty("--tilt", t.toFixed(3));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Backdrop: the three.js dot wave, and a soft accent glow behind the product. */}
      <HeroBackdrop className="[mask-image:linear-gradient(to_bottom,black,black_50%,transparent_80%)]" />
      <div
        aria-hidden
        className="absolute top-[52%] left-1/2 -z-10 h-[520px] w-[min(1100px,90vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--color-marigold-glow),transparent)] opacity-80 blur-2xl"
      />

      <div className="container-page pt-12 sm:pt-20">
        <HeroCopy align="center" display="sans" />
      </div>

      <figure className="container-page relative mt-14 [perspective:2200px] sm:mt-16">
        <div
          ref={frame}
          className="origin-top [transform:rotateX(calc(var(--tilt)*20deg))_scale(calc(1-var(--tilt)*0.06))] will-change-transform [--tilt:1] motion-reduce:[transform:none]"
        >
          <DashboardShot imageClassName="max-sm:w-[175%] max-sm:max-w-none" />
        </div>
        {/* Fade the lower edge into the page so the product reads as continuing below. */}
        <div
          aria-hidden
          className="from-cream-canvas pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t to-transparent"
        />
        <figcaption className="text-ash relative -mt-10 pb-16 text-center text-[13px] sm:pb-20">
          The Sajjeel Labs dashboard. Sample data.
        </figcaption>
      </figure>
    </section>
  );
}
