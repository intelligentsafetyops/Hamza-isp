import { RefreshCw } from "lucide-react";
import { ModuleIcon } from "@/components/landing/module-icons";
import { screens } from "@/components/landing/platform-screens";
import { TextLink } from "@/components/site/cta";
import { SectionHead } from "@/components/site/section-head";
import { platform } from "@/content/landing";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export const previews = screens;

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
                  <div className="mt-3">
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
