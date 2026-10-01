import type { Metadata, Viewport } from "next";
import { Figtree, Newsreader } from "next/font/google";
import { ThemeCustomizer } from "@/components/site/theme-customizer";
import { brand } from "@/lib/brand";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap"
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-newsreader",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: "Sajjeel Labs · One QHSE platform to replace disconnected systems",
    template: "%s"
  },
  description:
    "Risk management, inspections, incidents, training, document control, and compliance in one QHSE platform. Every record stays linked from start to finish.",
  alternates: { canonical: "/" }
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${figtree.variable} ${newsreader.variable}`}>
      <body>
        <a
          href="#main"
          className="bg-ink text-cream-canvas sr-only z-[60] rounded-full px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {children}
        <ThemeCustomizer />
      </body>
    </html>
  );
}
