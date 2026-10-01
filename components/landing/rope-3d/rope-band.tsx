"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { lifecycle, ropeBand as band } from "@/content/landing";
import type { RopeColors, RopeScene } from "./scene";

// Mirrors scene.ts so labels can be placed before (and without) loading three.js.
const STAGE_T = [0.24, 0.355, 0.47, 0.585, 0.7, 0.815, 0.93];
const SPAN = 0.84;
const smooth = (x: number) => {
  const t = Math.min(1, Math.max(0, x));
  return t * t * (3 - 2 * t);
};
const local = (t: number, p: number) => smooth(p * 1.7 - t * 0.7);

/** Resolve a CSS custom property to a colour three.js can read (handles color-mix()). */
function resolve(name: string) {
  const probe = document.createElement("span");
  probe.style.color = `var(${name})`;
  probe.style.display = "none";
  document.body.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  probe.remove();
  const c = document.createElement("canvas").getContext("2d")!;
  c.fillStyle = "#000";
  c.fillStyle = computed;
  c.fillRect(0, 0, 1, 1);
  const [r, g, b] = c.getImageData(0, 0, 1, 1).data;
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function readColors(): RopeColors {
  return {
    ink: resolve("--color-ink-black"),
    twist: resolve("--color-parchment-shadow"),
    flame: resolve("--color-harvest-flame")
  };
}

/**
 * The hand-off between "The reality today" and the lifecycle: the same rope, pinned while the
 * visitor scrolls, untangling left to right until it runs straight through the seven stages.
 */
export function RopeBand() {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<RopeScene | null>(null);
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);

  // Load three.js only when the band is close, then wire scroll, resize, visibility and theme.
  useEffect(() => {
    const el = section.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let disposed = false;
    const cleanups: (() => void)[] = [];

    const near = new IntersectionObserver(
      async ([e]) => {
        if (!e.isIntersecting) return;
        near.disconnect();
        try {
          const { createRopeScene } = await import("./scene");
          if (disposed) return;
          const scene = createRopeScene(cv, readColors());
          sceneRef.current = scene;
          scene.resize();

          const ro = new ResizeObserver(() => scene.resize());
          ro.observe(cv);
          cleanups.push(() => ro.disconnect());

          // Theme changes from the Customize panel land as inline styles on <html>.
          const mo = new MutationObserver(() => scene.setColors(readColors()));
          mo.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
          cleanups.push(() => mo.disconnect());

          if (prefersReduced) {
            scene.setProgress(1);
            setProgress(1);
            return;
          }

          let frame = 0;
          const onScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
              const r = el.getBoundingClientRect();
              const travel = r.height - window.innerHeight;
              const raw = travel > 0 ? -r.top / travel : 1;
              const p = Math.min(1, Math.max(0, raw / 0.85)); // hold the straight line at the end
              scene.setProgress(p);
              setProgress(p);
            });
          };
          onScroll();
          window.addEventListener("scroll", onScroll, { passive: true });
          cleanups.push(() => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(frame);
          });

          // Only animate the idle sway while the band is on screen.
          const vis = new IntersectionObserver(([v]) =>
            v.isIntersecting ? scene.start() : scene.stop()
          );
          vis.observe(el);
          cleanups.push(() => vis.disconnect());
        } catch (err) {
          // No WebGL (or it failed): the band is decorative, so it simply steps aside.
          if (process.env.NODE_ENV !== "production") console.error("[RopeBand]", err);
          setFailed(true);
        }
      },
      { rootMargin: "600px 0px" }
    );
    near.observe(el);

    return () => {
      disposed = true;
      near.disconnect();
      cleanups.forEach((c) => c());
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  if (failed) return null;
  const p = progress;
  const done = p >= 0.98;

  return (
    <section
      ref={section}
      aria-label="From a tangle of records to one provable line"
      className="relative h-[170vh] motion-reduce:h-[56vh] md:h-[200vh]"
    >
      <div className="sticky top-(--header-height) h-[calc(100svh-var(--header-height))] overflow-hidden motion-reduce:relative motion-reduce:top-0 motion-reduce:h-full">
        <canvas ref={canvas} aria-hidden className="absolute inset-0 size-full" />

        {/* Headline crossfade: the problem, then the resolution. */}
        <div className="absolute inset-x-0 top-[12%] px-4 text-center" aria-live="off">
          <p
            className="text-ink-black text-heading-lg sm:text-section lg:text-display font-medium transition-opacity duration-300"
            style={{ opacity: 1 - smooth((p - 0.35) * 5) }}
          >
            {band.before}
          </p>
          <p
            className="text-ink-black text-heading-lg sm:text-section lg:text-display absolute inset-x-0 top-0 px-4 font-medium transition-opacity duration-300"
            style={{ opacity: smooth((p - 0.6) * 4) }}
          >
            {band.after}
          </p>
        </div>

        {/* Start label: the tangle. Fades as the rope straightens. */}
        <p
          className="text-warm-stone absolute top-[30%] left-4 text-[14px] font-medium transition-opacity duration-300 sm:left-[6%]"
          style={{ opacity: 1 - smooth(p * 2.2) }}
        >
          {lifecycle.start}
        </p>

        {/* Scroll hint, gone after the first stretch. */}
        <p
          className="text-ash absolute bottom-8 left-1/2 -translate-x-1/2 text-[13px] font-medium whitespace-nowrap transition-opacity duration-300 motion-reduce:hidden"
          style={{ opacity: 1 - smooth(p * 6) }}
        >
          Keep scrolling to straighten it
        </p>

        {/* Stage labels sit under their beads once that stretch is straight. */}
        <ol aria-label="QHSE lifecycle stages" className="hidden md:block">
          {lifecycle.stages.map((s, i) => {
            const k = smooth((local(STAGE_T[i], p) - 0.82) / 0.18);
            return (
              <li
                key={s.name}
                className="text-ink-black absolute top-[calc(50%+30px)] text-[15px] font-semibold whitespace-nowrap"
                style={{
                  left: `${(0.5 + (STAGE_T[i] - 0.5) * SPAN) * 100}%`,
                  opacity: k,
                  transform: `translate(-50%, ${(1 - k) * 8}px)`
                }}
              >
                {s.name}
              </li>
            );
          })}
        </ol>

        {/* End label: provable. */}
        <p
          className="bg-harvest-flame text-on-brand rounded-tags absolute top-[calc(50%-64px)] right-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[14px] font-semibold transition-[opacity,transform] duration-300 sm:right-[8%]"
          style={{ opacity: done ? 1 : 0, transform: `translateY(${done ? 0 : 6}px)` }}
        >
          {lifecycle.end} <Check aria-hidden className="size-4" strokeWidth={3} />
        </p>
      </div>
    </section>
  );
}
