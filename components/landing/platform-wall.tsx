import { RefreshCw } from "lucide-react";
import { ModuleIcon } from "@/components/landing/module-icons";
import { Chip, Tick } from "@/components/landing/ui-bits";
import { TextLink } from "@/components/site/cta";
import { SectionHead } from "@/components/site/section-head";
import { platform } from "@/content/landing";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/* ---------- featured previews (illustrative product UI, not screenshots) ---------- */

// 5×5 likelihood × severity; shade by score band.
function band(score: number) {
  if (score >= 15) return "bg-harvest-flame";
  if (score >= 8) return "bg-flame-hover/45";
  if (score >= 4) return "bg-marigold-glow";
  return "bg-cream-canvas";
}

function HiracPreview() {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <div
        className="grid shrink-0 grid-cols-5 gap-1"
        role="img"
        aria-label="5 by 5 risk matrix: initial risk 16, residual risk 4 after controls"
      >
        {Array.from({ length: 25 }, (_, n) => {
          const row = 5 - Math.floor(n / 5); // likelihood, top = 5
          const col = (n % 5) + 1; // severity
          const score = row * col;
          const initial = row === 4 && col === 4;
          const residual = row === 2 && col === 2;
          return (
            <span
              key={n}
              className={cn(
                "border-hairline relative flex size-6 items-center justify-center rounded-[5px] border text-[10px] sm:size-7",
                band(score)
              )}
            >
              {initial && <span className="bg-ink-black size-3 rounded-full" />}
              {residual && <span className="border-ink-black size-3 rounded-full border-2" />}
            </span>
          );
        })}
      </div>
      <dl className="text-[13px]">
        <div className="flex items-center gap-2">
          <span aria-hidden className="bg-ink-black size-2.5 rounded-full" />
          <dt className="text-ash">Initial</dt>
          <dd className="text-ink-black tabular font-semibold">16</dd>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span aria-hidden className="border-ink-black size-2.5 rounded-full border-2" />
          <dt className="text-ash">Residual</dt>
          <dd className="text-ink-black tabular font-semibold">4</dd>
        </div>
      </dl>
    </div>
  );
}

function InspectionPreview() {
  const rows = [
    { item: "Lockout points labelled", pass: true },
    { item: "Coupling guard in place", pass: false },
    { item: "Emergency stop tested", pass: true }
  ];
  return (
    <ul className="grid grid-cols-[minmax(0,1fr)] gap-2">
      {rows.map((r) => (
        <li
          key={r.item}
          className={cn(
            "flex items-center justify-between gap-3 rounded-[10px] border px-3 py-2 text-[13px]",
            r.pass ? "border-hairline" : "border-harvest-flame bg-flame-wash/60"
          )}
        >
          <span className="text-ink-black min-w-0 font-medium">{r.item}</span>
          {r.pass ? (
            <span className="text-ironwood flex shrink-0 items-center gap-1.5">
              <Tick className="size-4" /> Pass
            </span>
          ) : (
            <Chip tone="flame" className="shrink-0">
              Finding F-031
            </Chip>
          )}
        </li>
      ))}
    </ul>
  );
}

function IncidentPreview() {
  const steps = ["Report", "RCA", "CAPA", "Closed"];
  return (
    <div>
      <ol className="grid grid-cols-4 gap-1.5">
        {steps.map((s, i) => (
          <li key={s} className="min-w-0">
            <span
              aria-hidden
              className={cn(
                "block h-1.5 rounded-full",
                i === steps.length - 1 ? "bg-harvest-flame" : "bg-ink-black"
              )}
            />
            <span className="text-ink-black mt-2 block truncate text-[13px] font-semibold">
              {s}
            </span>
          </li>
        ))}
      </ol>
      <div className="border-hairline mt-4 flex items-center justify-between gap-3 rounded-[10px] border px-3 py-2 text-[13px]">
        <span className="text-ink-black truncate font-medium">INC-207 · Slip on wet stair</span>
        <span className="text-ironwood flex shrink-0 items-center gap-1.5">
          <Tick className="size-4" /> Verified
        </span>
      </div>
    </div>
  );
}

function TrainingPreview() {
  const rows = [
    { course: "Working at heights", pct: 100, note: "Certificate issued" },
    { course: "WHMIS", pct: 100, note: "Certificate issued" },
    { course: "Confined space entry", pct: 64, note: "In progress" }
  ];
  return (
    <ul className="grid gap-3">
      {rows.map((r) => (
        <li key={r.course} className="text-[13px]">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-ink-black truncate font-medium">{r.course}</span>
            <span className="text-ash shrink-0">{r.note}</span>
          </div>
          <span
            aria-hidden
            className="bg-cream-canvas border-hairline mt-1.5 block h-2 overflow-hidden rounded-full border"
          >
            <span
              className={cn(
                "block h-full rounded-full",
                r.pct === 100 ? "bg-ink-black" : "bg-harvest-flame"
              )}
              style={{ width: `${r.pct}%` }}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

export const previews = {
  hirac: HiracPreview,
  training: TrainingPreview,
  inspections: InspectionPreview,
  incidents: IncidentPreview
};

/** A module in a stage list: quiet icon + name, no box. */
function ModuleItem({ name }: { name: string }) {
  return (
    <li className="text-ink-black flex min-w-0 items-center gap-2 text-[14px] leading-snug">
      <ModuleIcon
        name={name}
        aria-hidden
        className="text-warm-stone size-3.5 shrink-0"
        strokeWidth={1.75}
      />
      <span className="min-w-0">{name}</span>
    </li>
  );
}

/* ---------- section ---------- */

export function PlatformHead() {
  return (
    <SectionHead
      id="platform-title"
      eyebrow={platform.eyebrow}
      title={platform.title}
      body={platform.body}
      align="split"
      aside={<TextLink href={platform.cta.href}>{platform.cta.label}</TextLink>}
    />
  );
}

/** Default: four quiet columns. One flagship per PDCA stage, the rest as a single line. */
export function PlatformMinimal() {
  return (
    <section id="platform" aria-labelledby="platform-title" className="py-20 sm:py-28">
      <div className="container-page">
        <PlatformHead />
        <ol className="border-ink-black mt-14 grid grid-cols-[minmax(0,1fr)] border-t-2 sm:grid-cols-2 lg:grid-cols-4">
          {platform.groups.map((g, i) => {
            const f = platform.featured[g.featured];
            const shown = g.items.slice(0, 3);
            return (
              <Reveal
                as="li"
                key={g.stage}
                index={i}
                className={cn(
                  "border-hairline border-b py-8 sm:px-6 lg:border-b-0",
                  i % 2 === 1 && "sm:border-l",
                  i > 0 && "lg:border-l",
                  i === 0 && "sm:pl-0",
                  i === 2 && "sm:pl-0 lg:pl-6"
                )}
              >
                <p className="text-flame-ink text-[13px] font-semibold tracking-[0.06em] uppercase">
                  {g.stage}
                </p>
                <h3 className="text-ink-black text-heading mt-4 flex items-center gap-2.5 font-medium">
                  <ModuleIcon
                    name={f.title}
                    aria-hidden
                    className="text-ink-black size-5 shrink-0"
                    strokeWidth={1.75}
                  />
                  {f.title}
                </h3>
                <p className="text-warm-stone mt-2 text-[15px]">{f.body}</p>
                <p className="text-ash mt-6 text-[14px]">
                  Also {shown.join(", ")}
                  <span className="text-ink-black font-medium">
                    {" "}
                    +{g.items.length - shown.length} more
                  </span>
                </p>
              </Reveal>
            );
          })}
        </ol>
        <p className="text-warm-stone mt-8 flex items-center gap-2 text-[14px]">
          <RefreshCw aria-hidden className="text-flame-ink size-4 shrink-0" strokeWidth={2} />
          {platform.loop}
        </p>
      </div>
    </section>
  );
}

/** Detailed: every stage's flagship preview plus its full module list. */
export function PlatformDetailed() {
  return (
    <section id="platform" aria-labelledby="platform-title" className="py-20 sm:py-28">
      <div className="container-page">
        <PlatformHead />

        <p className="text-ink-black border-hairline mt-14 border-t pt-6 text-[15px] font-semibold">
          {platform.note}
        </p>

        {/* One column per PDCA stage: the flagship module working, then everything else in that stage. */}
        <ol className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-2">
          {platform.groups.map((g, gi) => {
            const f = platform.featured[g.featured];
            const Preview = previews[g.featured];
            return (
              <Reveal
                as="li"
                key={g.stage}
                index={gi}
                className="bg-paper-white border-hairline rounded-cards flex flex-col border p-5 sm:p-6"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-ink-black text-heading font-medium">{g.stage}</h3>
                  <span className="text-ash tabular text-[13px]">{g.items.length + 1} modules</span>
                </div>
                <p className="text-warm-stone mt-1 text-[14px]">{g.line}</p>

                {/* Flagship: name + one line, then its preview in a single light box. */}
                <div className="border-hairline mt-5 border-t pt-5">
                  <p className="text-ink-black flex items-center gap-2 text-[15px] font-semibold whitespace-nowrap">
                    <ModuleIcon
                      name={f.title}
                      aria-hidden
                      className="size-4 shrink-0"
                      strokeWidth={1.75}
                    />
                    {f.title}
                  </p>
                  <p className="text-warm-stone mt-1 text-[13px] leading-snug">{f.body}</p>
                  <div
                    className="bg-cream-canvas/60 border-hairline mt-3 rounded-[12px] border p-3"
                    aria-hidden={g.featured === "hirac" ? undefined : true}
                  >
                    <Preview />
                  </div>
                </div>

                {/* Everything else in the stage: a light two-column list. */}
                <div className="mt-5 flex flex-1 flex-col">
                  <p className="text-ash text-[12px] font-semibold tracking-[0.06em] uppercase">
                    Also in {g.stage}
                  </p>
                  <ul
                    aria-label={`More in ${g.stage}`}
                    className="mt-3 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-5 gap-y-2"
                  >
                    {g.items.map((item) => (
                      <ModuleItem key={item} name={item} />
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </ol>

        {/* Across every stage: one slim bar, no boxes. */}
        <div className="bg-paper-white border-hairline rounded-cards mt-4 flex flex-col gap-3 border px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:gap-8">
          <p className="text-ash shrink-0 text-[12px] font-semibold tracking-[0.06em] uppercase">
            Across every stage
          </p>
          <ul aria-label="Across every stage" className="flex flex-wrap gap-x-5 gap-y-2">
            {platform.everywhere.map((item) => (
              <ModuleItem key={item} name={item} />
            ))}
          </ul>
        </div>
        <p className="text-ash mt-3 flex items-center gap-2 text-[13px]">
          <RefreshCw aria-hidden className="text-flame-ink size-3.5 shrink-0" strokeWidth={2} />
          {platform.loop}
        </p>
      </div>
    </section>
  );
}
