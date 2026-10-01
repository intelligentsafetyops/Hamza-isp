"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { RopeStrokes } from "@/components/landing/rope";
import { Chip, Tick } from "@/components/landing/ui-bits";
import { SectionHead } from "@/components/site/section-head";
import { lifecycle } from "@/content/landing";
import { cn } from "@/lib/utils";

const stages = lifecycle.stages;
const LAST = stages.length - 1;
const TANGLE = "M2 60 C 20 10, 50 100, 62 52 S 30 6, 78 30 S 112 108, 104 58 S 128 60, 150 60";

/** Steps through the stages once when the section comes into view, until the visitor takes over. */
function useAutoplay(setActive: (fn: (n: number) => number) => void) {
  const ref = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const stopped = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting && !stopped.current), {
      threshold: 0.2
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = window.setInterval(() => {
      setActive((n) => {
        if (n >= LAST) {
          stopped.current = true;
          setRunning(false);
          return n;
        }
        return n + 1;
      });
    }, 2600);
    return () => window.clearInterval(t);
  }, [running, setActive]);

  const stop = () => {
    stopped.current = true;
    setRunning(false);
  };
  return { ref, stop };
}

export function LifecycleInteractive() {
  const [active, setActiveState] = useState(0);
  const { ref, stop } = useAutoplay(setActiveState);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // On narrow screens the track scrolls sideways; keep the active stage centred in it.
  useEffect(() => {
    const tab = tabs.current[active];
    const scroller = tab?.parentElement?.parentElement;
    if (!tab || !scroller || scroller.scrollWidth <= scroller.clientWidth) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollTo({
      left: tab.offsetLeft - scroller.clientWidth / 2 + tab.clientWidth / 2,
      behavior: reduce ? "auto" : "smooth"
    });
  }, [active]);

  const select = (n: number, focus = false) => {
    stop();
    const next = Math.max(0, Math.min(LAST, n));
    setActiveState(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: LAST
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key], true);
    }
  };

  const stage = stages[active];
  const done = active === LAST;

  return (
    <section
      id="lifecycle"
      aria-labelledby="lifecycle-title"
      className="bg-paper-white border-hairline border-y py-20 sm:py-28"
    >
      <div className="container-page">
        <SectionHead
          id="lifecycle-title"
          eyebrow={lifecycle.eyebrow}
          title={lifecycle.title}
          body={lifecycle.body}
        />

        <div
          ref={ref}
          className="bg-cream-canvas border-hairline rounded-cards mt-12 border p-3 sm:p-5 lg:p-6"
        >
          {/* Track: the tangle on the left, then the rope straightens through each stage. */}
          <div className="flex items-center gap-3 lg:gap-5">
            <div className="hidden shrink-0 lg:block">
              <p className="text-warm-stone text-[13px] font-medium">{lifecycle.start}</p>
              <svg viewBox="0 0 150 110" className="mt-1 h-14 w-auto" aria-hidden>
                <RopeStrokes d={TANGLE} />
              </svg>
            </div>

            <div className="min-w-0 flex-1 [scrollbar-width:none] overflow-x-auto py-2">
              <div
                role="tablist"
                aria-label="QHSE lifecycle stages"
                onKeyDown={onKeyDown}
                className="relative flex min-w-max items-center justify-between gap-2 px-1 xl:min-w-0"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-5 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[repeating-linear-gradient(90deg,var(--color-bone)_0_8px,transparent_8px_14px)]"
                />
                <span
                  aria-hidden
                  className="bg-ink-black absolute top-1/2 left-5 h-[4px] w-[calc(100%-2.5rem)] origin-left rounded-full transition-transform duration-500 ease-[var(--ease-out)] motion-reduce:transition-none"
                  style={{ transform: `translateY(-50%) scaleX(${active / LAST})` }}
                />
                {stages.map((s, i) => {
                  const selected = i === active;
                  const passed = i < active;
                  return (
                    <button
                      key={s.name}
                      ref={(el) => {
                        tabs.current[i] = el;
                      }}
                      id={`stage-tab-${i}`}
                      role="tab"
                      aria-selected={selected}
                      aria-controls="stage-panel"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => select(i)}
                      className={cn(
                        "relative inline-flex h-10 items-center gap-2 rounded-full border pr-4 pl-1.5 text-[14px] font-semibold whitespace-nowrap transition-[background-color,border-color,color] duration-200 active:translate-y-px",
                        selected && "bg-ink-black text-cream-canvas border-ink-black",
                        passed && "bg-paper-white text-ink-black border-ink-black",
                        !selected &&
                          !passed &&
                          "bg-paper-white text-ash border-hairline hover:border-bone hover:text-ink-black"
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "tabular inline-flex size-7 items-center justify-center rounded-full text-[12px]",
                          selected && "bg-harvest-flame text-on-brand",
                          passed && "bg-ink-black text-cream-canvas",
                          !selected && !passed && "bg-cream-canvas text-ash"
                        )}
                      >
                        {passed ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
                      </span>
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <span
              className={cn(
                "rounded-tags hidden h-10 shrink-0 items-center gap-1.5 border px-4 text-[14px] font-semibold transition-colors duration-300 md:inline-flex",
                done
                  ? "bg-harvest-flame text-on-brand border-harvest-flame"
                  : "bg-paper-white text-ash border-hairline"
              )}
            >
              {lifecycle.end} <Check aria-hidden className="size-4" strokeWidth={3} />
            </span>
          </div>

          {/* Panel: the record for this stage, and the audit trail it has written so far. */}
          <div
            id="stage-panel"
            role="tabpanel"
            aria-labelledby={`stage-tab-${active}`}
            className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-3 lg:mt-4 lg:grid-cols-12 lg:gap-4"
          >
            <article className="bg-paper-white border-hairline rounded-images flex flex-col border p-5 sm:p-7 lg:col-span-7">
              <div
                key={active}
                className="animate-in fade-in-0 slide-in-from-bottom-1 flex-1 duration-300 motion-reduce:animate-none"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Chip tone="ink">
                    Step {active + 1} of {stages.length} · {stage.name}
                  </Chip>
                  <span className="text-ash tabular text-[13px]">{stage.when}</span>
                </div>
                <h3 className="text-ink-black text-heading sm:text-heading-lg mt-5 font-medium">
                  {stage.record}
                </h3>
                <p className="text-warm-stone mt-1">{stage.note}</p>
                <ul className="mt-6 grid gap-3">
                  {stage.detail.map((d) => (
                    <li key={d} className="text-ink-black flex items-start gap-3">
                      <Tick className="mt-0.5" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-hairline mt-8 flex items-center justify-between gap-3 border-t pt-5">
                <button
                  type="button"
                  onClick={() => select(active - 1)}
                  disabled={active === 0}
                  className="text-ironwood hover:text-ink-black inline-flex h-10 items-center gap-1.5 rounded-full px-1 text-[14px] font-semibold disabled:pointer-events-none disabled:opacity-40"
                >
                  <ArrowLeft aria-hidden className="size-4" strokeWidth={2} /> Previous
                </button>
                <button
                  type="button"
                  onClick={() => select(done ? 0 : active + 1)}
                  className="bg-ink-black text-cream-canvas hover:bg-ironwood inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[14px] font-semibold whitespace-nowrap transition-colors duration-200 active:translate-y-px"
                >
                  {done ? "Start again" : `Next: ${stages[active + 1].name}`}
                  <ArrowRight aria-hidden className="size-4" strokeWidth={2} />
                </button>
              </div>
            </article>

            <aside
              aria-label={lifecycle.trailTitle}
              className="bg-paper-white border-hairline rounded-images flex flex-col border p-5 sm:p-7 lg:col-span-5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-ink-black text-[15px] font-semibold">{lifecycle.trailTitle}</p>
                <p className="text-ash tabular text-[13px]">
                  {active + 1} / {stages.length}
                </p>
              </div>
              <ol className="mt-5 grid flex-1 content-start">
                {stages.map((s, i) => {
                  const written = i <= active;
                  return (
                    <li key={s.name} className="relative flex gap-3 pb-4 last:pb-0">
                      {i < LAST && (
                        <span
                          aria-hidden
                          className={cn(
                            "absolute top-6 bottom-0 left-[8.5px] w-px",
                            i < active ? "bg-ink-black" : "bg-hairline"
                          )}
                        />
                      )}
                      {written ? (
                        <Tick className="relative mt-0.5" />
                      ) : (
                        <span
                          aria-hidden
                          className="border-bone bg-paper-white relative mt-0.5 size-[18px] shrink-0 rounded-full border border-dashed"
                        />
                      )}
                      <div className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
                        <span
                          className={cn(
                            "text-[14px]",
                            written ? "text-ink-black font-medium" : "text-smoke",
                            i === active && "font-semibold"
                          )}
                        >
                          {written ? s.entry : s.name}
                        </span>
                        <span
                          className={cn(
                            "tabular shrink-0 text-[12px]",
                            written ? "text-ash" : "text-smoke"
                          )}
                        >
                          {written ? s.when : "—"}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <p
                className={cn(
                  "rounded-images mt-6 flex items-start gap-2 px-3 py-2.5 text-[14px] font-medium transition-colors duration-300",
                  done ? "bg-flame-wash text-flame-ink" : "bg-cream-canvas text-warm-stone"
                )}
              >
                {done ? (
                  <>
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0" strokeWidth={3} />
                    {lifecycle.trailDone}
                  </>
                ) : (
                  "Each step writes its own entry. Nobody assembles this later."
                )}
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Timeline: the seven stages as one still line, each with its one-line note. */
export function LifecycleTimeline() {
  return (
    <section
      id="lifecycle"
      aria-labelledby="lifecycle-title"
      className="bg-paper-white border-hairline border-y py-20 sm:py-28"
    >
      <div className="container-page">
        <SectionHead
          id="lifecycle-title"
          eyebrow={lifecycle.eyebrow}
          title={lifecycle.title}
          body={lifecycle.body}
        />
        <ol className="relative mt-16 grid grid-cols-[minmax(0,1fr)] gap-y-6 lg:grid-cols-7 lg:gap-x-4">
          <span
            aria-hidden
            className="bg-ink-black absolute top-[15px] left-[15px] h-[calc(100%-30px)] w-[3px] rounded-full lg:top-[15px] lg:right-[7%] lg:left-[7%] lg:h-[3px] lg:w-auto"
          />
          {stages.map((s, i) => (
            <li
              key={s.name}
              className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center"
            >
              <span
                aria-hidden
                className={cn(
                  "tabular relative inline-flex size-[33px] shrink-0 items-center justify-center rounded-full border-[3px] text-[13px] font-semibold",
                  i === LAST
                    ? "bg-harvest-flame text-on-brand border-harvest-flame"
                    : "bg-paper-white text-ink-black border-ink-black"
                )}
              >
                {i === LAST ? <Check className="size-4" strokeWidth={3} /> : i + 1}
              </span>
              <div className="lg:mt-4">
                <p className="text-ink-black text-heading-sm font-semibold">{s.name}</p>
                <p className="text-warm-stone mt-1 text-[14px]">{s.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
