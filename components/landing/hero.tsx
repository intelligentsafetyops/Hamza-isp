import Image from "next/image";
import { Chip, Initials, ProductCard, Tick } from "@/components/landing/ui-bits";
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

function HiracCard({ className }: { className?: string }) {
  return (
    <ProductCard className={className}>
      <div className="flex items-center justify-between gap-2">
        <Chip tone="ink">HIRAC</Chip>
        <span className="text-ash text-[12px]">Rev 4 · Published</span>
      </div>
      <p className="text-ink-black mt-3 text-[15px] leading-snug font-semibold">
        Working at height, pump house mezzanine
      </p>
      <div className="mt-3 flex -space-x-1">
        {["AK", "JR", "SM", "TD", "LN", "PO"].map((n) => (
          <Initials key={n} name={n} />
        ))}
      </div>
      <p className="text-ironwood mt-3 flex items-center gap-2 text-[13px] font-medium">
        <Tick /> Signed off by 6 workers
      </p>
    </ProductCard>
  );
}

function FindingCard({ className }: { className?: string }) {
  return (
    <ProductCard className={className}>
      <div className="flex items-center justify-between gap-2">
        <Chip tone="flame">Finding raised</Chip>
        <span className="text-ash tabular text-[12px]">Pump-04</span>
      </div>
      <p className="text-ink-black mt-3 text-[15px] leading-snug font-semibold">
        Guard missing on drive coupling
      </p>
      <dl className="text-ironwood mt-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 text-[13px]">
        <dt className="text-ash">From</dt>
        <dd className="truncate">Monthly pump house inspection</dd>
        <dt className="text-ash">Owner</dt>
        <dd>Maintenance · due Fri</dd>
      </dl>
    </ProductCard>
  );
}

function CapaCard({ className }: { className?: string }) {
  return (
    <ProductCard className={className}>
      <div className="flex items-center justify-between gap-2">
        <Chip tone="ink">CAPA</Chip>
        <span className="text-ash text-[12px]">3 of 3</span>
      </div>
      <ul className="mt-3 grid gap-2">
        {["CAPA-118", "CAPA-119", "CAPA-120"].map((id) => (
          <li key={id} className="flex items-center justify-between text-[13px]">
            <span className="text-ink-black tabular font-medium">{id}</span>
            <span className="text-ironwood flex items-center gap-1.5">
              <Tick className="size-4" /> Verified
            </span>
          </li>
        ))}
      </ul>
      <p className="text-ink-black border-hairline mt-3 border-t pt-3 text-[13px] font-semibold">
        3 CAPAs verified closed
      </p>
    </ProductCard>
  );
}

function SceneOrPhoto() {
  return hero.photo ? (
    <Image
      src={hero.photo.src}
      alt={hero.photo.alt}
      fill
      priority
      sizes="(min-width: 1024px) 1200px, 100vw"
      className="object-cover"
    />
  ) : (
    <SiteScene />
  );
}

const caption = (
  <figcaption className="sr-only">
    A site scene with three Sajjeel Labs records: a HIRAC signed off by six workers, a finding
    raised on Pump-04, and three corrective actions verified closed.
  </figcaption>
);

/* ---------- variants ---------- */

/** Default: copy left, site scene right with the three records floating over it. */
export function HeroSplit() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="container-page grid grid-cols-[minmax(0,1fr)] items-center gap-12 pt-10 pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-28">
        <div className="lg:col-span-6">
          <HeroCopy />
        </div>
        <div className="lg:col-span-6">
          <figure className="relative mx-auto max-w-[560px] lg:mr-0">
            <div className="rounded-cards border-hairline relative aspect-[4/3] overflow-hidden border md:aspect-square">
              <SceneOrPhoto />
            </div>
            {/* Desktop: cards float over the scene. Mobile: they sit in flow beneath it. */}
            <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2 md:contents">
              <HiracCard className="drift md:absolute md:top-10 md:-left-10 md:w-[262px]" />
              <FindingCard className="drift [--drift-delay:-2.4s] md:absolute md:top-[30%] md:-right-8 md:w-[272px]" />
              <CapaCard className="drift [--drift-delay:-4.8s] sm:col-span-2 md:absolute md:bottom-8 md:-left-6 md:w-[252px]" />
            </div>
            {caption}
          </figure>
        </div>
      </div>
    </section>
  );
}

/** Centered: DESIGN.md's documented hero — centred headline, wide scene below, cards across it. */
export function HeroCentered() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="container-page pt-12 pb-20 sm:pt-20 lg:pb-28">
        <HeroCopy align="center" />
        <figure className="relative mt-14 lg:mt-16">
          <div className="rounded-cards border-hairline relative aspect-[4/3] overflow-hidden border sm:aspect-[16/8] lg:aspect-[16/6]">
            <SceneOrPhoto />
          </div>
          <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-3 lg:absolute lg:inset-x-8 lg:-bottom-10 lg:mt-0 lg:items-end lg:gap-5">
            <HiracCard className="drift" />
            <FindingCard className="drift [--drift-delay:-2.4s]" />
            <CapaCard className="drift [--drift-delay:-4.8s]" />
          </div>
          {caption}
        </figure>
      </div>
    </section>
  );
}

/** Text + cards: no scene; the headline leads and the three records sit in a row beneath. */
export function HeroStacked() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="container-page pt-12 pb-20 sm:pt-20 lg:pb-28">
        <div className="max-w-[760px]">
          <HeroCopy />
        </div>
        <figure className="bg-marigold-glow/40 border-hairline rounded-cards mt-14 border p-4 sm:p-6 lg:mt-16">
          <div className="grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-3 sm:items-start lg:gap-5">
            <HiracCard />
            <FindingCard />
            <CapaCard />
          </div>
          {caption}
        </figure>
      </div>
    </section>
  );
}

/** Hand-built line scene of a pump house — the fallback until a real site photo is supplied. */
function SiteScene() {
  return (
    <svg
      viewBox="0 0 560 560"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      aria-hidden
    >
      <defs>
        <radialGradient id="wash-a" cx="78%" cy="18%" r="70%">
          <stop offset="0" stopColor="var(--color-harvest-flame)" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="var(--color-marigold-glow)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--color-cream-canvas)" stopOpacity="1" />
        </radialGradient>
        <radialGradient id="wash-b" cx="10%" cy="95%" r="55%">
          <stop offset="0" stopColor="var(--color-marigold-glow)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--color-marigold-glow)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="560" height="560" fill="url(#wash-a)" />
      <rect width="560" height="560" fill="url(#wash-b)" />

      <g
        fill="none"
        stroke="var(--color-ink-black)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.78"
      >
        {/* pipe rack */}
        <path d="M-10 168 H570 M-10 196 H570" />
        {[60, 190, 320, 450].map((x) => (
          <rect key={x} x={x} y="160" width="10" height="44" rx="2" />
        ))}
        <path d="M120 204 V470 M136 204 V470" />
        {[240, 290, 340, 390, 440].map((y) => (
          <path key={y} d={`M120 ${y} H136`} />
        ))}

        {/* discharge line into the rack, gauge on it */}
        <path d="M432 196 V300 M448 196 V300" />
        <circle cx="474" cy="262" r="18" />
        <path d="M466 262 L478 254" />
        <path d="M448 262 H456" />

        {/* skid */}
        <rect x="200" y="452" width="290" height="22" rx="3" />
        <path d="M212 474 V490 M478 474 V490 M180 490 H520" />

        {/* motor */}
        <rect x="214" y="372" width="118" height="80" rx="10" />
        {[236, 256, 276, 296, 316].map((x) => (
          <path key={x} d={`M${x} 380 V444`} opacity="0.5" />
        ))}

        {/* volute + suction */}
        <path d="M400 300 V340" />
        <circle cx="440" cy="392" r="46" />
        <circle cx="440" cy="392" r="14" />
        <path d="M486 392 H560" />

        {/* tag plate */}
        <rect x="230" y="328" width="84" height="26" rx="4" fill="var(--color-paper-white)" />
      </g>
      <text
        x="272"
        y="346"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        letterSpacing="1.5"
        fill="var(--color-ink-black)"
        fontFamily="var(--font-muotoweb)"
      >
        PUMP-04
      </text>

      {/* the open finding: missing coupling guard, the one orange mark */}
      <rect
        x="336"
        y="388"
        width="52"
        height="44"
        rx="8"
        fill="none"
        stroke="var(--color-ink-black)"
        strokeOpacity="0.78"
        strokeWidth="2"
      />
      <circle
        cx="362"
        cy="410"
        r="40"
        fill="none"
        stroke="var(--color-harvest-flame)"
        strokeWidth="3"
        strokeDasharray="6 7"
      />
    </svg>
  );
}
