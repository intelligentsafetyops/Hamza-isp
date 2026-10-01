import { DashboardShot } from "@/components/landing/dashboard-shot";
import { HeroBackdrop } from "@/components/landing/hero-3d/hero-backdrop";
import { Cta, TextLink } from "@/components/site/cta";
import { gapAssessment, hero } from "@/content/landing";
import { routes } from "@/lib/brand";
import { cn } from "@/lib/utils";

/* ---------- shared pieces ---------- */

export function HeroCopy({
  align = "left",
  display = "serif"
}: {
  align?: "left" | "center";
  /** serif: DESIGN.md hero serif. sans: the page sans, same voice as every section heading. */
  display?: "serif" | "sans";
}) {
  const center = align === "center";
  return (
    <div className={cn(center && "mx-auto max-w-[880px] text-center")}>
      <p className="text-flame-ink text-[14px] font-semibold tracking-[0.06em] uppercase">
        {hero.eyebrow}
      </p>
      <h1
        id="hero-title"
        className={cn(
          "text-ink-black lg:text-display-lg mt-5 text-[2.6rem] leading-[1.06] sm:text-[3.5rem]",
          display === "serif"
            ? "font-monarch font-normal tracking-[-0.01em]"
            : "font-medium tracking-[-0.01em]"
        )}
      >
        {hero.title}
      </h1>
      <p
        className={cn(
          "text-warm-stone text-lede sm:text-subheading mt-6 max-w-[54ch]",
          center && "mx-auto"
        )}
      >
        {hero.body}
      </p>
      <div
        className={cn(
          "mt-9 flex flex-col gap-x-6 gap-y-4 sm:flex-row sm:items-center",
          center ? "items-center sm:justify-center" : "items-start"
        )}
      >
        <Cta href={routes.gapAssessment} arrow>
          {gapAssessment.label}
        </Cta>
        <TextLink href={hero.secondary.href}>{hero.secondary.label}</TextLink>
      </div>
      <p className="text-warm-stone text-caption mt-3">{gapAssessment.note}</p>
    </div>
  );
}

const caption = (
  <figcaption className="text-ash mt-4 text-center text-[13px]">
    The Sajjeel Labs dashboard. Sample data.
  </figcaption>
);

/* ---------- variants ---------- */

/** Split: copy left, the dashboard right, tilted in perspective and bleeding off the edge. */
export function HeroSplit() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <HeroBackdrop className="[mask-image:radial-gradient(ellipse_70%_75%_at_72%_60%,black_30%,transparent)]" />
      <div className="container-page grid grid-cols-[minmax(0,1fr)] items-center gap-12 pt-10 pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-28">
        <div className="lg:col-span-5">
          <HeroCopy />
        </div>
        <figure className="lg:col-span-7 lg:[perspective:2000px]">
          <DashboardShot
            chrome
            sizes="(min-width: 1024px) 900px, 100vw"
            className="origin-left transition-transform duration-700 ease-[var(--ease-out)] motion-reduce:transition-none lg:w-[135%] lg:max-w-none lg:[transform:rotateY(-14deg)_rotateX(4deg)] lg:hover:[transform:rotateY(-6deg)_rotateX(2deg)]"
          />
          <figcaption className="text-ash mt-4 text-[13px] lg:hidden">
            The Sajjeel Labs dashboard. Sample data.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/** Centered: centred headline, the dashboard full width below, fading into the page. */
export function HeroCentered() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <HeroBackdrop className="[mask-image:linear-gradient(to_bottom,black,black_55%,transparent)]" />
      <div className="container-page pt-12 sm:pt-20">
        <HeroCopy align="center" />
      </div>
      <figure className="container-page relative mt-14 pb-16 sm:pb-20 lg:mt-16">
        <DashboardShot chrome imageClassName="max-sm:w-[175%] max-sm:max-w-none" />
        <div
          aria-hidden
          className="from-cream-canvas pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t to-transparent"
        />
        <figcaption className="text-ash relative -mt-6 text-center text-[13px]">
          The Sajjeel Labs dashboard. Sample data.
        </figcaption>
      </figure>
    </section>
  );
}

/** Text + dashboard: the headline leads, the dashboard sits in a tinted panel beneath. */
export function HeroStacked() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <HeroBackdrop className="[mask-image:linear-gradient(to_bottom,transparent_20%,black_60%,transparent)]" />
      <div className="container-page pt-12 pb-20 sm:pt-20 lg:pb-28">
        <div className="max-w-[760px]">
          <HeroCopy />
        </div>
        <figure className="bg-marigold-glow/40 border-hairline rounded-cards mt-14 border p-3 backdrop-blur-sm sm:p-6 lg:mt-16">
          <DashboardShot className="shadow-none" />
          {caption}
        </figure>
      </div>
    </section>
  );
}
