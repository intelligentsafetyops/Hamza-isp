import { Info } from "lucide-react";
import { Chip } from "@/components/landing/ui-bits";
import { SectionHead } from "@/components/site/section-head";
import { standards } from "@/content/landing";
import { Reveal } from "@/components/motion/reveal";

/** Head left; the frameworks as a ruled register on the right — read like a list, not badges. */
export function StandardsRegister() {
  return (
    <section
      id="standards"
      aria-labelledby="standards-title"
      className="bg-paper-white border-hairline border-y py-20 sm:py-28"
    >
      <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHead
            id="standards-title"
            eyebrow={standards.eyebrow}
            title={standards.title}
            body={standards.body}
            align="left"
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:self-end">
          <ul className="border-ink-black border-t-2">
            {standards.cards.map((c, i) => (
              <Reveal
                as="li"
                key={c.code}
                index={i}
                className="border-hairline grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 border-b py-6 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto]"
              >
                <h3 className="text-ink-black text-heading font-medium whitespace-nowrap">
                  {c.code}
                </h3>
                <p className="text-warm-stone order-last col-span-2 sm:order-none sm:col-span-1">
                  {c.name}
                </p>
                <Chip>{c.kind}</Chip>
              </Reveal>
            ))}
          </ul>
          <p className="text-ironwood mt-6 flex items-start gap-3 text-[15px]">
            <Info
              aria-hidden
              className="text-ink-black mt-0.5 size-5 shrink-0"
              strokeWidth={1.75}
            />
            {standards.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}

/** Cards: heading across the top, the four frameworks as equal cards, the caveat beneath. */
export function StandardsCards() {
  return (
    <section
      id="standards"
      aria-labelledby="standards-title"
      className="bg-paper-white border-hairline border-y py-20 sm:py-28"
    >
      <div className="container-page">
        <SectionHead
          id="standards-title"
          eyebrow={standards.eyebrow}
          title={standards.title}
          body={standards.body}
          align="split"
        />
        <ul className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {standards.cards.map((c, i) => (
            <Reveal
              as="li"
              key={c.code}
              index={i}
              className="bg-cream-canvas border-hairline rounded-cards flex min-h-[200px] flex-col justify-between border p-6"
            >
              <Chip className="w-max">{c.kind}</Chip>
              <div className="mt-10">
                <h3 className="text-ink-black text-heading-lg font-medium">{c.code}</h3>
                <p className="text-warm-stone mt-1">{c.name}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="text-ironwood mt-8 flex items-start gap-3 text-[15px]">
          <Info aria-hidden className="text-ink-black mt-0.5 size-5 shrink-0" strokeWidth={1.75} />
          {standards.footnote}
        </p>
      </div>
    </section>
  );
}
