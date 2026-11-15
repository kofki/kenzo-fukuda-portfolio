"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { RefObject } from "react";

gsap.registerPlugin(useGSAP);

type ContextSafe = <T extends (...args: never[]) => unknown>(fn: T) => T;

/**
 * GSAP for one piece of scenery, following the gsap-react skill: everything is
 * scoped to `scope` and reverted on unmount. `build` sets up the ambient loops
 * and returns them; they only run when the visitor has not asked for reduced
 * motion, and they pause while the scene is off screen (gsap-performance).
 * `build` also receives contextSafe for tap handlers created later.
 */
export function useSceneGsap(
  scope: RefObject<HTMLElement | null>,
  build: (q: (selector: string) => Element[], contextSafe: ContextSafe) => gsap.core.Animation[] | void,
) {
  useGSAP(
    (_context, contextSafe) => {
      const root = scope.current;
      if (!root) return;
      const q = (selector: string) => Array.from(root.querySelectorAll(selector));
      const mm = gsap.matchMedia();
      let loops: gsap.core.Animation[] = [];
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        loops = build(q, contextSafe as ContextSafe) ?? [];
      });
      const io = new IntersectionObserver(
        ([entry]) => loops.forEach((loop) => loop.paused(!entry.isIntersecting)),
        { rootMargin: "120px 0px" },
      );
      io.observe(root);
      return () => {
        io.disconnect();
        mm.revert();
      };
    },
    { scope },
  );
}

/** True when the visitor asked for reduced motion; taps then skip the motion. */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
