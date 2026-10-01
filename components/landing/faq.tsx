import { Plus } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { TextLink } from "@/components/site/cta";
import { faq } from "@/content/landing";
import { routes } from "@/lib/brand";

export function FaqAccordion() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="bg-paper-white border-hairline border-y py-20 sm:py-28"
    >
      <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <p className="text-flame-ink text-[14px] font-semibold tracking-[0.06em] uppercase">
            {faq.eyebrow}
          </p>
          <h2
            id="faq-title"
            className="text-ink-black text-heading-lg sm:text-section mt-3 font-medium"
          >
            {faq.title}
          </h2>
          <p className="text-warm-stone mt-4">Something we haven’t answered?</p>
          <TextLink href={routes.demo} className="mt-2">
            Ask on a demo call
          </TextLink>
        </div>

        <AccordionPrimitive.Root type="single" collapsible className="lg:col-span-8">
          {faq.items.map((item, i) => (
            <AccordionPrimitive.Item
              key={item.q}
              value={`q${i}`}
              className="border-hairline border-b first:border-t"
            >
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger className="group text-ink-black hover:text-flame-ink flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-150">
                  <span className="text-heading-sm font-semibold">{item.q}</span>
                  <span
                    aria-hidden
                    className="border-hairline group-hover:border-bone group-data-[state=open]:bg-ink-black group-data-[state=open]:text-cream-canvas mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border transition-[background-color,color,border-color] duration-200"
                  >
                    <Plus
                      className="size-4 transition-transform duration-200 ease-[var(--ease-out)] group-data-[state=open]:rotate-45"
                      strokeWidth={2}
                    />
                  </span>
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                <p className="text-warm-stone text-lede max-w-[62ch] pr-12 pb-6">{item.a}</p>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  );
}

/** Open columns: every answer visible, two to a row, no clicking. */
export function FaqColumns() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="bg-paper-white border-hairline border-y py-20 sm:py-28"
    >
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-flame-ink text-[14px] font-semibold tracking-[0.06em] uppercase">
              {faq.eyebrow}
            </p>
            <h2
              id="faq-title"
              className="text-ink-black text-heading-lg sm:text-section mt-3 font-medium"
            >
              {faq.title}
            </h2>
          </div>
          <TextLink href={routes.demo}>Ask on a demo call</TextLink>
        </div>
        <dl className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-x-12 md:grid-cols-2">
          {faq.items.map((item) => (
            <div key={item.q} className="border-hairline border-t py-7">
              <dt className="text-ink-black text-heading-sm font-semibold">{item.q}</dt>
              <dd className="text-warm-stone mt-3">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
