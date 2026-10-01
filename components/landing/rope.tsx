/**
 * The rope: one continuous line across "The reality today" (tangled) and the lifecycle
 * (straightened, in the lifecycle track). Drawn as two strokes — an ink body and a dashed parchment twist — so it
 * reads as rope, not as a chart line.
 */

export const TANGLE_PATH =
  "M-20 250 C 60 140, 150 330, 210 240 S 300 70, 360 170 S 250 360, 380 330 S 560 120, 500 210 S 400 380, 560 320 S 720 90, 650 170 S 560 300, 730 300 S 900 110, 840 220 S 760 400, 920 320 S 1080 100, 1010 200 S 960 340, 1100 280 S 1180 230, 1240 250";

export function RopeStrokes({ d }: { d: string }) {
  return (
    <>
      <path
        d={d}
        fill="none"
        stroke="var(--color-ink-black)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        fill="none"
        stroke="var(--color-parchment-shadow)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="5 7"
      />
    </>
  );
}
