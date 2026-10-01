import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-buttons font-semibold transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] active:translate-y-px select-none";

const variants = {
  // White label on the cobalt accent (--color-on-brand).
  primary:
    "bg-harvest-flame text-on-brand shadow-sm hover:bg-flame-hover hover:shadow-lg focus-visible:outline-flame-ink",
  secondary:
    "bg-paper-white text-ink-black border border-hairline hover:border-bone hover:shadow-card",
  quiet: "text-ink-black hover:text-flame-ink"
} as const;

const sizes = {
  md: "h-10 px-4 text-[15px]",
  lg: "h-12 px-6 text-body"
} as const;

type Props = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  arrow?: boolean;
};

export function Cta({
  href,
  children,
  variant = "primary",
  size = "lg",
  arrow,
  className,
  ...rest
}: Props) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      )}
    </Link>
  );
}

/** Orange text link with arrow — DESIGN.md "Ghost/Text Link", darkened for AA. */
export function TextLink({
  href,
  children,
  className
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group text-flame-ink inline-flex items-center gap-1.5 font-semibold whitespace-nowrap underline-offset-4 hover:underline",
        className
      )}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5"
        strokeWidth={2}
      />
    </Link>
  );
}
