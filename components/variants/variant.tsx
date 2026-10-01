"use client";

import { ChevronDown, LayoutTemplate } from "lucide-react";
import { prototypeEnabled, sectionVariants, type SectionId, type VariantOf } from "@/lib/sections";
import { updatePrototypeLayout, usePrototypeLayout } from "./store";

/**
 * Renders one layout variant of a section. Every variant is rendered on the server and passed
 * in as a node; this only picks which one to show, plus (in prototype mode) a small dropdown
 * pinned to the section's top-right corner.
 */
export function Variant<S extends SectionId>({
  section,
  options
}: {
  section: S;
  options: Record<VariantOf<S>, React.ReactNode>;
}) {
  const { variants, switchers } = usePrototypeLayout();
  const config = sectionVariants[section];
  const fallback = config.options[0].id as VariantOf<S>;
  const chosen = (prototypeEnabled ? variants[section] : undefined) as VariantOf<S> | undefined;
  const id = chosen && chosen in options ? chosen : fallback;

  return (
    <div className="relative" data-section={section} data-variant={id}>
      {prototypeEnabled && switchers && (
        // Sticky inside a full-height overlay: stays just under the header while the section is in view.
        <div className="pointer-events-none absolute inset-0 z-30">
          <div className="sticky top-[calc(var(--header-height)+12px)] flex justify-end px-4 pt-3 sm:px-6">
            <label className="bg-ink-black text-cream-canvas pointer-events-auto inline-flex h-8 items-center gap-1.5 rounded-full pr-2 pl-2.5 text-[12px] font-semibold shadow-[0_8px_20px_-10px_rgba(29,30,28,0.6)]">
              <LayoutTemplate aria-hidden className="size-3.5 opacity-70" strokeWidth={2} />
              <span className="sr-only">{config.label} layout</span>
              <span aria-hidden className="text-smoke hidden sm:inline">
                {config.label}:
              </span>
              <span className="relative inline-flex items-center">
                <select
                  value={id}
                  onChange={(e) =>
                    updatePrototypeLayout({ variants: { [section]: e.target.value } })
                  }
                  className="cursor-pointer appearance-none bg-transparent pr-5 font-semibold outline-none"
                >
                  {config.options.map((o) => (
                    <option key={o.id} value={o.id} className="text-ink-black">
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden
                  className="pointer-events-none absolute right-0 size-3.5"
                  strokeWidth={2.25}
                />
              </span>
            </label>
          </div>
        </div>
      )}
      {options[id]}
    </div>
  );
}
