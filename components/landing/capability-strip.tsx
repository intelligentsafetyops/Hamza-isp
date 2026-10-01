import { capabilities } from "@/content/landing";

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {capabilities.map((c) => (
        <li
          key={c}
          className="text-ink-black text-heading-sm flex items-center font-medium whitespace-nowrap"
        >
          <span className="px-6 sm:px-8">{c}</span>
          <span aria-hidden className="bg-harvest-flame size-1.5 rounded-full" />
        </li>
      ))}
    </ul>
  );
}

/** The credibility scan: the buyer's own vocabulary, moving as texture rather than a glossary. */
export function CapabilityStrip() {
  return (
    <section aria-label="What Sajjeel Labs covers" className="border-hairline border-y">
      <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] py-6">
        <div className="marquee-track flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}

/** Static: the same vocabulary, still, wrapped and centred between hairlines. */
export function CapabilityList() {
  return (
    <section aria-label="What Sajjeel Labs covers" className="border-hairline border-y">
      <ul className="container-page flex flex-wrap items-center justify-center gap-x-2 gap-y-3 py-7">
        {capabilities.map((c, i) => (
          <li key={c} className="text-ink-black flex items-center text-[17px] font-medium">
            {i > 0 && <span aria-hidden className="bg-harvest-flame mr-2 size-1.5 rounded-full" />}
            {c}
          </li>
        ))}
      </ul>
    </section>
  );
}
