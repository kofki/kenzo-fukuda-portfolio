"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function useWorldTap(
  ref: RefObject<HTMLElement | null>,
  onTap: (x: number, y: number) => void,
  options?: { enabled?: boolean },
): void {
  const reduced = useReducedMotion();
  const enabled = options?.enabled ?? true;

  const handlerRef = useRef(onTap);
  useEffect(() => {
    handlerRef.current = onTap;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !enabled) return;

    const onDown = (event: PointerEvent) => {
      // Skip taps on an element that's invisible (e.g. faded out on scroll) so off-screen sprites aren't tappable.
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
