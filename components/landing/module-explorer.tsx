"use client";

import { icons } from "@/components/landing/icons";
import { useRovingTabs } from "@/components/landing/use-roving-tabs";
import { AssetsScreen, DocumentsScreen, TrainingScreen } from "@/components/product/module-screens";
import { TourScreen } from "@/components/product/tour-screens";
import { features } from "@/content/landing";
import { cn } from "@/lib/utils";

const ids = features.items.map((f) => f.icon);
type ModuleId = (typeof ids)[number];
const PANEL = "module-panel";

function Screen({ id }: { id: ModuleId }) {
  switch (id) {
    case "risk":
      return <TourScreen step="assess" />;
    case "inspections":
      return <TourScreen step="report" />;
    case "incidents":
      return <TourScreen step="verify" />;
    case "training":
      return <TrainingScreen />;
    case "documents":
      return <DocumentsScreen />;
    default:
      return <AssetsScreen />;
  }
}

/** Vertical module list (tabs) beside the product screen it selects. */
export function ModuleExplorer() {
  const { active, tabProps } = useRovingTabs(ids, "vertical");

  return (
    <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:items-start">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Modules"
        className="grid gap-1 lg:col-span-5 lg:col-start-8"
      >
        {features.items.map((item, i) => {
          const Icon = icons[item.icon];
          const selected = item.icon === active;
          return (
            <button
              key={item.title}
              {...tabProps(item.icon, i, PANEL)}
              className={cn(
                "rounded-[10px] border px-4 py-3.5 text-left transition-[background-color,border-color] duration-200 ease-out",
                selected
                  ? "border-hairline bg-surface shadow-card"
                  : "hover:bg-surface/60 border-transparent"
              )}
            >
              <span className="text-ink flex items-center gap-3 text-[15px] font-medium">
                <Icon
                  aria-hidden
                  className={cn(
                    "size-5 shrink-0",
                    selected ? "text-brand-graphic" : "text-muted-ink"
                  )}
                  strokeWidth={1.25}
                />
                {item.title}
              </span>
              <span className="text-muted-ink text-body mt-1 block pl-8">{item.body}</span>
            </button>
          );
        })}
      </div>

      <div
        id={PANEL}
        role="tabpanel"
        aria-labelledby={`tab-${PANEL}-${active}`}
        className="order-first lg:sticky lg:top-28 lg:order-none lg:col-span-7 lg:row-start-1"
      >
        <p className="sr-only">
          Sample screen for {features.items.find((f) => f.icon === active)?.title}.
        </p>
        <div
          aria-hidden
          translate="no"
          className="border-hairline bg-surface shadow-card min-h-[320px] overflow-hidden rounded-2xl border"
        >
          <Screen id={active} />
        </div>
      </div>
    </div>
  );
}
