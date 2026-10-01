import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Small pill label used inside product cards. `tone="flame"` is the one chromatic state. */
export function Chip({
  children,
  tone = "neutral",
  className
}: {
  children: React.ReactNode;
  tone?: "neutral" | "flame" | "ink";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-tags inline-flex h-6 items-center gap-1 px-2.5 text-[12px] font-semibold whitespace-nowrap",
        tone === "neutral" && "bg-cream-canvas text-ironwood border-hairline border",
        tone === "flame" && "bg-flame-wash text-flame-ink",
        tone === "ink" && "bg-ink-black text-cream-canvas",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Tick({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "bg-ink-black text-cream-canvas inline-flex size-[18px] shrink-0 items-center justify-center rounded-full",
        className
      )}
    >
      <Check className="size-3" strokeWidth={3} />
    </span>
  );
}

export function Initials({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "bg-marigold-glow text-ink-black ring-paper-white inline-flex size-7 items-center justify-center rounded-full text-[11px] font-semibold ring-2",
        className
      )}
    >
      {name}
    </span>
  );
}

/** White floating product surface — DESIGN.md "Dashboard Preview Card". */
export function ProductCard({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-paper-white border-hairline rounded-images shadow-card border p-4 text-left",
        className
      )}
    >
      {children}
    </div>
  );
}
