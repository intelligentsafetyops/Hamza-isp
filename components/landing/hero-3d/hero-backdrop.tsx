"use client";

import { useEffect, useRef, useState } from "react";
import { resolveCssColor } from "@/lib/css-color";
import { cn } from "@/lib/utils";
import type { WaveScene } from "./wave-scene";

/**
 * Animated three.js backdrop for every hero layout: a wave of dots in the accent colour.
 * three.js loads after first paint; the canvas fades in once it has drawn, and simply stays
 * empty if WebGL is unavailable. Pauses off screen; reduced motion gets one still frame.
 */
export function HeroBackdrop({ className }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let scene: WaveScene | null = null;
    const cleanups: (() => void)[] = [];

    import("./wave-scene")
      .then(({ createWaveScene }) => {
        if (disposed) return;
        scene = createWaveScene(cv, resolveCssColor("--color-harvest-flame"));
        const s = scene;
        s.resize();
        setReady(true);

        const ro = new ResizeObserver(() => s.resize());
        ro.observe(cv);
        cleanups.push(() => ro.disconnect());

        // Theme changes from the Customize panel land as inline styles on <html>.
        const mo = new MutationObserver(() => s.setColor(resolveCssColor("--color-harvest-flame")));
        mo.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
        cleanups.push(() => mo.disconnect());

        if (prefersReduced) {
          s.still();
          return;
        }

        const vis = new IntersectionObserver(([e]) => (e.isIntersecting ? s.start() : s.stop()));
        vis.observe(cv);
        cleanups.push(() => vis.disconnect());

        // The canvas sits behind the content, so listen on the window and map into it.
        const onMove = (e: PointerEvent) => {
          const r = cv.getBoundingClientRect();
          const inside =
            e.clientX >= r.left &&
            e.clientX <= r.right &&
            e.clientY >= r.top &&
            e.clientY <= r.bottom;
          s.setPointer(
            inside
              ? {
                  x: ((e.clientX - r.left) / r.width) * 2 - 1,
                  y: -((e.clientY - r.top) / r.height) * 2 + 1
                }
              : null
          );
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        cleanups.push(() => window.removeEventListener("pointermove", onMove));
      })
      .catch((err) => {
        // No WebGL (or it failed): the backdrop is decorative, so it stays empty.
        if (process.env.NODE_ENV !== "production") console.error("[HeroBackdrop]", err);
      });

    return () => {
      disposed = true;
      cleanups.forEach((c) => c());
      scene?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvas}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 size-full transition-opacity duration-1000",
        ready ? "opacity-100" : "opacity-0",
        className
      )}
    />
  );
}
