import { cn } from "@/lib/utils";

/**
 * Sajjeel Labs mark: an "S" drawn as one continuous line that resolves into a node — the
 * page's rope idea in miniature (a tangled record becoming one provable line).
 * Keep paths in sync with public/brand/sajjeel-labs-mark.svg and app/icon.svg.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("size-9 shrink-0", className)} aria-hidden>
      <rect width="40" height="40" rx="11" fill="var(--color-ink-black)" />
      <path
        d="M24.5 11.5 H17 a5.25 5.25 0 0 0 0 10.5 h6 a5.25 5.25 0 0 1 0 10.5 H11"
        fill="none"
        stroke="var(--color-cream-canvas)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="30" cy="11.5" r="3.6" fill="var(--color-harvest-flame)" />
    </svg>
  );
}

/** Mark + wordmark. `tone="inverse"` is for dark surfaces. */
export function Logo({
  className,
  size = "md",
  tone = "default"
}: {
  className?: string;
  size?: "md" | "lg";
  tone?: "default" | "inverse";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={size === "lg" ? "size-11" : "size-9"} />
      <span
        className={cn(
          "leading-none font-semibold tracking-[-0.01em] whitespace-nowrap",
          size === "lg" ? "text-[24px]" : "text-[20px]",
          tone === "inverse" ? "text-cream-canvas" : "text-ink-black"
        )}
      >
        Sajjeel
        <span className={cn("ml-[0.28em] font-medium", tone === "inverse" ? "text-smoke" : "text-warm-stone")}>
          Labs
        </span>
      </span>
    </span>
  );
}
