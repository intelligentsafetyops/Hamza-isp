import type { Metadata } from "next";
import { StubNotice, SubPage } from "@/components/site/sub-page";
import { platform } from "@/content/landing";

export const metadata: Metadata = {
  title: "Platform | Sajjeel Labs",
  alternates: { canonical: "/platform" }
};

/**
 * Placeholder Platform page. It exists so every "Explore the platform" link lands on a
 * real #modules anchor; the full module walkthrough replaces it.
 */
export default function Page() {
  return (
    <SubPage
      title="The Sajjeel Labs platform"
      intro="Every module, grouped by the four stages of your PDCA loop, on one record."
    >
      <section id="modules" aria-labelledby="modules-title">
        <h2 id="modules-title" className="text-ink-black text-heading-lg font-medium">
          Modules
        </h2>
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {platform.groups.map((g) => (
            <div key={g.stage} className="bg-paper-white border-hairline rounded-cards border p-6">
              <h3 className="text-ink-black text-heading font-semibold">{g.stage}</h3>
              <p className="text-warm-stone mt-1 text-[14px]">{g.line}</p>
              <ul className="text-ironwood mt-4 grid gap-1.5 text-[15px]">
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="training" aria-labelledby="training-title" className="mt-16">
        <h2 id="training-title" className="text-ink-black text-heading-lg font-medium">
          Training (LMS)
        </h2>
        <p className="text-warm-stone mt-3 max-w-[60ch]">
          Courses, completions, and certificates on each worker’s record, with expiry tracked
          alongside the rest of your compliance evidence.
        </p>
        <div className="mt-8">
          <StubNotice what="The full module walkthrough" />
        </div>
      </section>
    </SubPage>
  );
}
