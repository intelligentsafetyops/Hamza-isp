"use client";

import { useRef, useState } from "react";
import { ModuleIcon } from "@/components/landing/module-icons";
import { PlatformHead, previews } from "@/components/landing/platform-wall";
import { platform } from "@/content/landing";
import { cn } from "@/lib/utils";

/** Tabs: one PDCA stage at a time — its flagship working on the left, its modules on the right. */
export function PlatformTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const g = platform.groups[active];
  const f = platform.featured[g.featured];
  const Preview = previews[g.featured];
  const last = platform.groups.length - 1;

  const onKeyDown = (e: React.KeyboardEvent) => {
    const next = e.key === "ArrowRight" ? active + 1 : e.key === "ArrowLeft" ? active - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const n = Math.max(0, Math.min(last, next));
    setActive(n);
    tabs.current[n]?.focus();
  };

  return (
    <section id="platform" aria-labelledby="platform-title" className="py-20 sm:py-28">
      <div className="container-page">
        <PlatformHead />

        <div
          role="tablist"
          aria-label="PDCA stages"
          onKeyDown={onKeyDown}
          className="border-hairline mt-14 flex [scrollbar-width:none] gap-1 overflow-x-auto border-b"
        >
          {platform.groups.map((s, i) => (
            <button
              key={s.stage}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`pdca-tab-${i}`}
              role="tab"
              aria-selected={i === active}
              aria-controls="pdca-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "relative -mb-px h-12 shrink-0 border-b-2 px-4 text-[16px] font-semibold transition-colors duration-200",
                i === active
                  ? "border-ink-black text-ink-black"
                  : "text-ash hover:text-ink-black border-transparent"
              )}
            >
              {s.stage}
            </button>
          ))}
        </div>

        <div
          id="pdca-panel"
          role="tabpanel"
          aria-labelledby={`pdca-tab-${active}`}
          className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-12 lg:gap-12"
        >
          <div
            key={active}
            className="animate-in fade-in-0 duration-300 motion-reduce:animate-none lg:col-span-7"
          >
            <p className="text-warm-stone">{g.line}</p>
            <div className="bg-paper-white border-hairline rounded-cards mt-5 border p-6 sm:p-8">
              <h3 className="text-ink-black text-heading flex items-center gap-2.5 font-medium">
                <ModuleIcon name={f.title} aria-hidden className="size-5" strokeWidth={1.75} />
                {f.title}
              </h3>
              <p className="text-warm-stone mt-2">{f.body}</p>
              <div className="mt-6">
                <Preview />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="text-ash text-[13px] font-semibold tracking-[0.06em] uppercase">
              Also in {g.stage}
            </p>
            <ul className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-x-6 sm:grid-cols-2 lg:grid-cols-1">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="border-hairline text-ink-black flex items-center gap-3 border-b py-3 text-[15px]"
                >
                  <ModuleIcon
                    name={item}
                    aria-hidden
                    className="text-warm-stone size-4 shrink-0"
                    strokeWidth={1.75}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
