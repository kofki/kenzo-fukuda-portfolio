"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Make a decorative element in the fixed `-z-10` world background tappable.
 *
 * The world sits behind page content, so it can't receive normal DOM clicks.
 * Instead we listen for `pointerdown` on `window` (passive, never
 * preventDefault — so it adds a reaction without stealing clicks from
 * foreground links/buttons) and hit-test the pointer against the element's
 * bounding box. This mirrors the pattern already used in `Sea.tsx`.
 *
 * Works with mouse and touch (we intentionally do NOT gate on
 * `(pointer: fine)`). No-ops under prefers-reduced-motion.
 */
export function useWorldTap(
  ref: RefObject<HTMLElement | null>,
  onTap: (x: number, y: number) => void,
  options?: { enabled?: boolean },
): void {
  const reduced = useReducedMotion();
  const enabled = options?.enabled ?? true;

  // Keep the latest handler in a ref so the listener never goes stale and we
  // never re-subscribe just because `onTap` was re-created on render.
  const handlerRef = useRef(onTap);
  useEffect(() => {
    handlerRef.current = onTap;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !enabled) return;

    const onDown = (event: PointerEvent) => {
      // Ignore taps when the element (or an ancestor — e.g. the dive layer that
      // fades to opacity 0 on scroll) is invisible. Otherwise these fixed
      // sprites stay tappable after they've scrolled out of view.
      if (
        typeof el.checkVisibility === "function" &&
        !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })
      ) {
        return;
      }
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;
      handlerRef.current(x, y);
    };

    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, [ref, reduced, enabled]);
}
