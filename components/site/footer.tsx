import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { footer } from "@/content/landing";
import { brand } from "@/lib/brand";

/** Ft1 Mast-headed: wordmark + one line, then a single inline row of links. */
export function Footer() {
  return (
    <footer className="border-hairline border-t">
      <div className="container-page py-14 sm:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Logo size="lg" />
            <p className="text-warm-stone mt-4 max-w-[40ch]">
              {brand.tagline}. {footer.line}
            </p>
          </div>
          <p className="text-ash text-caption">
            © {new Date().getFullYear()} {brand.name}
          </p>
        </div>

        <nav aria-label="Footer" className="border-hairline mt-10 border-t pt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {footer.links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-ironwood hover:text-ink-black text-[15px] whitespace-nowrap underline-offset-4 hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
