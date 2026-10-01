/**
 * Landing page copy — from Laiba Malik's content brief, lightly edited.
 * Rule from the Product Baseline: claim only what exists today, never certification.
 */
import { routes } from "@/lib/brand";

export const nav = [
  { label: "Platform", href: routes.platformModules },
  { label: "Solutions", href: "/#platform" },
  { label: "Industries", href: "/#maturity" },
  { label: "Training", href: routes.platformTraining },
  { label: "Resources", href: "/#faq" }
] as const;

export const gapAssessment = {
  label: "Get a free gap assessment",
  short: "Free gap assessment",
  // The Baseline requires this line wherever the gap assessment CTA appears.
  note: "10 minutes. No signup. See exactly where you’re exposed."
} as const;

export const hero = {
  eyebrow: "QHSE operations & compliance",
  title: "One QHSE platform to replace disconnected systems",
  body: "Replace spreadsheets, paper forms, shared drives, and standalone tools with one platform for risk management, inspections, incidents, training, document control, and compliance. Every record stays linked from start to finish.",
  secondary: { label: "Explore the platform", href: routes.platformModules }
};

export const capabilities = [
  "HIRAC",
  "Inspections",
  "Incidents & CAPA",
  "Non-conformance",
  "Training (LMS)",
  "Assets & certs",
  "Contractors",
  "Safety talks",
  "Documents"
] as const;

export const reality = {
  eyebrow: "The reality today",
  title: "The work gets done. Proving it is the hard part.",
  body: "Most organisations don’t fail audits because the work wasn’t done. They struggle because the evidence lives across spreadsheets, paper forms, shared drives, emails, and separate systems. Finding the right record becomes the hardest part of compliance.",
  // The 60-second scene from the Founder Brief: an inspector on site, a supervisor searching.
  scene: {
    prompt: "An inspector on site asks for the excavator operator’s certificate.",
    timer: "left before a stop-work order",
    timeout: "Stop-work order issued"
  },
  artefacts: [
    {
      kind: "Excel",
      title: "HIRAC_v7_FINAL (2).xlsx",
      meta: "Last edited by ?",
      ask: "Is this current?"
    },
    { kind: "SharePoint", title: "H&S / 2023 / Inspections / old", meta: "312 items" },
    {
      kind: "Paper",
      title: "Pre-use inspection sheet",
      meta: "Handwritten, unsigned",
      ask: "Who signed it?"
    },
    {
      kind: "Binder",
      title: "Training records 2022",
      meta: "Shelf B, site office",
      ask: "Where’s that cert?"
    },
    { kind: "Email chain", title: "RE: RE: FW: excavator cert", meta: "14 messages" },
    {
      kind: "CAPA-142",
      title: "Guard replaced on conveyor 3",
      meta: "Assigned. Never verified.",
      open: true
    }
  ],
  // Which artefacts each failure mode lights up in the scene ("timer" = the countdown).
  points: [
    {
      title: "Records scattered",
      tag: "5 places to look",
      body: "The evidence exists. It’s spread across spreadsheets, paper, shared drives, and email, so the right record is never where you need it.",
      lights: [0, 1, 2, 3, 4]
    },
    {
      title: "Actions left open",
      tag: "1 fix nobody checked",
      body: "Corrective actions get assigned but never verified, so no one can say for certain whether the fix actually held.",
      lights: [5]
    },
    {
      title: "Proof rebuilt",
      tag: "60 seconds to find it",
      body: "When the inspector arrives, the audit trail is reconstructed under pressure instead of already being there.",
      lights: ["timer"]
    }
  ]
} as const;

// Bridge between "The reality today" and the lifecycle (components/landing/rope-3d).
export const ropeBand = {
  before: "Six places to look.",
  after: "One record to follow."
} as const;

export const lifecycle = {
  eyebrow: "The full QHSE lifecycle, end to end",
  title: "Record it once. Prove it any time.",
  body: "A risk assessment, the inspections that follow it, the incident, the corrective action, the verification: every step is recorded in the same system as the work happens, so the audit trail exists by design rather than because someone assembled it.",
  start: "Where it starts today",
  end: "Provable",
  trailTitle: "Audit trail · Pump-04",
  trailDone: "Nothing to reassemble. The trail was written as the work happened.",
  // One illustrative story followed through all seven stages (sample data, not a customer).
  stages: [
    {
      name: "HIRAC",
      note: "Hazards scored, controls set",
      record: "Working at height, pump house mezzanine",
      detail: ["Rev 4 published", "Residual risk 16 → 4", "Signed off by 6 workers"],
      when: "Mon 08:15",
      entry: "HIRAC Rev 4 published"
    },
    {
      name: "Inspection",
      note: "Findings raised on site",
      record: "Monthly pump house inspection",
      detail: ["14 items checked", "1 failed: coupling guard missing", "Finding F-031 raised"],
      when: "Tue 10:40",
      entry: "Inspection submitted · F-031"
    },
    {
      name: "Incident",
      note: "Reported from the floor",
      record: "Near miss at the Pump-04 coupling",
      detail: ["Reported from a phone on site", "Photo attached", "Supervisor notified"],
      when: "Wed 07:42",
      entry: "Incident INC-207 reported"
    },
    {
      name: "RCA",
      note: "Root cause recorded",
      record: "5 Whys on INC-207",
      detail: [
        "Guard removed for maintenance",
        "Not refitted before restart",
        "Root cause: no guard check at LOTO release"
      ],
      when: "Wed 13:05",
      entry: "Root cause recorded"
    },
    {
      name: "CAPA",
      note: "Owner and due date",
      record: "CAPA-118 · Add guard check to LOTO release",
      detail: ["Owner: Maintenance lead", "Due Friday", "Raised from the RCA"],
      when: "Wed 13:20",
      entry: "CAPA-118 assigned"
    },
    {
      name: "Verification",
      note: "Fix checked, signed off",
      record: "CAPA-118 verified on site",
      detail: ["Guard refitted and tested", "Checklist updated", "Signed off by supervisor"],
      when: "Fri 15:30",
      entry: "CAPA-118 verified"
    },
    {
      name: "Audit",
      note: "Trail already there",
      record: "Inspector asks for the Pump-04 history",
      detail: ["Every step above, in order", "Who did what, and when", "No spreadsheet to rebuild"],
      when: "Next month",
      entry: "History opened for the inspector"
    }
  ]
} as const;

export type Stage = "Plan" | "Do" | "Check" | "Act";

export const platform = {
  eyebrow: "The platform",
  title: "Everything your QHSE team needs. Nothing spread across five systems.",
  body: "Every module works together, so information entered once follows the entire compliance process instead of being recreated across different systems.",
  note: "Grouped into the four stages of your PDCA loop, all on one record.",
  cta: { label: "Explore full platform", href: routes.platformModules },
  // PDCA as ISO 45001 structures it: inspections are performance evaluation (Check);
  // incidents, nonconformity and corrective action are improvement (Act).
  featured: {
    hirac: {
      title: "HIRAC",
      body: "Score hazards on a 5×5 matrix, apply controls, publish an immutable version."
    },
    training: {
      title: "Training (LMS)",
      body: "Courses, completions, and certificates on each worker’s record."
    },
    inspections: {
      title: "Inspections",
      body: "A failed item becomes a finding with an owner and a due date."
    },
    incidents: {
      title: "Incidents & CAPA",
      body: "From the first report through root cause to a verified corrective action."
    }
  },
  groups: [
    {
      stage: "Plan" as Stage,
      line: "Assess the risk and set the controls.",
      featured: "hirac" as const,
      items: [
        "5×5 risk matrix",
        "Hierarchy of control",
        "Permits",
        "Legislative refs",
        "PPE",
        "Versioned records",
        "Document library"
      ]
    },
    {
      stage: "Do" as Stage,
      line: "Do the work, and train the people doing it.",
      featured: "training" as const,
      items: [
        "Worker sign-off",
        "Acknowledgements",
        "Toolbox talks",
        "Attendance records",
        "Contractor docs",
        "Translation",
        "Ontario courses",
        "Certificates"
      ]
    },
    {
      stage: "Check" as Stage,
      line: "Inspect, measure, and catch what failed.",
      featured: "inspections" as const,
      items: [
        "Dynamic forms",
        "Findings",
        "Cert expiry",
        "Asset register",
        "Maintenance",
        "Compliance dashboard"
      ]
    },
    {
      stage: "Act" as Stage,
      line: "Investigate, correct, and prove it held.",
      featured: "incidents" as const,
      items: [
        "Non-conformance",
        "RCA · 5 Whys",
        "Fishbone",
        "Corrective actions",
        "Effectiveness review",
        "Tasks",
        "Notifications"
      ]
    }
  ],
  loop: "Act feeds the next Plan. The loop runs on one record.",
  everywhere: [
    "Multi-site",
    "Departments",
    "Role-based access",
    "Audit trail",
    "Employee profiles",
    "Document Intelligence",
    "Calendar sync"
  ]
};

export const standards = {
  eyebrow: "Get compliant",
  title: "Built around the standards your business already works towards.",
  body: "Whether you’re working towards ISO certification or meeting provincial health and safety requirements, Sajjeel Labs keeps the records, evidence, and workflows organised in one place.",
  cards: [
    { code: "ISO 45001", name: "Occupational health & safety", kind: "Standard" },
    { code: "ISO 9001", name: "Quality management", kind: "Standard" },
    { code: "ISO 14001", name: "Environmental management", kind: "Standard" },
    { code: "OHSA & provincial", name: "MOL · WSIB · WCB · OSHA", kind: "Regulators" }
  ],
  footnote:
    "Sajjeel Labs structures the records these standards and regulators ask for. Certification stays with your auditor."
} as const;

export const maturity = {
  title: "Built for organisations at every stage of maturity",
  sub: "Whether you’re replacing spreadsheets or scaling across multiple sites.",
  columns: [
    {
      id: "spreadsheets",
      title: "Moving beyond spreadsheets",
      body: "Your informal systems worked until they didn’t. Bring risk, inspections, and records into one place before the next audit finds the gaps.",
      trigger: "Outgrowing spreadsheets"
    },
    {
      id: "standardising",
      title: "Standardising growing operations",
      body: "Different teams doing the same work differently. Set one process everyone follows, so consistency stops depending on who’s on shift.",
      trigger: "Inconsistency across teams"
    },
    {
      id: "multisite",
      title: "Managing multiple sites",
      body: "New locations, new complexity. Keep every site on the same record structure, with one view of what’s open across all of them.",
      trigger: "New multi-site complexity"
    }
  ]
} as const;

export const proof = {
  title: "Designed for real audits, not perfect demos.",
  sub: "Three roles, three tests: the audit, the shift, and the shop floor.",
  // PLACEHOLDER QUOTES from the content draft. Replace with the published testimonials
  // (and company names, where clients agree) before launch. `placeholder` drives a
  // dev-only marker so they can't ship unnoticed.
  placeholder: true,
  quotes: [
    {
      tag: "Audit defensibility",
      quote:
        "The records held up, the trail was clean, and the process was defensible when the inspector actually came.",
      name: "Calvin S.",
      role: "Health & Safety Manager"
    },
    {
      tag: "Field adoption",
      quote:
        "My crew actually uses it mid-shift. On the phone, with gloves on. That’s the test, and it passed.",
      name: "Milan V.",
      role: "Production Supervisor"
    },
    {
      tag: "Reporting culture",
      quote:
        "Raising a hazard takes seconds now, so people actually do it instead of leaving it for someone else.",
      name: "Brad P.",
      role: "Lead Hand"
    }
  ]
} as const;

export const faq = {
  eyebrow: "Questions",
  title: "Before you book a call",
  items: [
    {
      q: "Is Sajjeel Labs just another checklist app?",
      a: "No. A checklist app closes when the form is submitted. Sajjeel Labs carries an incident through root cause analysis to a corrective action, and holds it open until that action is verified, so a submitted form is the start of a record, not the end of one."
    },
    {
      q: "What happens to years of records already in binders and spreadsheets?",
      a: "Existing records can be brought in through Document Intelligence, so historical evidence sits alongside new records instead of staying stranded in old formats."
    },
    {
      q: "How long does implementation take?",
      a: "Setup is consultative. Locations, employee records, and role-based access are configured with an Sajjeel Labs specialist so the structure matches how your operation actually runs. We’ll give you a timeline for your sites on the demo call."
    },
    {
      q: "Will my field crew actually use it?",
      a: "It’s built for a phone, outdoors, mid-task. Actions are short and verb-first, and content translates, so adoption doesn’t depend on everyone reading English first."
    },
    {
      q: "Does it handle multiple sites and departments?",
      a: "Yes. Every site and department runs on the same record structure, with role-based access controlling who sees and does what, and one view of what’s open across all of them."
    },
    {
      q: "Does it cover quality and environment, or only safety?",
      a: "All three. Quality and environment run through the same governed lifecycle as safety: one record structure across ISO 45001, 9001, and 14001 instead of three separate systems."
    },
    {
      q: "Is our data secure?",
      a: "Access is role-based, and every action is captured in a timestamped audit trail, so you can see who did what and when across the whole record. The security page covers the detail."
    }
  ]
} as const;

export const finalCta = {
  title: "Is your site inspection-ready?",
  body: "See where your compliance process is exposed with a free 10-minute gap assessment, or book a demo to see Sajjeel Labs in action.",
  secondary: { label: "Explore the platform", href: routes.platformModules }
} as const;

export const footer = {
  line: "Built for regulated, high-hazard industries.",
  links: [
    { label: "Platform", href: routes.platform },
    { label: "Gap assessment", href: routes.gapAssessment },
    { label: "Book a demo", href: routes.demo },
    { label: "Pricing", href: routes.pricing },
    { label: "Security", href: routes.security },
    { label: "Privacy", href: routes.privacy },
    { label: "Terms", href: routes.terms }
  ]
} as const;
