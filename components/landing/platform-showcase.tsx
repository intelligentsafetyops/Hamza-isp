"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { ModuleIcon } from "@/components/landing/module-icons";
import { previews } from "@/components/landing/platform-wall";
import { TextLink } from "@/components/site/cta";
import { platform } from "@/content/landing";
import { cn } from "@/lib/utils";

/**
 * Product showcase: the same visual language as the showcase hero (dot grid, warm glow,
 * centred headline). One large product panel tilts back and flattens as it scrolls into view; inside,
 * PDCA tabs switch the stage — modules on the left, the flagship working large on the right.
 */
export function PlatformShowcase() {
  const [active, setActive] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const g = platform.groups[active];
  const f = platform.featured[g.featured];
  const Preview = previews[g.featured];
  const last = platform.groups.length - 1;

  // --tilt goes 1 → 0 as the panel rises from the bottom of the viewport toward the top.
  useEffect(() => {
    const el = panel.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const top = el.getBoundingClientRect().top;
      const vh = window.innerHeight;
      const t = Math.min(1, Math.max(0, (top - vh * 0.12) / (vh * 0.7)));
      el.style.setProperty("--tilt", t.toFixed(3));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const next = e.key === "ArrowRight" ? active + 1 : e.key === "ArrowLeft" ? active - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const n = Math.max(0, Math.min(last, next));
    setActive(n);
    tabs.current[n]?.focus();
  };

  return (
    <section
      id="platform"
      aria-labelledby="platform-title"
      className="relative isolate overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:radial-gradient(var(--color-bone)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_10%,black,transparent)] [background-size:22px_22px]"
      />
      <div
        aria-hidden
        className="absolute top-[58%] left-1/2 -z-10 h-[520px] w-[min(1100px,90vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--color-marigold-glow),transparent)] opacity-80 blur-2xl"
      />

      <div className="container-page">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="text-flame-ink text-[14px] font-semibold tracking-[0.06em] uppercase">
            {platform.eyebrow}
          </p>
          <h2
            id="platform-title"
            className="text-ink-black text-heading-lg sm:text-section lg:text-display mt-3 font-medium"
          >
            {platform.title}
          </h2>
          <p className="text-warm-stone text-lede mx-auto mt-5 max-w-[60ch]">{platform.body}</p>
          <div className="mt-6">
            <TextLink href={platform.cta.href}>{platform.cta.label}</TextLink>
          </div>
        </div>

        <figure className="mt-14 [perspective:2200px] sm:mt-16">
          <div
            ref={panel}
            className="rounded-cards border-hairline bg-paper-white origin-bottom [transform:rotateX(calc(var(--tilt)*14deg))_scale(calc(1-var(--tilt)*0.04))] overflow-hidden border shadow-[0_40px_80px_-30px_rgba(29,30,28,0.28)] will-change-transform [--tilt:1] motion-reduce:[transform:none]"
          >
            {/* Panel bar: PDCA tabs. */}
            <div className="border-hairline flex items-center justify-between gap-3 border-b px-3 py-3 sm:px-5">
              <div
                role="tablist"
                aria-label="PDCA stages"
                onKeyDown={onKeyDown}
                className="bg-cream-canvas border-hairline inline-flex rounded-full border p-1"
              >
                {platform.groups.map((s, i) => (
                  <button
                    key={s.stage}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    id={`pdca-show-tab-${i}`}
                    role="tab"
                    aria-selected={i === active}
                    aria-controls="pdca-show-panel"
                    tabIndex={i === active ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={cn(
                      "h-8 rounded-full px-3.5 text-[14px] font-semibold transition-colors duration-200 sm:px-4",
                      i === active
                        ? "bg-ink-black text-cream-canvas"
                        : "text-ironwood hover:text-ink-black"
                    )}
                  >
                    {s.stage}
                  </button>
                ))}
              </div>
              <span className="text-ash tabular hidden text-[13px] sm:inline">
                {g.items.length + 1} modules in {g.stage}
              </span>
            </div>

            <div
              id="pdca-show-panel"
              role="tabpanel"
              aria-labelledby={`pdca-show-tab-${active}`}
              className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-12"
            >
              {/* Stage: flagship + its modules. */}
              <div
                key={`copy-${active}`}
                className="animate-in fade-in-0 p-6 duration-300 motion-reduce:animate-none sm:p-8 lg:col-span-5"
              >
                <p className="text-warm-stone text-[14px]">{g.line}</p>
                <h3 className="text-ink-black text-heading mt-4 flex items-center gap-2.5 font-medium">
                  <ModuleIcon
                    name={f.title}
                    aria-hidden
                    className="size-5 shrink-0"
                    strokeWidth={1.75}
                  />
                  {f.title}
                </h3>
                <p className="text-warm-stone mt-2">{f.body}</p>
                <ul className="border-hairline mt-6 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-5 gap-y-2.5 border-t pt-5">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="text-ink-black flex min-w-0 items-center gap-2 text-[14px] leading-snug"
                    >
                      <ModuleIcon
                        name={item}
                        aria-hidden
                        className="text-warm-stone size-3.5 shrink-0"
                        strokeWidth={1.75}
                      />
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* The flagship, working, large: a product screen on a soft accent wash. */}
              <div className="border-hairline relative isolate flex items-center justify-center overflow-hidden border-t p-4 sm:p-8 lg:col-span-7 lg:border-t-0 lg:border-l lg:p-10">
                <div
                  aria-hidden
                  className="bg-cream-canvas absolute inset-0 -z-10 [background-image:radial-gradient(ellipse_at_85%_0%,var(--color-marigold-glow),transparent_60%),radial-gradient(var(--color-bone)_1px,transparent_1px)] [background-size:auto,18px_18px]"
                />
                <div
                  key={`preview-${active}`}
                  className="animate-in fade-in-0 zoom-in-[0.98] slide-in-from-bottom-2 w-full max-w-[640px] duration-500 motion-reduce:animate-none"
                >
                  <Preview />
                </div>
              </div>
            </div>
          </div>
        </figure>

        {/* Across every stage, as one quiet line. */}
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <ul
            aria-label="Across every stage"
            className="flex flex-wrap justify-center gap-x-5 gap-y-2"
          >
            {platform.everywhere.map((item) => (
              <li key={item} className="text-ironwood flex items-center gap-1.5 text-[14px]">
                <ModuleIcon name={item} aria-hidden className="size-3.5" strokeWidth={1.75} />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-ash flex items-center gap-2 text-[13px]">
            <RefreshCw aria-hidden className="text-flame-ink size-3.5 shrink-0" strokeWidth={2} />
            {platform.loop}
          </p>
        </div>
      </div>
    </section>
  );
}
