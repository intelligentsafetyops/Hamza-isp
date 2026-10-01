import { ArrowRight, Camera, Check, ChevronRight, Paperclip } from "lucide-react";
import { ModuleIcon } from "@/components/landing/module-icons";
import { cn } from "@/lib/utils";

/**
 * Product screens for the platform section, one per PDCA flagship. Illustrative UI in the same
 * language as the dashboard screenshot (white window, hairlines, accent for the one thing that
 * needs attention). Each is a container-query component: it fills whatever box it's given and
 * drops secondary columns when that box is narrow, so the same screen serves every layout.
 * Exposed to assistive tech as a single image with a plain-language label.
 */

/* ---------- shared pieces ---------- */

function Screen({
  label,
  module,
  crumb,
  record,
  status,
  children
}: {
  label: string;
  module: string;
  crumb: string;
  record: string;
  status: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className="bg-paper-white border-hairline @container w-full overflow-hidden rounded-[14px] border text-left shadow-[0_24px_48px_-28px_rgba(29,30,28,0.3)]"
    >
      <div className="border-hairline bg-cream-canvas/70 flex items-center gap-2 border-b px-3.5 py-2.5 @md:px-4">
        <span className="bg-paper-white border-hairline inline-flex size-6 shrink-0 items-center justify-center rounded-[7px] border">
          <ModuleIcon name={module} className="text-ink-black size-3.5" strokeWidth={1.75} />
        </span>
        <span className="text-ash hidden shrink-0 text-[12px] @sm:inline">{crumb}</span>
        <ChevronRight className="text-bone hidden size-3.5 shrink-0 @sm:block" />
        <span className="text-ink-black min-w-0 truncate text-[12.5px] font-semibold">
          {record}
        </span>
        <span className="ml-auto shrink-0">{status}</span>
      </div>
      <div className="p-3.5 @md:p-4">{children}</div>
    </div>
  );
}

function Pill({
  children,
  tone = "neutral",
  className
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "wash" | "ink";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center gap-1 rounded-full px-2 text-[11px] font-semibold whitespace-nowrap",
        tone === "neutral" && "bg-cream-canvas text-ironwood border-hairline border",
        tone === "accent" && "bg-harvest-flame text-on-brand",
        tone === "wash" && "bg-flame-wash text-flame-ink",
        tone === "ink" && "bg-ink-black text-cream-canvas",
        className
      )}
    >
      {children}
    </span>
  );
}

function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "bg-marigold-glow text-ink-black ring-paper-white inline-flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ring-2",
        className
      )}
    >
      {name}
    </span>
  );
}

/** Staggered entrance for rows; replays whenever the screen remounts (tab change). */
function enter(i: number) {
  return {
    className:
      "animate-in fade-in-0 slide-in-from-bottom-1 duration-500 [animation-fill-mode:both] motion-reduce:animate-none",
    style: { animationDelay: `${120 + i * 70}ms` }
  };
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-ash text-[10.5px] font-semibold tracking-[0.08em] uppercase">{children}</p>
  );
}

/* ---------- Plan · HIRAC ---------- */

function band(score: number) {
  if (score >= 15) return "bg-harvest-flame";
  if (score >= 8) return "bg-harvest-flame/45";
  if (score >= 4) return "bg-marigold-glow";
  return "bg-cream-canvas";
}

const controls = [
  { level: "Eliminate", text: "Move filter change to ground level", done: false },
  { level: "Engineer", text: "Guardrail on mezzanine edge", done: true },
  { level: "Admin", text: "Permit to work at height", done: true },
  { level: "PPE", text: "Harness, 2-point tie-off", done: true }
];

export function HiracScreen() {
  return (
    <Screen
      label="HIRAC record for working at height on the pump house mezzanine: initial risk 16 on a 5 by 5 matrix, reduced to 4 after engineering, administrative and PPE controls. Revision 4, published and signed off by 6 workers."
      module="HIRAC"
      crumb="Risk register"
      record="HIRAC-042 · Working at height, pump house mezzanine"
      status={<Pill tone="ink">Rev 4 · Published</Pill>}
    >
      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 @lg:grid-cols-[auto_minmax(0,1fr)] @lg:gap-5">
        {/* Matrix */}
        <div className="flex flex-col items-start">
          <Label>Risk matrix</Label>
          <div className="mt-2 flex items-stretch gap-1.5">
            <span className="text-ash flex rotate-180 items-center justify-center text-[10px] [writing-mode:vertical-rl]">
              Likelihood
            </span>
            <div>
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: 25 }, (_, n) => {
                  const row = 5 - Math.floor(n / 5);
                  const col = (n % 5) + 1;
                  const initial = row === 4 && col === 4;
                  const residual = row === 2 && col === 2;
                  return (
                    <span
                      key={n}
                      className={cn(
                        "border-hairline relative flex size-6 items-center justify-center rounded-[5px] border @md:size-7",
                        band(row * col)
                      )}
                    >
                      {initial && (
                        <span className="bg-ink-black ring-paper-white size-3 rounded-full ring-2" />
                      )}
                      {residual && (
                        <>
                          <span className="bg-harvest-flame/40 absolute size-4 animate-ping rounded-full motion-reduce:hidden" />
                          <span className="border-ink-black bg-paper-white relative size-3 rounded-full border-2" />
                        </>
                      )}
                    </span>
                  );
                })}
              </div>
              <p className="text-ash mt-1 text-center text-[10px]">Severity</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[12px]">
            <span className="bg-harvest-flame text-on-brand tabular inline-flex h-6 items-center rounded-[6px] px-2 font-semibold">
              16 High
            </span>
            <ArrowRight className="text-ash size-3.5" />
            <span className="bg-marigold-glow text-ink-black tabular inline-flex h-6 items-center rounded-[6px] px-2 font-semibold">
              4 Low
            </span>
          </div>
        </div>

        {/* Hierarchy of control */}
        <div className="min-w-0">
          <Label>Hierarchy of control</Label>
          <ol className="mt-2 grid grid-cols-[minmax(0,1fr)] gap-1.5">
            {controls.map((c, i) => {
              const e = enter(i);
              return (
                <li
                  key={c.level}
                  className={cn(
                    "border-hairline flex items-center gap-2.5 rounded-[9px] border px-2.5 py-2 text-[12px]",
                    e.className
                  )}
                  style={e.style}
                >
                  <span className="text-ash w-[58px] shrink-0 text-[11px] font-semibold">
                    {c.level}
                  </span>
                  <span
                    className={cn(
                      "min-w-0 flex-1 truncate",
                      c.done ? "text-ink-black" : "text-ash line-through"
                    )}
                  >
                    {c.text}
                  </span>
                  {c.done ? (
                    <Check className="text-ink-black size-3.5 shrink-0" strokeWidth={2.5} />
                  ) : (
                    <span className="text-ash shrink-0 text-[10.5px]">Not feasible</span>
                  )}
                </li>
              );
            })}
          </ol>
          <div className="border-hairline mt-3 flex items-center justify-between gap-2 border-t pt-3">
            <div className="flex -space-x-0.5">
              {["AK", "JR", "SM", "TD", "LN", "PO"].map((n) => (
                <Avatar key={n} name={n} />
              ))}
            </div>
            <span className="text-ironwood flex items-center gap-1.5 text-[12px] font-medium">
              <Check className="size-3.5" strokeWidth={2.5} /> 6 of 6 signed
            </span>
          </div>
        </div>
      </div>
    </Screen>
  );
}

/* ---------- Do · Training ---------- */

type Cell = "done" | "expiring" | "overdue" | "progress";
const courses = ["Heights", "WHMIS", "Confined", "First aid"];
const crew: { name: string; who: string; cells: Cell[] }[] = [
  { name: "Ali Khan", who: "AK", cells: ["done", "done", "progress", "done"] },
  { name: "Jo Reyes", who: "JR", cells: ["done", "expiring", "done", "done"] },
  { name: "Sam Mehta", who: "SM", cells: ["overdue", "done", "done", "expiring"] },
  { name: "Tara Dunn", who: "TD", cells: ["done", "done", "done", "done"] },
  { name: "Lin Ng", who: "LN", cells: ["done", "done", "progress", "done"] }
];

function CourseCell({ s }: { s: Cell }) {
  if (s === "done")
    return (
      <span className="bg-ink-black text-cream-canvas inline-flex size-5 items-center justify-center rounded-full">
        <Check className="size-3" strokeWidth={3} />
      </span>
    );
  if (s === "expiring") return <Pill tone="wash">30d</Pill>;
  if (s === "overdue") return <Pill tone="accent">Overdue</Pill>;
  return (
    <span className="border-ink-black relative inline-flex size-5 items-center justify-center rounded-full border-2 border-dashed" />
  );
}

export function TrainingScreen() {
  const kpis = [
    { k: "Compliant", v: "92%", bar: 92 },
    { k: "Expiring 30d", v: "5" },
    { k: "Overdue", v: "1", alert: true }
  ];
  return (
    <Screen
      label="Training matrix for the maintenance crew: 92 percent compliant, 5 certificates expiring in 30 days and 1 overdue. Working at heights is overdue for Sam Mehta; a reminder and booking go out automatically."
      module="Training (LMS)"
      crumb="Training"
      record="Training matrix · Maintenance crew"
      status={<Pill tone="neutral">5 workers</Pill>}
    >
      <div className="grid grid-cols-3 gap-2">
        {kpis.map((m) => (
          <div key={m.k} className="border-hairline rounded-[9px] border px-2.5 py-2">
            <p className="text-ash truncate text-[10.5px]">{m.k}</p>
            <p
              className={cn(
                "tabular mt-0.5 text-[18px] leading-none font-semibold",
                m.alert ? "text-flame-ink" : "text-ink-black"
              )}
            >
              {m.v}
            </p>
            {m.bar && (
              <span className="bg-cream-canvas mt-2 block h-1 overflow-hidden rounded-full">
                <span
                  className="bg-harvest-flame block h-full rounded-full"
                  style={{ width: `${m.bar}%` }}
                />
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="border-hairline mt-3 overflow-hidden rounded-[10px] border">
        <div className="bg-cream-canvas/60 border-hairline grid grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))] items-center border-b px-2.5 py-1.5">
          <span className="text-ash text-[10.5px] font-semibold">Worker</span>
          {courses.map((c) => (
            <span key={c} className="text-ash truncate text-center text-[10.5px] font-semibold">
              {c}
            </span>
          ))}
        </div>
        {crew.map((p, i) => {
          const e = enter(i);
          return (
            <div
              key={p.name}
              className={cn(
                "border-hairline grid grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))] items-center border-b px-2.5 py-1.5 last:border-b-0",
                p.cells.includes("overdue") && "bg-flame-wash/50",
                e.className
              )}
              style={e.style}
            >
              <span className="flex min-w-0 items-center gap-2">
                <Avatar name={p.who} className="hidden ring-0 @sm:inline-flex" />
                <span className="text-ink-black truncate text-[12px] font-medium">{p.name}</span>
              </span>
              {p.cells.map((s, j) => (
                <span key={j} className="flex justify-center">
                  <CourseCell s={s} />
                </span>
              ))}
            </div>
          );
        })}
      </div>

      <p className="text-ironwood mt-3 hidden items-center gap-1.5 text-[12px] @md:flex">
        <span className="bg-harvest-flame size-1.5 shrink-0 rounded-full" />
        Sam M. booked on Working at heights, Tue 08:00. Reminder sent.
      </p>
    </Screen>
  );
}

/* ---------- Check · Inspections ---------- */

type Answer = "pass" | "fail" | "na";
const checklist: { q: string; a: Answer }[] = [
  { q: "Lockout points labelled", a: "pass" },
  { q: "Emergency stop tested", a: "pass" },
  { q: "Coupling guard in place", a: "fail" },
  { q: "Bund free of leaks", a: "pass" }
];

function Answers({ a }: { a: Answer }) {
  return (
    <span className="border-hairline inline-flex shrink-0 overflow-hidden rounded-full border text-[10.5px] font-semibold">
      {(["pass", "fail", "na"] as const).map((o) => (
        <span
          key={o}
          className={cn(
            "px-2 py-0.5",
            o === a
              ? o === "fail"
                ? "bg-harvest-flame text-on-brand"
                : "bg-ink-black text-cream-canvas"
              : "text-ash"
          )}
        >
          {o === "pass" ? "Pass" : o === "fail" ? "Fail" : "N/A"}
        </span>
      ))}
    </span>
  );
}

export function InspectionScreen() {
  return (
    <Screen
      label="Monthly pump house inspection on Pump-04, 18 of 20 items answered. Coupling guard in place failed, with a photo attached, and automatically raised finding F-031 assigned to Maintenance, due Friday."
      module="Inspections"
      crumb="Inspections"
      record="INS-1182 · Monthly pump house inspection"
      status={<Pill tone="wash">In progress</Pill>}
    >
      <div className="flex items-center gap-3">
        <span className="bg-cream-canvas block h-1.5 flex-1 overflow-hidden rounded-full">
          <span className="bg-ink-black block h-full w-[90%] rounded-full" />
        </span>
        <span className="text-ironwood tabular shrink-0 text-[11.5px] font-medium">
          18 of 20 · Pump-04
        </span>
      </div>

      <ul className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-1.5">
        {checklist.map((r, i) => {
          const e = enter(i);
          return (
            <li key={r.q} className={e.className} style={e.style}>
              <div
                className={cn(
                  "flex items-center justify-between gap-3 rounded-[9px] border px-2.5 py-2 text-[12px]",
                  r.a === "fail" ? "border-harvest-flame bg-flame-wash/40" : "border-hairline"
                )}
              >
                <span className="text-ink-black min-w-0 truncate font-medium">{r.q}</span>
                <Answers a={r.a} />
              </div>
              {r.a === "fail" && (
                <div className="border-harvest-flame/50 ml-3 flex items-stretch gap-2.5 border-l-2 py-2 pl-3">
                  <span className="bg-cream-canvas border-hairline text-ash hidden w-14 shrink-0 items-center justify-center rounded-[7px] border [background-image:repeating-linear-gradient(135deg,transparent_0_6px,var(--color-parchment-shadow)_6px_7px)] @sm:flex">
                    <Camera className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-center gap-1.5 text-[12px]">
                      <Pill tone="accent">Finding F-031</Pill>
                      <span className="text-ironwood">raised automatically</span>
                    </p>
                    <p className="text-ash mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11.5px]">
                      <span>
                        Owner <span className="text-ink-black font-medium">Maintenance</span>
                      </span>
                      <span>
                        Due <span className="text-ink-black font-medium">Fri</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Paperclip className="size-3" /> 1 photo
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Screen>
  );
}

/* ---------- Act · Incidents & CAPA ---------- */

const flow = ["Report", "Investigate", "RCA", "CAPA", "Verified"];
const whys = [
  "Worker slipped on the east stair",
  "Stair was wet from a leaking valve",
  "Valve gasket past service life",
  "No PM task for the gasket"
];
const capas = [
  { id: "CAPA-118", text: "Replace gasket, add PM task", who: "TD", state: "Verified" },
  { id: "CAPA-119", text: "Anti-slip nosing on stair", who: "JR", state: "Verified" },
  { id: "CAPA-120", text: "Toolbox talk: wet surfaces", who: "SM", state: "Verified" }
];

export function IncidentScreen() {
  return (
    <Screen
      label="Incident INC-207, slip on the east stair, taken from report through investigation and a 5 whys root cause (no preventive maintenance task for a valve gasket) to three corrective actions, all verified closed."
      module="Incidents & CAPA"
      crumb="Incidents"
      record="INC-207 · Slip on wet stair"
      status={
        <Pill tone="ink">
          <Check className="size-3" strokeWidth={3} /> Closed
        </Pill>
      }
    >
      <ol className="grid grid-cols-5 gap-1">
        {flow.map((s, i) => (
          <li key={s} className="min-w-0">
            <span
              className={cn(
                "block h-1.5 rounded-full",
                i === flow.length - 1 ? "bg-harvest-flame" : "bg-ink-black"
              )}
            />
            <span className="text-ink-black mt-1.5 block truncate text-[10.5px] font-semibold @md:text-[11.5px]">
              {s}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 @lg:grid-cols-2">
        <div className="min-w-0">
          <Label>RCA · 5 Whys</Label>
          <ol className="mt-2 grid grid-cols-[minmax(0,1fr)] gap-1">
            {whys.map((w, i) => {
              const e = enter(i);
              const root = i === whys.length - 1;
              return (
                <li
                  key={w}
                  className={cn("flex items-start gap-2 text-[12px]", e.className)}
                  style={e.style}
                >
                  <span
                    className={cn(
                      "tabular mt-px inline-flex size-4 shrink-0 items-center justify-center rounded-full text-[9.5px] font-bold",
                      root ? "bg-harvest-flame text-on-brand" : "bg-cream-canvas text-ironwood"
                    )}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cn(
                      "min-w-0",
                      root ? "text-ink-black font-semibold" : "text-ironwood"
                    )}
                  >
                    {w}
                    {root && (
                      <span className="text-flame-ink ml-1.5 text-[10.5px] font-semibold">
                        Root cause
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="min-w-0">
          <Label>Corrective actions</Label>
          <ul className="mt-2 grid grid-cols-[minmax(0,1fr)] gap-1.5">
            {capas.map((c, i) => {
              const e = enter(i + 2);
              return (
                <li
                  key={c.id}
                  className={cn(
                    "border-hairline flex items-center gap-2 rounded-[9px] border px-2.5 py-1.5 text-[12px]",
                    e.className
                  )}
                  style={e.style}
                >
                  <span className="text-ink-black tabular shrink-0 font-semibold">{c.id}</span>
                  <span className="text-ironwood min-w-0 flex-1 truncate">{c.text}</span>
                  <Avatar name={c.who} className="size-5 text-[9px] ring-0" />
                  <Check className="text-ink-black size-3.5 shrink-0" strokeWidth={2.5} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Screen>
  );
}

export const screens = {
  hirac: HiracScreen,
  training: TrainingScreen,
  inspections: InspectionScreen,
  incidents: IncidentScreen
};
