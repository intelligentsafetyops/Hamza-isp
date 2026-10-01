/**
 * The hero backdrop, in 3D: a field of dots rolling in slow waves, in the accent colour.
 *
 * One THREE.Points grid on the ground plane; the wave is computed in the vertex shader from a
 * single time uniform, so the CPU does nothing per frame but bump that number. The pointer
 * lifts a soft swell where it hovers. Dots fade with depth and toward the sides so the field
 * dissolves into the page instead of ending at an edge.
 *
 * Imperative and framework-free so it can be code-split and loaded only when needed.
 */
import * as THREE from "three";

const COLS = 140;
const ROWS = 64;
const WIDTH = 44;
const DEPTH = 26;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform vec2 uPointer;
  uniform float uPointerStrength;
  varying float vFade;

  void main() {
    vec3 p = position;
    float w = sin(p.x * 0.32 + uTime * 0.7) * 0.55
            + cos(p.z * 0.42 + uTime * 0.5) * 0.45
            + sin((p.x + p.z) * 0.18 - uTime * 0.4) * 0.35;
    float d = distance(p.xz, uPointer);
    w += uPointerStrength * 1.1 * exp(-d * d * 0.06);
    p.y += w;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (12.0 / -mv.z);

    float depth = smoothstep(${(-DEPTH / 2).toFixed(1)}, 2.0, p.z);
    float sides = 1.0 - smoothstep(${(WIDTH * 0.32).toFixed(1)}, ${(WIDTH * 0.5).toFixed(1)}, abs(p.x));
    vFade = depth * sides * (0.55 + 0.45 * smoothstep(-1.0, 1.4, w));
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vFade;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    gl_FragColor = vec4(uColor, smoothstep(0.5, 0.25, r) * vFade * uOpacity);
    #include <colorspace_fragment>
  }
`;

export function createWaveScene(canvas: HTMLCanvasElement, color: string) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(pixelRatio);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 5.5, 13);
  camera.lookAt(0, 0, -3);

  const positions = new Float32Array(COLS * ROWS * 3);
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = (r * COLS + c) * 3;
      positions[i] = (c / (COLS - 1) - 0.5) * WIDTH;
      positions[i + 1] = 0;
      positions[i + 2] = (r / (ROWS - 1) - 0.75) * DEPTH;
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const uniforms = {
    uTime: { value: 0 },
    uSize: { value: 3.2 * pixelRatio },
    uColor: { value: new THREE.Color(color) },
    uOpacity: { value: 0.75 },
    uPointer: { value: new THREE.Vector2(999, 999) },
    uPointerStrength: { value: 0 }
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false
  });
  scene.add(new THREE.Points(geometry, material));

  // Pointer → point on the ground plane, eased so the swell glides rather than jumps.
  const raycaster = new THREE.Raycaster();
  const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const hit = new THREE.Vector3();
  const target = new THREE.Vector2(999, 999);
  let targetStrength = 0;

  let time = 0;
  let raf = 0;
  let last = 0;

  function render() {
    renderer.render(scene, camera);
  }

  function loop(now: number) {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    time += dt;
    uniforms.uTime.value = time;
    uniforms.uPointer.value.lerp(target, Math.min(1, dt * 4));
    uniforms.uPointerStrength.value +=
      (targetStrength - uniforms.uPointerStrength.value) * Math.min(1, dt * 3);
    render();
    raf = requestAnimationFrame(loop);
  }

  return {
    resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Narrow screens: pull back so the field still spans the width.
      camera.position.z = w < 640 ? 18 : 13;
      camera.lookAt(0, 0, -3);
      camera.updateProjectionMatrix();
      render();
    },
    /** x, y in normalised device coordinates (-1…1); null when the pointer leaves. */
    setPointer(ndc: { x: number; y: number } | null) {
      if (!ndc) {
        targetStrength = 0;
        return;
      }
      raycaster.setFromCamera(new THREE.Vector2(ndc.x, ndc.y), camera);
      if (raycaster.ray.intersectPlane(ground, hit)) {
        if (targetStrength === 0) uniforms.uPointer.value.set(hit.x, hit.z);
        target.set(hit.x, hit.z);
        targetStrength = 1;
      }
    },
    setColor(next: string) {
      uniforms.uColor.value.set(next);
      render();
    },
    /** Freeze on a still frame (reduced motion). */
    still() {
      uniforms.uTime.value = 2.4;
      render();
    },
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
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    }
  };
}

export type WaveScene = ReturnType<typeof createWaveScene>;
