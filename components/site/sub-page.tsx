import { Cta } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { routes } from "@/lib/brand";

/** Shared shell for secondary pages: same header and footer as the landing page. */
export function SubPage({
  title,
  intro,
  children
}: {
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main" className="container-page py-16 sm:py-24">
        <div className="max-w-[720px]">
          <h1 className="text-ink-black text-heading-lg sm:text-display font-medium">{title}</h1>
          {intro && <p className="text-warm-stone text-lede mt-5">{intro}</p>}
        </div>
        <div className="mt-12">{children}</div>
      </main>
      <Footer />
    </>
  );
}

/** Honest placeholder for pages that are not built yet: says so, and offers a live route. */
export function StubNotice({ what }: { what: string }) {
  return (
    <div className="border-hairline bg-paper-white rounded-cards max-w-[640px] border p-8">
      <p className="text-ink-black text-heading-sm font-semibold">{what} is on its way.</p>
      <p className="text-warm-stone mt-2">
        In the meantime, a specialist can walk you through it on a short call.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Cta href={routes.demo} size="md">
          Book a demo
        </Cta>
        <Cta href={routes.home} variant="quiet" size="md">
          Back to home
        </Cta>
      </div>
    </div>
  );
}
