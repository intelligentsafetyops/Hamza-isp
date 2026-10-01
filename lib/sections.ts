/**
 * Layout variants per landing-page section. The first option is the default (what production
 * renders). The prototype switchers in the UI pick between these; see components/variants.
 */
export const sectionVariants = {
  hero: {
    label: "Hero",
    options: [
      { id: "showcase", label: "Product showcase" },
      { id: "split", label: "Split" },
      { id: "centered", label: "Centered" },
      { id: "stacked", label: "Text + dashboard" }
    ]
  },
  capabilities: {
    label: "Capability strip",
    options: [
      { id: "marquee", label: "Marquee" },
      { id: "grid", label: "Static list" }
    ]
  },
  reality: {
    label: "The reality today",
    options: [
      { id: "scene", label: "Scene" },
      { id: "split", label: "Split cards" },
      { id: "minimal", label: "Minimal" }
    ]
  },
  lifecycle: {
    label: "Lifecycle",
    options: [
      { id: "interactive", label: "Interactive" },
      { id: "timeline", label: "Timeline" }
    ]
  },
  platform: {
    label: "Platform",
    options: [
      { id: "showcase", label: "Product showcase" },
      { id: "minimal", label: "Minimal" },
      { id: "tabs", label: "Tabs" },
      { id: "detailed", label: "Detailed" }
    ]
  },
  standards: {
    label: "Standards",
    options: [
      { id: "register", label: "Register" },
      { id: "cards", label: "Cards" }
    ]
  },
  maturity: {
    label: "Maturity",
    options: [
      { id: "stepped", label: "Stepped" },
      { id: "list", label: "List" }
    ]
  },
  proof: {
    label: "Proof",
    options: [
      { id: "featured", label: "Featured" },
      { id: "grid", label: "Three up" },
      { id: "single", label: "Single quote" }
    ]
  },
  faq: {
    label: "FAQ",
    options: [
      { id: "accordion", label: "Accordion" },
      { id: "columns", label: "Open columns" }
    ]
  },
  cta: {
    label: "Final CTA",
    options: [
      { id: "card", label: "Card" },
      { id: "inline", label: "Inline" }
    ]
  }
} as const;

export type SectionId = keyof typeof sectionVariants;
export type VariantOf<S extends SectionId> = (typeof sectionVariants)[S]["options"][number]["id"];

export const prototypeEnabled = process.env.NEXT_PUBLIC_PROTOTYPE_CONTROLS !== "false";
