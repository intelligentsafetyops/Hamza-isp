/**
 * The untangling rope, in 3D.
 *
 * One tube built from a Catmull-Rom curve. Each control point lerps between a tangled coil and
 * a straight line; `progress` (0 → 1, driven by scroll) sweeps the straightening left to right,
 * so the rope reads in the same order as the lifecycle. Seven beads (the stages) settle onto
 * the line as their stretch of rope straightens. While a stretch is still tangled it sways a
 * little; once straight it holds still.
 *
 * Imperative and framework-free so it can be code-split and loaded only when needed.
 */
import * as THREE from "three";

export type RopeColors = { ink: string; twist: string; flame: string };

/** Where each stage bead sits along the rope (0 = left end, 1 = right end). */
export const STAGE_T = [0.24, 0.355, 0.47, 0.585, 0.7, 0.815, 0.93];
/** The straight rope spans this fraction of the canvas width, centred. */
export const SPAN = 0.84;

const POINTS = 56;
const SEGMENTS = 420;
const FOV = 28;
const CAMERA_Z = 14;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (x: number) => {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
};

/** How straight the rope is at position t for overall progress p (left straightens first). */
export function localProgress(t: number, p: number) {
  return smooth(p * 1.7 - t * 0.7);
}

function stripeTexture(colors: RopeColors) {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const g = c.getContext("2d")!;
  g.fillStyle = colors.ink;
  g.fillRect(0, 0, 64, 64);
  // Diagonal twist: two thin light stripes per tile, like the dashed twist on the 2D rope.
  g.strokeStyle = colors.twist;
  g.lineWidth = 5;
  for (const off of [0, 32]) {
    g.beginPath();
    g.moveTo(off - 32, 64);
    g.lineTo(off + 32, 0);
    g.moveTo(off + 32, 64);
    g.lineTo(off + 96, 0);
    g.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

export function createRopeScene(canvas: HTMLCanvasElement, colors: RopeColors) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
  camera.position.set(0, 0, CAMERA_Z);

  scene.add(new THREE.HemisphereLight(0xfff4e8, 0x8a7f72, 1.6));
  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(-4, 6, 8);
  scene.add(key);

  let texture = stripeTexture(colors);
  const ropeMat = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.6, metalness: 0 });
  let rope: THREE.Mesh<THREE.TubeGeometry, THREE.MeshStandardMaterial> | null = null;

  const beadGeo = new THREE.SphereGeometry(1, 32, 16);
  const beadMat = new THREE.MeshStandardMaterial({ color: colors.ink, roughness: 0.35 });
  const endMat = new THREE.MeshStandardMaterial({ color: colors.flame, roughness: 0.35 });
  const beads = STAGE_T.map((_, i) => {
    const m = new THREE.Mesh(beadGeo, i === STAGE_T.length - 1 ? endMat : beadMat);
    m.scale.setScalar(0.0001);
    scene.add(m);
    return m;
  });

  // World-space length of the straight rope; set on resize from the visible width.
  let length = 10;
  let progress = 0;
  let time = 0;
  const control = Array.from({ length: POINTS }, () => new THREE.Vector3());
  const curve = new THREE.CatmullRomCurve3(control, false, "centripetal");

  function tangled(t: number, out: THREE.Vector3) {
    // A loose coil with irregular loop sizes and depth: loops backtrack along x, so it knots.
    const loops = 6.5;
    const a = Math.PI * 2 * loops * t + 0.4;
    const envelope = Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.04)), 0.6);
    const r = Math.max(length * 0.068, 0.5) * (0.7 + 0.45 * Math.sin(t * 9.1 + 1.3)) * envelope;
    out.set(
      (t - 0.5) * length * 0.72 + r * Math.sin(a) * 1.25,
      r * Math.cos(a) * 1.3 + length * 0.02 * Math.sin(t * 17),
      r * Math.sin(a + 0.7) * 1.6
    );
    return out;
  }

  const a = new THREE.Vector3();
  const b = new THREE.Vector3();

  function build() {
    for (let i = 0; i < POINTS; i++) {
      const t = i / (POINTS - 1);
      const k = localProgress(t, progress);
      tangled(t, a);
      b.set((t - 0.5) * length * SPAN, 0, 0);
      control[i].lerpVectors(a, b, k);
      // Idle sway only where the rope is still tangled.
      const sway = (1 - k) * length * 0.006;
      control[i].y += Math.sin(time * 1.2 + t * 11) * sway;
      control[i].z += Math.cos(time * 0.9 + t * 7) * sway;
    }
    curve.updateArcLengths();

    const radius = Math.max(0.03, length * 0.0038);
    const geo = new THREE.TubeGeometry(curve, SEGMENTS, radius, 10, false);
    if (rope) {
      rope.geometry.dispose();
      rope.geometry = geo;
    } else {
      rope = new THREE.Mesh(geo, ropeMat);
      scene.add(rope);
    }
    texture.repeat.set(Math.round(length * 9), 1);

    STAGE_T.forEach((t, i) => {
      const k = localProgress(t, progress);
      const s = smooth((k - 0.82) / 0.18) * radius * (i === STAGE_T.length - 1 ? 3.3 : 2.6);
      beads[i].position.copy(curve.getPoint(t));
      beads[i].scale.setScalar(Math.max(0.0001, s));
    });
  }

  function render() {
    build();
    renderer.render(scene, camera);
  }

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const visibleW = 2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * CAMERA_Z * camera.aspect;
    length = visibleW;
    render();
  }

  let raf = 0;
  let last = 0;
  function loop(now: number) {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    time += dt;
    render();
    raf = requestAnimationFrame(loop);
  }

  return {
    setProgress(p: number) {
      progress = clamp01(p);
      if (!raf) render();
    },
    setColors(next: RopeColors) {
      texture.dispose();
      texture = stripeTexture(next);
      ropeMat.map = texture;
      ropeMat.needsUpdate = true;
      beadMat.color.set(next.ink);
      endMat.color.set(next.flame);
      render();
    },
    resize,
    start() {
      if (raf) return;
      last = 0;
      raf = requestAnimationFrame(loop);
    },
    stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    },
    dispose() {
      cancelAnimationFrame(raf);
      raf = 0;
      rope?.geometry.dispose();
      ropeMat.dispose();
      texture.dispose();
      beadGeo.dispose();
      beadMat.dispose();
      endMat.dispose();
      renderer.dispose();
    }
  };
}

export type RopeScene = ReturnType<typeof createRopeScene>;
