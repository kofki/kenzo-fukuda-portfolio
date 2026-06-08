"use client";

import { useEffect, useRef } from "react";
import { Boat } from "@/components/world/sprites/Boat";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";

const WATER_PATH =
  "M0,50 C240,22 480,78 720,50 C960,22 1200,78 1440,50 C1680,22 1920,78 2160,50 C2400,22 2640,78 2880,50 L2880,100 L0,100 Z";
const FOAM_PATH =
  "M0,34 C240,6 480,62 720,34 C960,6 1200,62 1440,34 C1680,6 1920,62 2160,34 C2400,6 2640,62 2880,34 L2880,100 L0,100 Z";

const BOATS = [
  { top: "28%", size: 30, dur: "92s", delay: "-16s", color: "text-ink/55" },
  { top: "40%", size: 22, dur: "118s", delay: "-70s", color: "text-ink/40" },
];

function spawnRipple(layer: HTMLDivElement, x: number, y: number) {
  const ring = document.createElement("span");
  ring.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:9999px;border:2px solid var(--foam);`;
  layer.appendChild(ring);

  const animation = ring.animate(
    [
      { transform: "scale(0.4)", opacity: 0.6 },
      { transform: "scale(7)", opacity: 0 },
    ],
    { duration: 1100, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
  );
  animation.onfinish = () => ring.remove();
}

export function Sea() {
  const reduced = useReducedMotion();
  const waterRef = useRef<HTMLDivElement>(null);
  const swellRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const water = waterRef.current;
    const swell = swellRef.current;
    if (!water || reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let last = 0;
    const onMove = (event: PointerEvent) => {
      if (event.timeStamp - last < 30) return;
      last = event.timeStamp;
      const rect = water.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      if (!swell) return;
      swell.style.opacity = inside ? "0.5" : "0";
      if (inside) swell.style.transform = `translate(${x}px, -50%) translate(-50%, 0)`;
    };

    const onDown = (event: PointerEvent) => {
      const rect = water.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;
      spawnRipple(water, x, y);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [reduced]);

  return (
    <div aria-hidden className="absolute inset-x-0 bottom-[19vh] h-[16vh] leading-[0]">
      {!reduced
        ? BOATS.map((boat) => (
            <div
              key={boat.top}
              className="absolute left-0 z-[1] animate-walk will-change-transform"
              style={{ top: boat.top, animationDuration: boat.dur, animationDelay: boat.delay }}
            >
              <span className="inline-block animate-bob">
                <Boat size={boat.size} className={boat.color} />
              </span>
            </div>
          ))
        : null}

      <svg
        className={cn(
          "absolute bottom-0 left-0 h-full w-[200%] text-foam [animation-duration:18s]",
          !reduced && "animate-wave",
        )}
        viewBox="0 0 2880 100"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d={FOAM_PATH} />
      </svg>

      <svg
        className={cn("absolute bottom-0 left-0 h-full w-[200%]", !reduced && "animate-wave")}
        viewBox="0 0 2880 100"
        preserveAspectRatio="none"
        fill="currentColor"
        style={{ color: "var(--sea-top)" }}
      >
        <path d={WATER_PATH} />
      </svg>

      <div ref={waterRef} className="absolute inset-x-0 bottom-0 h-[58%]">
        <span
          ref={swellRef}
          className="absolute left-0 top-1/2 h-12 w-44 rounded-full bg-foam blur-2xl transition-[transform,opacity] duration-300 will-change-transform"
          style={{ opacity: 0 }}
        />
      </div>
    </div>
  );
}
