import { Cta, TextLink } from "@/components/site/cta";
import { finalCta, gapAssessment } from "@/content/landing";
import { routes } from "@/lib/brand";
import { Reveal } from "@/components/motion/reveal";

export function FinalCtaCard() {
  return (
    <section aria-labelledby="final-title" className="py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="bg-paper-white border-hairline rounded-cards relative isolate overflow-hidden border px-6 py-16 text-center shadow-lg sm:px-12 sm:py-20">
          {/* DESIGN.md hero wash, reused once at the close. */}
          <div
            aria-hidden
            className="absolute inset-x-0 -bottom-1/2 -z-10 h-full bg-[radial-gradient(60%_60%_at_50%_100%,var(--color-marigold-glow),transparent_70%)]"
          />
          <h2
            id="final-title"
            className="text-ink-black text-heading-lg sm:text-section lg:text-display mx-auto max-w-[18ch] font-medium"
          >
            {finalCta.title}
          </h2>
          <p className="text-warm-stone text-lede mx-auto mt-5 max-w-[52ch]">{finalCta.body}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-x-6 gap-y-4 sm:flex-row">
            <Cta href={routes.gapAssessment} arrow>
              {gapAssessment.label}
            </Cta>
            <TextLink href={finalCta.secondary.href}>{finalCta.secondary.label}</TextLink>
          </div>
          <p className="text-warm-stone text-caption mt-3">{gapAssessment.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** Inline: question on the left, actions on the right, one ruled band. */
export function FinalCtaInline() {
  return (
    <section aria-labelledby="final-title" className="py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="border-ink-black grid grid-cols-[minmax(0,1fr)] gap-8 border-y-2 py-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
            <h2
              id="final-title"
              className="text-ink-black text-heading-lg sm:text-section lg:text-display font-medium"
            >
              {finalCta.title}
            </h2>
            <p className="text-warm-stone text-lede mt-4 max-w-[52ch]">{finalCta.body}</p>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <div className="flex flex-col items-start gap-x-6 gap-y-4 sm:flex-row sm:items-center">
              <Cta href={routes.gapAssessment} arrow>
                {gapAssessment.label}
              </Cta>
              <TextLink href={finalCta.secondary.href}>{finalCta.secondary.label}</TextLink>
            </div>
            <p className="text-warm-stone text-caption mt-3">{gapAssessment.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
