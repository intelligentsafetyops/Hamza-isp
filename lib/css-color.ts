/** Resolve a CSS custom property to a #rrggbb colour three.js can read (handles color-mix()). */
export function resolveCssColor(name: string) {
  const probe = document.createElement("span");
  probe.style.color = `var(${name})`;
  probe.style.display = "none";
  document.body.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  probe.remove();
  const c = document.createElement("canvas").getContext("2d")!;
  c.fillStyle = "#000";
  c.fillStyle = computed;
  c.fillRect(0, 0, 1, 1);
  const [r, g, b] = c.getImageData(0, 0, 1, 1).data;
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
