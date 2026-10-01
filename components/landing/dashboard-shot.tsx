import Image from "next/image";
import { cn } from "@/lib/utils";

export const dashboardAlt =
  "Sajjeel Labs dashboard: open incidents, tasks, findings, overdue training and assets needing attention, above a monthly chart of incident report types by location.";

/** The real product dashboard in a framed window. `chrome` adds a slim browser bar on top. */
export function DashboardShot({
  className,
  chrome = false,
  priority = true,
  sizes = "(min-width: 1248px) 1200px, 100vw",
  imageClassName
}: {
  className?: string;
  chrome?: boolean;
  priority?: boolean;
  sizes?: string;
  imageClassName?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-cards border-hairline bg-paper-white overflow-hidden border shadow-[0_40px_80px_-30px_rgba(29,30,28,0.28)]",
        className
      )}
    >
      {chrome && (
        <div className="border-hairline bg-cream-canvas flex h-9 items-center gap-1.5 border-b px-4">
          {[0, 1, 2].map((i) => (
            <span key={i} aria-hidden className="bg-bone size-2.5 rounded-full" />
          ))}
          <span className="text-ash border-hairline bg-paper-white mx-auto hidden h-6 items-center rounded-full border px-4 text-[12px] sm:inline-flex">
            Sajjeel Labs · Overview
          </span>
          <span aria-hidden className="hidden w-[42px] sm:block" />
        </div>
      )}
      <Image
        src="/images/dashboard-overview.jpg"
        alt={dashboardAlt}
        width={1696}
        height={1040}
        priority={priority}
        sizes={sizes}
        className={cn("block h-auto w-full", imageClassName)}
      />
    </div>
  );
}
