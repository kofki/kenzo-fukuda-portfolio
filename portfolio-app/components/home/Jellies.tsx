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
      {/* At night the jellyfish glow. */}
      {isRay ? null : (
        <span className="absolute -inset-[30%] hidden animate-[glow-breathe_5s_ease-in-out_infinite] rounded-full bg-[radial-gradient(closest-side,rgba(160,235,255,0.55),rgba(120,200,255,0.18)_55%,transparent)] dark:block" />
      )}
      <span
        onAnimationEnd={(e) => {
          if (e.target === e.currentTarget) setPulse(false);
        }}
        className="relative block h-full w-full origin-top dark:brightness-125"
        style={{ animation: pulse ? `${isRay ? "fish-dart" : "jelly-pulse"} 900ms ease-out` : undefined }}
      >
        {isRay ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.src} alt="" decoding="async" className="block h-full w-full" />
        ) : (
          <JellyBody src={c.src} beat={4.2 + (index % 3) * 0.9} delay={-index * 1.3} />
        )}
      </span>
    </button>
  );
}

/**
 * A jellyfish cut into its bell and its tentacles, so they move apart: the
 * bell slowly swells and contracts, and the tentacles trail behind it,
 * swaying in the current a beat later. Pure CSS, paused with its scene.
 */
function JellyBody({ src, beat, delay }: { src: string; beat: number; delay: number }) {
  const BELL = 30; // % of the sprite's height the bell takes up
  const part = (top: number, bottom: number, animation: string, origin: string) => (
    <span
      className="absolute inset-x-0 overflow-hidden"
      style={{ top: `${top}%`, height: `${bottom - top}%`, transformOrigin: origin, animation }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        decoding="async"
        draggable={false}
        className="absolute inset-x-0 block w-full max-w-none"
        style={{ height: `${(100 / (bottom - top)) * 100}%`, top: `${(-top / (bottom - top)) * 100}%` }}
      />
    </span>
  );
  return (
    <span className="relative block h-full w-full">
      {part(BELL - 4, 100, `tentacle-sway ${beat}s ease-in-out ${delay + beat * 0.18}s infinite`, "50% 0%")}
      {part(0, BELL, `bell-pulse ${beat}s ease-in-out ${delay}s infinite`, "50% 100%")}
    </span>
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
