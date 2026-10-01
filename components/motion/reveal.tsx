"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  as?: "div" | "li" | "figure" | "section";
  className?: string;
  style?: React.CSSProperties;
  /** Stagger position within a group; each step adds 80ms. */
  index?: number;
};

/**
 * Fade-and-rise on first entry. State lives in a data attribute, not React state, so nothing
 * re-renders. Anything already on screen at load is left alone (no flash), content stays
 * visible without JavaScript, and reduced motion skips it entirely.
 */
export function Reveal({ children, as: Tag = "div", className, style, index = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset.reveal = "hidden";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.dataset.reveal = "shown";
        io.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    // Printing never fires the observer; show everything first.
    const show = () => (el.dataset.reveal = "shown");
    window.addEventListener("beforeprint", show);
    return () => {
      io.disconnect();
      window.removeEventListener("beforeprint", show);
    };
  }, []);

  return (
    <Tag
      ref={ref as any}
      className={className}
      style={{ ...style, ["--reveal-delay" as string]: `${index * 80}ms` }}
    >
      {children}
    </Tag>
  );
}
