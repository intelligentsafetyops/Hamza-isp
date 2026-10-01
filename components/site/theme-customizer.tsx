"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Palette, RotateCcw, X } from "lucide-react";
import {
  resetPrototypeLayout,
  updatePrototypeLayout,
  usePrototypeLayout
} from "@/components/variants/store";
import { cn } from "@/lib/utils";

/**
 * Prototype control: live-swap accent, canvas and fonts by overriding the DESIGN.md tokens
 * on <html>. For exploring directions with the team — the locked system in tokens.css is
 * untouched. Hide it in production with NEXT_PUBLIC_PROTOTYPE_CONTROLS=false.
 */

type Accent = { id: string; label: string; value: string; onAccent: string };
type Canvas = { id: string; label: string; value: string };
type Font = { id: string; label: string; stack: string; google?: string };

const accents: Accent[] = [
  { id: "flame", label: "Flame", value: "#fa5d00", onAccent: "#1d1e1c" },
  { id: "signal", label: "Signal", value: "#f2b705", onAccent: "#1d1e1c" },
  { id: "cobalt", label: "Cobalt", value: "#2f5bea", onAccent: "#ffffff" },
  { id: "teal", label: "Teal", value: "#0f7f82", onAccent: "#ffffff" },
  { id: "forest", label: "Forest", value: "#1f7a4d", onAccent: "#ffffff" },
  { id: "plum", label: "Plum", value: "#7b3fa0", onAccent: "#ffffff" }
];

const canvases: Canvas[] = [
  { id: "cream", label: "Cream", value: "#fff8f1" },
  { id: "white", label: "White", value: "#ffffff" },
  { id: "stone", label: "Stone", value: "#f4f2ee" },
  { id: "mist", label: "Mist", value: "#f3f6f9" }
];

const displayFonts: Font[] = [
  { id: "newsreader", label: "Newsreader", stack: "var(--font-newsreader), Georgia, serif" },
  {
    id: "fraunces",
    label: "Fraunces",
    stack: "'Fraunces', Georgia, serif",
    google: "Fraunces:opsz,wght@9..144,400"
  },
  {
    id: "instrument",
    label: "Instrument Serif",
    stack: "'Instrument Serif', Georgia, serif",
    google: "Instrument+Serif"
  },
  {
    id: "dmserif",
    label: "DM Serif Display",
    stack: "'DM Serif Display', Georgia, serif",
    google: "DM+Serif+Display"
  },
  { id: "body", label: "Same as body", stack: "var(--font-muotoweb)" }
];

const bodyFonts: Font[] = [
  { id: "figtree", label: "Figtree", stack: "var(--font-figtree), system-ui, sans-serif" },
  {
    id: "inter",
    label: "Inter",
    stack: "'Inter', system-ui, sans-serif",
    google: "Inter:wght@400;500;600;700"
  },
  {
    id: "dmsans",
    label: "DM Sans",
    stack: "'DM Sans', system-ui, sans-serif",
    google: "DM+Sans:wght@400;500;600;700"
  },
  {
    id: "manrope",
    label: "Manrope",
    stack: "'Manrope', system-ui, sans-serif",
    google: "Manrope:wght@400;500;600;700"
  },
  {
    id: "plex",
    label: "IBM Plex Sans",
    stack: "'IBM Plex Sans', system-ui, sans-serif",
    google: "IBM+Plex+Sans:wght@400;500;600;700"
  }
];

type Choice = { accent: string; canvas: string; display: string; body: string };
const DEFAULT: Choice = {
  accent: "flame",
  canvas: "cream",
  display: "newsreader",
  body: "figtree"
};
const KEY = "sl-prototype-theme";

function loadFont(f: Font) {
  if (!f.google) return;
  const id = `gf-${f.id}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${f.google}&display=swap`;
  document.head.appendChild(link);
}

/** Every token the choice touches, derived the same way tokens.css derives its own. */
function tokensFor(c: Choice): Record<string, string> {
  const a = accents.find((x) => x.id === c.accent) ?? accents[0];
  const cv = canvases.find((x) => x.id === c.canvas) ?? canvases[0];
  const d = displayFonts.find((x) => x.id === c.display) ?? displayFonts[0];
  const b = bodyFonts.find((x) => x.id === c.body) ?? bodyFonts[0];
  return {
    "--color-harvest-flame": a.value,
    "--color-on-brand": a.onAccent,
    "--color-flame-ink": `color-mix(in oklch, ${a.value} 72%, black)`,
    "--color-flame-hover": `color-mix(in oklch, ${a.value} 86%, white)`,
    "--color-flame-wash": `color-mix(in oklch, ${a.value} 14%, white)`,
    "--color-marigold-glow": `color-mix(in oklch, ${a.value} 24%, white)`,
    "--color-cream-canvas": cv.value,
    "--color-parchment-shadow": `color-mix(in oklch, ${cv.value} 86%, #1d1e1c)`,
    "--font-muotoweb": b.stack,
    "--font-monarch": d.stack
  };
}

function apply(c: Choice) {
  const root = document.documentElement;
  const isDefault = JSON.stringify(c) === JSON.stringify(DEFAULT);
  for (const [k, v] of Object.entries(tokensFor(c))) {
    if (isDefault) root.style.removeProperty(k);
    else root.style.setProperty(k, v);
  }
  [...displayFonts, ...bodyFonts]
    .filter((f) => f.id === c.display || f.id === c.body)
    .forEach(loadFont);
}

function Swatch({
  color,
  label,
  selected,
  onClick
}: {
  color: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      title={label}
      className={cn(
        "relative inline-flex size-9 items-center justify-center rounded-full border transition-[box-shadow] duration-150",
        selected
          ? "ring-ink-black border-transparent ring-2 ring-offset-2"
          : "hover:ring-bone border-black/10 hover:ring-2"
      )}
      style={{ background: color }}
    >
      <span className="sr-only">{label}</span>
      {selected && (
        <Check aria-hidden className="size-4 text-white mix-blend-difference" strokeWidth={3} />
      )}
    </button>
  );
}

function FontPicker({
  fonts,
  value,
  onChange,
  sample
}: {
  fonts: Font[];
  value: string;
  onChange: (id: string) => void;
  sample: "display" | "body";
}) {
  return (
    <div className="grid gap-1.5">
      {fonts.map((f) => (
        <button
          key={f.id}
          type="button"
          aria-pressed={value === f.id}
          onMouseEnter={() => loadFont(f)}
          onFocus={() => loadFont(f)}
          onClick={() => onChange(f.id)}
          className={cn(
            "flex h-10 items-center justify-between rounded-[10px] border px-3 text-left transition-colors duration-150",
            value === f.id
              ? "border-ink-black bg-paper-white"
              : "border-hairline hover:border-bone bg-transparent"
          )}
        >
          <span
            className={cn(
              "text-ink-black truncate",
              sample === "display" ? "text-[17px]" : "text-[14px]"
            )}
            style={{ fontFamily: f.stack }}
          >
            {f.label}
          </span>
          {value === f.id && (
            <Check aria-hidden className="text-ink-black size-4 shrink-0" strokeWidth={2.5} />
          )}
        </button>
      ))}
    </div>
  );
}

export function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  // Restore a saved choice (per browser; a prototyping convenience, not shared state).
  // Safe to read here: the panel starts closed, so server and client markup match.
  const [choice, setChoice] = useState<Choice>(() => {
    if (typeof window === "undefined") return DEFAULT;
    try {
      const saved = localStorage.getItem(KEY);
      return saved ? { ...DEFAULT, ...JSON.parse(saved) } : DEFAULT;
    } catch {
      return DEFAULT;
    }
  });
  const [copied, setCopied] = useState(false);
  const layout = usePrototypeLayout();

  useEffect(() => {
    apply(choice);
    try {
      localStorage.setItem(KEY, JSON.stringify(choice));
    } catch {}
  }, [choice]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const set = (patch: Partial<Choice>) => setChoice((c) => ({ ...c, ...patch }));

  const copyCss = async () => {
    const css = `:root {\n${Object.entries(tokensFor(choice))
      .map(([k, v]) => `  ${k}: ${v};`)
      .join("\n")}\n}`;
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  if (process.env.NEXT_PUBLIC_PROTOTYPE_CONTROLS === "false") return null;

  return (
    <div className="fixed right-4 bottom-4 z-[70] flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <div
          role="dialog"
          aria-label="Customize theme"
          className="bg-cream-canvas border-hairline animate-in fade-in-0 slide-in-from-bottom-2 max-h-[min(640px,calc(100dvh-6rem))] w-[min(340px,calc(100vw-2rem))] overflow-y-auto rounded-[20px] border p-5 shadow-[0_24px_60px_-20px_rgba(29,30,28,0.35)] duration-200 motion-reduce:animate-none"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-ink-black text-[16px] font-semibold">Customize</p>
              <p className="text-ash mt-0.5 text-[12px]">Prototype only. Saved in this browser.</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-ironwood hover:bg-paper-white inline-flex size-8 items-center justify-center rounded-full"
            >
              <X aria-hidden className="size-4" />
            </button>
          </div>

          <fieldset className="mt-5">
            <legend className="text-ironwood text-[13px] font-semibold">Accent</legend>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {accents.map((a) => (
                <Swatch
                  key={a.id}
                  color={a.value}
                  label={a.label}
                  selected={choice.accent === a.id}
                  onClick={() => set({ accent: a.id })}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="text-ironwood text-[13px] font-semibold">Canvas</legend>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {canvases.map((c) => (
                <Swatch
                  key={c.id}
                  color={c.value}
                  label={c.label}
                  selected={choice.canvas === c.id}
                  onClick={() => set({ canvas: c.id })}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="text-ironwood text-[13px] font-semibold">Display font</legend>
            <div className="mt-2.5">
              <FontPicker
                fonts={displayFonts}
                value={choice.display}
                onChange={(display) => set({ display })}
                sample="display"
              />
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="text-ironwood text-[13px] font-semibold">Body font</legend>
            <div className="mt-2.5">
              <FontPicker
                fonts={bodyFonts}
                value={choice.body}
                onChange={(body) => set({ body })}
                sample="body"
              />
            </div>
          </fieldset>

          <fieldset className="border-hairline mt-5 border-t pt-5">
            <legend className="sr-only">Section layouts</legend>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-ironwood text-[13px] font-semibold">Section layouts</p>
                <p className="text-ash mt-0.5 text-[12px]">
                  A dropdown on each section switches its layout.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={layout.switchers}
                aria-label="Show layout dropdowns on sections"
                onClick={() => updatePrototypeLayout({ switchers: !layout.switchers })}
                className={cn(
                  "relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition-colors duration-200",
                  layout.switchers ? "bg-ink-black" : "bg-bone"
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "bg-paper-white absolute size-5 rounded-full shadow-sm transition-transform duration-200",
                    layout.switchers ? "translate-x-[18px]" : "translate-x-0.5"
                  )}
                />
              </button>
            </div>
            <button
              type="button"
              onClick={resetPrototypeLayout}
              className="text-ironwood hover:text-ink-black mt-3 inline-flex h-8 items-center gap-1.5 text-[13px] font-semibold"
            >
              <RotateCcw aria-hidden className="size-3.5" /> Reset all layouts to default
            </button>
          </fieldset>

          <div className="border-hairline mt-5 flex items-center justify-between gap-2 border-t pt-4">
            <button
              type="button"
              onClick={() => setChoice(DEFAULT)}
              className="text-ironwood hover:text-ink-black inline-flex h-9 items-center gap-1.5 text-[13px] font-semibold"
            >
              <RotateCcw aria-hidden className="size-3.5" /> Reset to DESIGN.md
            </button>
            <button
              type="button"
              onClick={copyCss}
              className="bg-ink-black text-cream-canvas hover:bg-ironwood inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold"
            >
              {copied ? (
                <Check aria-hidden className="size-3.5" />
              ) : (
                <Copy aria-hidden className="size-3.5" />
              )}
              {copied ? "Copied" : "Copy CSS"}
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="bg-ink-black text-cream-canvas hover:bg-ironwood inline-flex h-11 items-center gap-2 rounded-full pr-4 pl-3 text-[14px] font-semibold shadow-[0_10px_30px_-10px_rgba(29,30,28,0.5)] transition-colors duration-200 active:translate-y-px"
      >
        <Palette aria-hidden className="size-[18px]" strokeWidth={2} />
        Customize
      </button>
    </div>
  );
}
