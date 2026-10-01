import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  body?: string;
  /** Extra content under the body (a link, a note). */
  aside?: React.ReactNode;
  /**
   * center — the argumentative moments (lifecycle, close).
   * left — a plain left column.
   * split — title left, body right, bottom-aligned; for sections that open onto wide content.
   */
  align?: "center" | "left" | "split";
  className?: string;
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-flame-ink text-[14px] font-semibold tracking-[0.06em] uppercase">
      {children}
    </p>
  );
}

const titleClass = "text-ink-black text-heading-lg sm:text-section lg:text-display font-medium";

/** DESIGN.md "Section Heading": orange uppercase eyebrow stacked above a sans title. */
export function SectionHead({
  id,
  eyebrow,
  title,
  body,
  aside,
  align = "center",
  className
}: Props) {
  if (align === "split") {
    return (
      <Reveal
        className={cn(
          "grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-12 lg:items-end lg:gap-10",
          className
        )}
      >
        <div className="lg:col-span-7">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 id={id} className={cn(titleClass, "mt-3")}>
            {title}
          </h2>
        </div>
        {(body || aside) && (
          <div className="lg:col-span-5 lg:pb-2">
            {body && <p className="text-warm-stone text-lede">{body}</p>}
            {aside && <div className="mt-4">{aside}</div>}
          </div>
        )}
      </Reveal>
    );
  }

  return (
    <Reveal
      className={cn(
        "max-w-[720px]",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className={cn(titleClass, "mt-3")}>
        {title}
      </h2>
      {body && <p className="text-warm-stone text-lede mt-5">{body}</p>}
      {aside && <div className="mt-5">{aside}</div>}
    </Reveal>
  );
}
