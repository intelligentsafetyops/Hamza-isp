"use client";

import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  CircleAlert,
  FileSpreadsheet,
  FileText,
  Folder,
  Mail,
  Timer
} from "lucide-react";
import { RopeStrokes } from "@/components/landing/rope";
import { SectionHead } from "@/components/site/section-head";
import { reality } from "@/content/landing";
import { cn } from "@/lib/utils";

const icons = [FileSpreadsheet, Folder, FileText, BookOpen, Mail, CircleAlert];

// One rope, five knots, artefacts caught where it loops (viewBox 1200×440).
const ROPE =
  "M-10 250 C 60 170, 120 320, 175 235 S 110 120, 215 150 S 320 300, 400 200 S 330 90, 430 110 S 540 320, 615 250 S 560 140, 655 165 S 770 300, 840 195 S 780 90, 880 115 S 990 320, 1050 245 S 1000 150, 1090 175 S 1170 270, 1215 235";

// Desktop positions (percent of the stage) and tilt for each artefact.
const pins = [
  { left: 4, top: 6, rotate: -4 },
  { left: 20, top: 56, rotate: 3 },
  { left: 38, top: 4, rotate: -2 },
  { left: 52, top: 58, rotate: 2 },
  { left: 67, top: 8, rotate: -3 },
  { left: 80, top: 54, rotate: 3 }
];

type Light = number | "timer";

/** Counts 60 → 0 once the scene is on screen. Reduced motion keeps it at 60. */
function useCountdown() {
  const ref = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(60);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || left === 0) return;
    const t = window.setTimeout(() => setLeft((n) => n - 1), 1000);
    return () => window.clearTimeout(t);
  }, [started, left]);

  return { ref, left };
}

function Artefact({
  i,
  dim,
  lit,
  fluid = false
}: {
  i: number;
  dim: boolean;
  lit: boolean;
  /** Fill the grid cell and keep the bubble inline (grid layouts, not the rope scene). */
  fluid?: boolean;
}) {
  const a = reality.artefacts[i];
  const Icon = icons[i];
  const open = "open" in a && a.open;
  return (
    <div
      className={cn(
        "bg-paper-white rounded-images shadow-card relative w-full border p-3 transition-[opacity,box-shadow,border-color] duration-200",
        !fluid && "md:w-[196px]",
        lit ? "border-ink-black" : "border-hairline",
        dim && "opacity-35"
      )}
    >
      <p className="text-ash flex items-center gap-1.5 text-[12px] font-semibold">
        <Icon aria-hidden className="size-3.5" strokeWidth={2} />
        {a.kind}
      </p>
      <p className="text-ink-black mt-1.5 text-[14px] leading-snug font-medium md:truncate">
        {a.title}
      </p>
      <p className={cn("mt-1 text-[12px]", open ? "text-flame-ink font-semibold" : "text-ash")}>
        {a.meta}
      </p>
      {"ask" in a && (
        <p
          className={cn(
            "bg-ink-black text-cream-canvas mt-3 w-max max-w-full rounded-[12px] rounded-bl-[3px] px-3 py-1.5 text-[13px] font-semibold",
            !fluid && "md:absolute md:-top-5 md:-right-8 md:mt-0",
            dim && "md:opacity-100"
          )}
        >
          {a.ask}
        </p>
      )}
    </div>
  );
}

export function RealityScene() {
  const { ref, left } = useCountdown();
  const [focus, setFocus] = useState<number | null>(null);
  const lights: readonly Light[] = focus === null ? [] : reality.points[focus].lights;
  const isLit = (l: Light) => lights.includes(l);
  const dimming = focus !== null;
  const out = left === 0;

  return (
    <section aria-labelledby="reality-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHead
          id="reality-title"
          eyebrow={reality.eyebrow}
          title={reality.title}
          body={reality.body}
          align="split"
        />

        <div
          ref={ref}
          className="bg-paper-white border-hairline rounded-cards mt-12 overflow-hidden border"
        >
          {/* The scene: one question, one clock. */}
          <div className="border-hairline flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p className="text-ink-black text-[15px] font-medium">{reality.scene.prompt}</p>
            <p
              aria-live="off"
              className={cn(
                "rounded-tags inline-flex h-9 w-max shrink-0 items-center gap-2 px-3.5 text-[14px] font-semibold transition-[box-shadow,opacity] duration-200",
                "bg-harvest-flame text-on-brand",
                isLit("timer") && "ring-ink-black ring-2 ring-offset-2",
                dimming && !isLit("timer") && "opacity-40"
              )}
            >
              <Timer aria-hidden className="size-4" strokeWidth={2.25} />
              {out ? (
                reality.scene.timeout
              ) : (
                <>
                  <span className="tabular">0:{String(left).padStart(2, "0")}</span>
                  <span className="hidden font-medium sm:inline">{reality.scene.timer}</span>
                </>
              )}
            </p>
          </div>

          {/* Desktop: the tangle, with each artefact caught in a knot. */}
          <div className="bg-cream-canvas/60 relative hidden aspect-[1200/440] md:block">
            <svg
              viewBox="0 0 1200 440"
              preserveAspectRatio="none"
              className={cn(
                "absolute inset-0 size-full transition-opacity duration-200",
                dimming && "opacity-50"
              )}
              aria-hidden
            >
              <RopeStrokes d={ROPE} />
            </svg>
            <ul aria-label="Where the evidence lives today">
              {pins.map((p, i) => (
                <li
                  key={i}
                  className="absolute"
                  style={{ left: `${p.left}%`, top: `${p.top}%`, rotate: `${p.rotate}deg` }}
                >
                  <Artefact i={i} lit={isLit(i)} dim={dimming && !isLit(i)} />
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile: the same artefacts, stacked. */}
          <ul
            aria-label="Where the evidence lives today"
            className="bg-cream-canvas/60 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 p-4 md:hidden"
          >
            {reality.artefacts.map((_, i) => (
              <li key={i}>
                <Artefact i={i} lit={isLit(i)} dim={dimming && !isLit(i)} />
              </li>
            ))}
          </ul>

          {/* The three failure modes. Hover or focus one to see where it lives in the scene. */}
          <ul className="border-hairline divide-hairline grid grid-cols-[minmax(0,1fr)] divide-y border-t md:grid-cols-3 md:divide-x md:divide-y-0">
            {reality.points.map((p, i) => (
              <li key={p.title}>
                <button
                  type="button"
                  aria-pressed={focus === i}
                  onMouseEnter={() => setFocus(i)}
                  onMouseLeave={() => setFocus(null)}
                  onFocus={() => setFocus(i)}
                  onBlur={() => setFocus(null)}
                  onClick={() => setFocus(focus === i ? null : i)}
                  className={cn(
                    "group h-full w-full p-5 text-left transition-colors duration-200 sm:p-7",
                    focus === i ? "bg-cream-canvas" : "hover:bg-cream-canvas/60"
                  )}
                >
                  <span className="text-flame-ink text-[13px] font-semibold">{p.tag}</span>
                  <span className="text-ink-black text-heading-sm mt-2 block font-semibold">
                    {p.title}
                  </span>
                  <span className="text-warm-stone mt-2 block">{p.body}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Split cards: the message on the left, the scattered evidence as a still grid on the right. */
export function RealitySplit() {
  return (
    <section aria-labelledby="reality-title" className="py-20 sm:py-28">
      <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHead
            id="reality-title"
            eyebrow={reality.eyebrow}
            title={reality.title}
            body={reality.body}
            align="left"
          />
          <ul className="mt-10 grid gap-5">
            {reality.points.map((p) => (
              <li key={p.title} className="border-ink-black border-l-2 pl-4">
                <p className="text-ink-black font-semibold">{p.title}</p>
                <p className="text-warm-stone mt-1 text-[15px]">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <p className="bg-harvest-flame text-on-brand rounded-tags inline-flex h-9 items-center gap-2 px-3.5 text-[14px] font-semibold">
            <Timer aria-hidden className="size-4" strokeWidth={2.25} />
            60 seconds {reality.scene.timer}
          </p>
          <ul
            aria-label="Where the evidence lives today"
            className="mt-5 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 sm:gap-4"
          >
            {reality.artefacts.map((_, i) => (
              <li key={i} style={{ rotate: `${i % 2 ? 1.2 : -1.2}deg` }}>
                <Artefact i={i} lit={false} dim={false} fluid />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Minimal: no scene — the three failure modes, each led by its number. */
export function RealityMinimal() {
  return (
    <section aria-labelledby="reality-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHead
          id="reality-title"
          eyebrow={reality.eyebrow}
          title={reality.title}
          body={reality.body}
          align="split"
        />
        <ul className="border-ink-black mt-14 grid grid-cols-[minmax(0,1fr)] border-t-2 md:grid-cols-3">
          {reality.points.map((p, i) => (
            <li
              key={p.title}
              className={cn(
                "border-hairline border-b py-8 md:border-b-0 md:px-8",
                i === 0 && "md:pl-0",
                i > 0 && "md:border-l"
              )}
            >
              <p className="text-ink-black text-heading-lg sm:text-section font-medium">{p.tag}</p>
              <p className="text-flame-ink mt-4 text-[14px] font-semibold">{p.title}</p>
              <p className="text-warm-stone mt-2">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
