import { Chip } from "@/components/landing/ui-bits";
import { SectionHead } from "@/components/site/section-head";
import { proof } from "@/content/landing";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

function initials(name: string) {
  return name
    .replace(".", "")
    .split(" ")
    .map((p) => p[0])
    .join("");
}

function PlaceholderMarker() {
  if (!proof.placeholder || process.env.NODE_ENV === "production") return null;
  return (
    <p className="text-flame-ink mt-4 text-[13px] font-semibold">
      Dev only: placeholder quotes from the content draft. Swap in published testimonials.
    </p>
  );
}

export function ProofFeatured() {
  const [lead, ...rest] = proof.quotes;

  return (
    <section id="proof" aria-labelledby="proof-title" className="pb-20 sm:pb-28">
      <div className="container-page">
        <SectionHead id="proof-title" title={proof.title} body={proof.sub} align="split" />
        <PlaceholderMarker />

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-12">
          <Reveal
            as="figure"
            className="bg-ink-black text-cream-canvas rounded-cards flex flex-col justify-between p-8 sm:p-10 lg:col-span-7"
          >
            <div>
              <Chip tone="flame">{lead.tag}</Chip>
              <blockquote className="text-heading sm:text-heading-lg mt-8 font-medium lg:text-[36px] lg:leading-[1.22]">
                <p>“{lead.quote}”</p>
              </blockquote>
            </div>
            <Person name={lead.name} role={lead.role} dark />
          </Reveal>

          <div className="grid gap-4 lg:col-span-5">
            {rest.map((q, i) => (
              <Reveal
                as="figure"
                index={i + 1}
                key={q.name}
                className="bg-paper-white border-hairline rounded-cards flex flex-col justify-between border p-6 sm:p-8"
              >
                <div>
                  <Chip>{q.tag}</Chip>
                  <blockquote className="text-ink-black text-heading-sm mt-5 font-medium">
                    <p>“{q.quote}”</p>
                  </blockquote>
                </div>
                <Person name={q.name} role={q.role} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Person({ name, role, dark }: { name: string; role: string; dark?: boolean }) {
  return (
    <figcaption className="mt-8 flex items-center gap-3">
      <span
        aria-hidden
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-full text-[13px] font-semibold",
          dark ? "bg-cream-canvas text-ink-black" : "bg-marigold-glow text-ink-black"
        )}
      >
        {initials(name)}
      </span>
      <span>
        <span className={cn("block font-semibold", dark ? "text-cream-canvas" : "text-ink-black")}>
          {name}
        </span>
        <span className={cn("block text-[14px]", dark ? "text-smoke" : "text-warm-stone")}>
          {role}
        </span>
      </span>
    </figcaption>
  );
}

/** Three up: equal cards, one per role. */
export function ProofGrid() {
  return (
    <section id="proof" aria-labelledby="proof-title" className="pb-20 sm:pb-28">
      <div className="container-page">
        <SectionHead id="proof-title" title={proof.title} body={proof.sub} align="split" />
        <PlaceholderMarker />
        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-3">
          {proof.quotes.map((q, i) => (
            <Reveal
              as="figure"
              index={i}
              key={q.name}
              className="bg-paper-white border-hairline rounded-cards flex flex-col justify-between border p-6 sm:p-8"
            >
              <div>
                <Chip>{q.tag}</Chip>
                <blockquote className="text-ink-black text-heading-sm mt-5 font-medium">
                  <p>“{q.quote}”</p>
                </blockquote>
              </div>
              <Person name={q.name} role={q.role} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Single quote: the audit-defensibility quote alone, large and centred. */
export function ProofSingle() {
  const lead = proof.quotes[0];
  return (
    <section id="proof" aria-labelledby="proof-title" className="pb-20 sm:pb-28">
      <div className="container-page">
        <SectionHead id="proof-title" title={proof.title} />
        <div className="text-center">
          <PlaceholderMarker />
        </div>
        <Reveal as="figure" className="mx-auto mt-14 max-w-[900px] text-center">
          <Chip tone="flame">{lead.tag}</Chip>
          <blockquote className="text-ink-black text-heading-lg mt-8 font-medium sm:text-[36px] sm:leading-[1.25]">
            <p>“{lead.quote}”</p>
          </blockquote>
          <figcaption className="text-warm-stone mt-8">
            <span className="text-ink-black font-semibold">{lead.name}</span> · {lead.role}
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
