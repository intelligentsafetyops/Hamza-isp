"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Cta } from "@/components/site/cta";
import { gapAssessment, nav } from "@/content/landing";
import { routes } from "@/lib/brand";
import { cn } from "@/lib/utils";

/** Which nav item is "current": a path match, or the in-page section in view on "/". */
function useActiveHref() {
  const pathname = usePathname();
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    const ids = nav
      .map((n) => n.href)
      .filter((h) => h.startsWith("/#"))
      .map((h) => h.slice(2));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setSection(visible[0].target.id);
        else if (window.scrollY < 400) setSection(null);
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    // Back at the hero, nothing is current (an instant jump can skip the observer callback).
    const onScroll = () => window.scrollY < 400 && setSection(null);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return (href: string) => {
    if (href.startsWith("/#")) return pathname === "/" && section === href.slice(2);
    // Platform and Training share /platform; only the first item for a path is marked current.
    return nav.find((n) => n.href.split("#")[0] === pathname)?.href === href;
  };
}

export function Header() {
  const isActive = useActiveHref();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-(--header-height) border-b transition-[background-color,border-color] duration-200",
        scrolled
          ? "border-hairline bg-cream-canvas/80 supports-backdrop-filter:backdrop-blur-md supports-backdrop-filter:backdrop-saturate-150"
          : "bg-cream-canvas border-transparent"
      )}
    >
      <div className="container-page flex h-full items-center justify-between gap-6">
        <Link href={routes.home} aria-label="Sajjeel Labs home" className="shrink-0 rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-10 items-center rounded-full px-3.5 text-[15px] font-medium whitespace-nowrap transition-colors duration-150",
                      active ? "text-ink-black" : "text-ironwood hover:text-ink-black"
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "bg-harvest-flame absolute inset-x-3.5 -bottom-[3px] h-0.5 rounded-full transition-opacity duration-150",
                        active ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={routes.demo}
            className="text-ink-black hover:text-flame-ink hidden h-10 items-center px-3 text-[15px] font-medium whitespace-nowrap sm:inline-flex"
          >
            Book a demo
          </Link>
          <Cta href={routes.gapAssessment} size="md" className="hidden sm:inline-flex">
            {gapAssessment.short}
          </Cta>

          <Sheet>
            <SheetTrigger
              className="border-hairline bg-paper-white text-ink-black hover:border-bone inline-flex size-10 items-center justify-center rounded-full border lg:hidden"
              aria-label="Open menu"
            >
              <Menu aria-hidden className="size-5" strokeWidth={1.75} />
            </SheetTrigger>
            <SheetContent side="right" className="bg-cream-canvas border-hairline w-[86%] p-6">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav aria-label="Mobile" className="mt-10">
                <ul className="grid gap-1">
                  {nav.map((item) => (
                    <li key={item.label}>
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          className="text-ink-black hover:bg-paper-white flex h-12 items-center rounded-xl px-3 text-[17px] font-medium"
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="border-hairline mt-auto grid gap-3 border-t pt-6">
                <SheetClose asChild>
                  <Cta href={routes.gapAssessment}>{gapAssessment.label}</Cta>
                </SheetClose>
                <p className="text-warm-stone text-caption text-center">{gapAssessment.note}</p>
                <SheetClose asChild>
                  <Cta href={routes.demo} variant="secondary">
                    Book a demo
                  </Cta>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
