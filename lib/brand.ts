export const brand = {
  name: "Sajjeel Labs",
  tagline: "QHSE operations & compliance",
  // Set NEXT_PUBLIC_SITE_URL in production; localhost keeps dev sitemaps valid.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
} as const;

/** Every route the landing page links to lives here, so no CTA can drift to a dead URL. */
export const routes = {
  home: "/",
  gapAssessment: "/gap-assessment",
  demo: "/book-a-demo",
  platform: "/platform",
  platformModules: "/platform#modules",
  platformTraining: "/platform#training",
  pricing: "/pricing",
  security: "/security",
  privacy: "/privacy",
  terms: "/terms"
} as const;
