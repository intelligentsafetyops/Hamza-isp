import { cn } from "@/lib/utils";
import { SectionHead } from "@/components/site/section-head";
import { maturity } from "@/content/landing";
import { Reveal } from "@/components/motion/reveal";

const ink = "var(--color-ink-black)";
const flame = "var(--color-harvest-flame)";

/** Three small line diagrams, one per situation. Ink strokes, one orange mark each. */
function Glyph({ id }: { id: string }) {
  const common = {
    fill: "none",
    stroke: ink,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };
  if (id === "spreadsheets")
    return (
      <svg viewBox="0 0 160 72" className="h-16 w-auto" aria-hidden>
        <rect x="2" y="8" width="60" height="56" rx="6" {...common} />
        <path
          d="M2 26 H62 M2 44 H62 M22 8 V64 M42 8 V64"
          {...common}
          strokeWidth={1.5}
          opacity={0.5}
        />
        <path d="M74 36 H96" {...common} />
        <path d="M90 30 L97 36 L90 42" {...common} />
        <rect
          x="108"
          y="14"
          width="50"
          height="44"
          rx="8"
          fill="var(--color-paper-white)"
          stroke={ink}
          strokeWidth={2}
        />
        <path d="M118 30 H148 M118 42 H138" {...common} />
        <circle cx="148" cy="42" r="4" fill={flame} />
      </svg>
    );
  if (id === "standardising")
    return (
      <svg viewBox="0 0 160 72" className="h-16 w-auto" aria-hidden>
        <path d="M4 18 H44 M4 36 H58 M4 54 H30" {...common} />
        <path d="M70 36 H92" {...common} />
        <path d="M86 30 L93 36 L86 42" {...common} />
        <path d="M106 18 H156 M106 36 H156" {...common} />
        <path d="M106 54 H156" fill="none" stroke={flame} strokeWidth={3} strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 160 72" className="h-16 w-auto" aria-hidden>
      <path
        d="M80 36 L26 14 M80 36 L26 58 M80 36 L134 14 M80 36 L134 58"
        {...common}
        strokeWidth={1.5}
      />
      {[
        [22, 14],
        [22, 58],
        [138, 14],
        [138, 58]
      ].map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x - 12}
          y={y - 9}
          width="24"
          height="18"
          rx="4"
          fill="var(--color-paper-white)"
          stroke={ink}
          strokeWidth={2}
        />
      ))}
      <circle cx="80" cy="36" r="12" fill={flame} stroke={ink} strokeWidth={2} />
    </svg>
  );
}

export function MaturityStepped() {
  return (
    <section id="maturity" aria-labelledby="maturity-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHead id="maturity-title" title={maturity.title} body={maturity.sub} align="left" />

        {/* Stepped like a staircase on wide screens: each stage sits a step higher than the last. */}
        <ol className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-3 md:items-start">
          {maturity.columns.map((c, i) => (
            <Reveal
              as="li"
              index={i}
              key={c.id}
              className="bg-paper-white border-hairline rounded-cards flex flex-col border p-6 sm:p-8 md:mt-(--step)"
              style={{ ["--step" as string]: `${(2 - i) * 2.5}rem` }}
            >
              <div className="flex items-center gap-1.5" aria-hidden>
                {[0, 1, 2].map((n) => (
                  <span
                    key={n}
                    className={cn(
                      "h-1.5 flex-1 rounded-full",
                      n <= i ? (n === i ? "bg-harvest-flame" : "bg-ink-black") : "bg-hairline"
                    )}
                  />
                ))}
              </div>
              <div className="mt-8">
                <Glyph id={c.id} />
              </div>
              <h3 className="text-ink-black text-heading mt-6 font-semibold">{c.title}</h3>
              <p className="text-warm-stone mt-3 flex-1">{c.body}</p>
              <p className="border-hairline text-ironwood mt-6 border-t pt-4 text-[14px]">
                <span className="text-ash">Usually starts with: </span>
                <span className="font-semibold">{c.trigger.toLowerCase()}</span>
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** List: heading on the left, the three situations as ruled rows on the right. */
export function MaturityList() {
  return (
    <section id="maturity" aria-labelledby="maturity-title" className="py-20 sm:py-28">
      <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <SectionHead
            id="maturity-title"
            title={maturity.title}
            body={maturity.sub}
            align="left"
          />
        </div>
        <ol className="border-ink-black border-t-2 lg:col-span-7">
          {maturity.columns.map((c, i) => (
            <Reveal
              as="li"
              key={c.id}
              index={i}
              className="border-hairline grid grid-cols-[minmax(0,1fr)] gap-4 border-b py-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8"
            >
              <div>
                <p className="text-flame-ink text-[13px] font-semibold">Stage {i + 1}</p>
                <h3 className="text-ink-black text-heading mt-2 font-semibold">{c.title}</h3>
                <p className="text-warm-stone mt-2">{c.body}</p>
              </div>
              <div className="order-first sm:order-none">
                <Glyph id={c.id} />
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
