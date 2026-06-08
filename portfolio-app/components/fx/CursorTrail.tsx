"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Spawns a single expanding ripple ring at the given coordinates. */
function spawnRipple(layer: HTMLDivElement, x: number, y: number) {
  const ring = document.createElement("span");
  ring.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:9999px;border:1.5px solid var(--coral);`;
  layer.appendChild(ring);

  const animation = ring.animate(
    [
      { transform: "scale(0.3)", opacity: 0.55 },
      { transform: "scale(2.6)", opacity: 0 },
    ],
    { duration: 750, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
  );
  animation.onfinish = () => ring.remove();
}

/** Cursor ripple trail - desktop pointers only, disabled for reduced motion. */
export function CursorTrail() {
  const layerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let lastSpawn = 0;
    const onMove = (event: PointerEvent) => {
      if (event.timeStamp - lastSpawn < 55) return; // throttle spawns
      lastSpawn = event.timeStamp;
      spawnRipple(layer, event.clientX, event.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  return (
    <div
      ref={layerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55] overflow-hidden"
    />
  );
}
