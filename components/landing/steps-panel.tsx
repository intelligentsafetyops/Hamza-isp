"use client";

import { Check } from "lucide-react";
import { useRovingTabs } from "@/components/landing/use-roving-tabs";
import { TourScreen } from "@/components/product/tour-screens";
import { howItWorks } from "@/content/landing";
import { cn } from "@/lib/utils";

const ids = howItWorks.steps.map((s) => s.key);
const PANEL = "steps-panel";

/** Pill tabs over a sunken panel: step text left, the product screen for that step right. */
export function StepsPanel() {
  const { active, tabProps } = useRovingTabs(ids, "horizontal");
  const i = ids.indexOf(active);
  const step = howItWorks.steps[i];

  return (
    <div className="mt-10">
      <div role="tablist" aria-label="Steps" className="flex flex-wrap justify-center gap-2">
        {howItWorks.steps.map((s, idx) => (
          <button
            key={s.key}
            {...tabProps(s.key, idx, PANEL)}
            className={cn(
              "h-9 rounded-full border px-4 text-[14px] whitespace-nowrap transition-[background-color,color,border-color] duration-200 ease-out active:scale-[0.97]",
              s.key === active
                ? "bg-band text-band-ink border-transparent"
                : "border-hairline text-ink hover:border-hairline-strong hover:bg-surface"
            )}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div
        id={PANEL}
        role="tabpanel"
        aria-labelledby={`tab-${PANEL}-${active}`}
        className="border-hairline bg-sunken mt-8 grid grid-cols-[minmax(0,1fr)] gap-8 rounded-2xl border p-6 sm:p-10 lg:grid-cols-12 lg:items-center"
      >
        <div className="lg:col-span-5">
          <span className="text-muted-ink tabular text-body">
            {i + 1} of {ids.length}
          </span>
          <h3 className="text-ink sm:text-heading mt-2 text-[1.5rem] leading-[1.25]">
            {step.title}
          </h3>
          <p className="text-muted-ink text-body-lg mt-3">{step.body}</p>
          <ul className="mt-6 space-y-2.5">
            {step.points.map((p) => (
              <li key={p} className="text-ink text-body flex items-start gap-2.5">
                <Check
                  aria-hidden
                  className="text-brand-graphic mt-1 size-4 shrink-0"
                  strokeWidth={1.75}
                />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div
          aria-hidden
          translate="no"
          className="border-hairline bg-surface shadow-card overflow-hidden rounded-[10px] border lg:col-span-7"
        >
          <TourScreen step={step.key} />
        </div>
      </div>
    </div>
  );
}
