"use client";

import { useSyncExternalStore } from "react";

/**
 * Prototype layout choices, per browser. A tiny external store (not React state) so the server
 * render always uses defaults and the saved choice applies right after hydration, without a
 * mismatch.
 */
type State = { variants: Record<string, string>; switchers: boolean };

const KEY = "sl-prototype-variants";
const SERVER: State = { variants: {}, switchers: true };
let state: State | null = null;
const listeners = new Set<() => void>();

function read(): State {
  if (state) return state;
  try {
    const saved = localStorage.getItem(KEY);
    state = saved ? { ...SERVER, ...JSON.parse(saved) } : SERVER;
  } catch {
    state = SERVER;
  }
  return state!;
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function usePrototypeLayout() {
  return useSyncExternalStore(subscribe, read, () => SERVER);
}

export function updatePrototypeLayout(patch: Partial<State>) {
  const cur = read();
  state = {
    ...cur,
    ...patch,
    variants: { ...cur.variants, ...(patch.variants ?? {}) }
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
  listeners.forEach((l) => l());
}

export function resetPrototypeLayout() {
  state = { ...SERVER };
  try {
    localStorage.removeItem(KEY);
  } catch {}
  listeners.forEach((l) => l());
}
