"use client";

import { useState, type CSSProperties } from "react";
import { jellies, type Creature } from "@/components/home/creatureLayers";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { playBloop, playWhoosh } from "@/lib/worldSound";

function Jelly({ c, index }: { c: Creature; index: number }) {
  const [pulse, setPulse] = useState(false);
  const reduced = useReducedMotion();
  const isRay = c.src.includes("ray");
  const idle = isRay
    ? `ray-glide ${16 + index}s ease-in-out infinite`
    : `jelly-drift ${7 + index * 1.7}s ease-in-out ${-index * 2.1}s infinite`;

  return (
    <button
      type="button"
      tabIndex={-1}
      aria-hidden
      onClick={() => {
        if (isRay) playWhoosh();
        else playBloop();
        if (reduced) return;
        setPulse(false);
        requestAnimationFrame(() => setPulse(true));
      }}
      className="pointer-events-auto absolute cursor-pointer"
      style={
        {
          left: `${c.left}%`,
          top: `${c.top}%`,
          width: `${c.width}%`,
          height: `${c.height}%`,
          animation: idle,
          "--drift": `${-14 - (index % 3) * 8}px`,
          "--tilt": `${index % 2 ? -1.2 : 1}deg`,
        } as CSSProperties
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={c.src}
        alt=""
        decoding="async"
        onAnimationEnd={() => setPulse(false)}
        className="block h-full w-full origin-top"
        style={{ animation: pulse ? `${isRay ? "fish-dart" : "jelly-pulse"} 900ms ease-out` : undefined }}
      />
    </button>
  );
}

/** The jellyfish and the ray from the deep-water print, each drifting on its own. */
export function Jellies() {
  return (
    <div className="relative aspect-[3/2]">
      {jellies.map((c, i) => (
        <Jelly key={c.src} c={c} index={i} />
      ))}
    </div>
  );
}
