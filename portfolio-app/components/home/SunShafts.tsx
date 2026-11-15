"use client";

import gsap from "gsap";
import { useRef } from "react";
import { useSceneGsap } from "@/lib/useSceneGsap";

// Where each shaft starts along the surface (% of width), how wide it is, and
// how far down it reaches (% of the layer). They lean the same way as the
// shafts drawn in the sea print, top right to bottom left.
const SHAFTS = [
  { left: 8, width: 6, reach: 62 },
  { left: 21, width: 9, reach: 80 },
  { left: 36, width: 5, reach: 70 },
  { left: 45, width: 8, reach: 96 },
  { left: 56, width: 6, reach: 74 },
  { left: 64, width: 10, reach: 100 },
  { left: 76, width: 6, reach: 86 },
  { left: 86, width: 8, reach: 66 },
];

/**
 * Sunlight coming down from the surface in long shafts, one layer from the
 * dive down past Projects to the reef, so the light carries on instead of
 * stopping at a section edge. Each shaft brightens and dims on its own.
 */
export function SunShafts() {
  const root = useRef<HTMLDivElement>(null);
  useSceneGsap(root, (q) =>
    q("[data-shaft]").map((el, i) =>
      gsap.fromTo(
        el,
        { opacity: 0.35 },
        { opacity: () => gsap.utils.random(0.55, 1), duration: () => gsap.utils.random(2.5, 5), ease: "sine.inOut", repeat: -1, yoyo: true, repeatRefresh: true, delay: -i * 0.9 },
      ),
    ),
  );
  return (
    <div ref={root} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen">
      {SHAFTS.map((s, i) => (
        <span
          key={i}
          data-shaft
          className="absolute top-0 origin-top will-change-[opacity]"
          style={{
            left: `${s.left}%`,
            width: `${s.width}%`,
            height: `${s.reach}%`,
            transform: "skewX(-9deg)",
            // Soft on both sides and fading downwards, like light, not stripes.
            background: "linear-gradient(90deg, rgba(215,240,238,0) 0%, rgba(215,240,238,0.36) 50%, rgba(215,240,238,0) 100%)",
            maskImage: "linear-gradient(180deg, #000 0%, rgba(0,0,0,0.5) 45%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, #000 0%, rgba(0,0,0,0.5) 45%, transparent 100%)",
          }}
        />
      ))}
    </div>
  );
}
