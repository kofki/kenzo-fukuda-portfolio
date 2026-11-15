"use client";

import { useState } from "react";
import { fish, kelp } from "@/components/home/creatureLayers";
import { SwimSprite } from "@/components/home/SwimSprite";
import { playSwish } from "@/lib/worldSound";

function Fish({ index }: { index: number }) {
  const f = fish[index];
  const [dart, setDart] = useState(0);
  const fromLeft = index === 0;
  return (
    <div
      className="absolute"
      style={{
        top: `${18 + index * 34}%`,
        left: fromLeft ? "4%" : undefined,
        right: fromLeft ? undefined : "4%",
        width: "clamp(56px, 7vw, 110px)",
        aspectRatio: `${f.width} / ${f.height}`,
        animation: `fish-swim ${fromLeft ? 38 : 46}s ease-in-out ${fromLeft ? 0 : -12}s infinite`,
        ["--swim" as string]: fromLeft ? "38vw" : "-38vw",
      }}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        onClick={() => {
          playSwish();
          setDart((d) => d + 1);
        }}
        className="pointer-events-auto block h-full w-full cursor-pointer"
      >
        <span key={dart} className="block h-full w-full" style={{ animation: dart ? "fish-dart 600ms ease-out" : undefined }}>
          <SwimSprite src={f.src} beat={0.95 + index * 0.25} kick={0.8} className="h-full w-full brightness-[2.6] saturate-[0.8]" />
        </span>
      </button>
    </div>
  );
}

// Kelp growing from the rocky slopes on either side of Atlantis, placed in
// % of the city print's frame: where each clump stands on the rock (its
// base), how tall it is, and its own sway. All from the clean right-hand kelp
// in the kelp print (the left one has stray ink stuck to it).
const CITY_KELP: { side: "left" | "right"; at: number; base: number; height: number; mirror: boolean; secs: number }[] = [
  // The two big clumps reach right up out of Contact into Logbook's water.
  { side: "left", at: 0.5, base: 34, height: 155, mirror: true, secs: 12 },
  { side: "left", at: 7.5, base: 20, height: 62, mirror: false, secs: 8.6 },
  { side: "right", at: 1.5, base: 26, height: 150, mirror: false, secs: 13 },
  { side: "right", at: 9, base: 15, height: 58, mirror: true, secs: 9.4 },
];

/**
 * Kelp on the rocks of Atlantis, in front of the city print and moving with
 * it. The tallest clumps grow up past the top of Contact into Logbook, so the
 * two sections share one kelp forest. Each fades into the rock at its foot
 * and into the water at its tip, and sways slowly in the current.
 */
export function CityKelp() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {CITY_KELP.map((c, i) => (
        <span
          key={i}
          className="absolute block"
          style={{ [c.side]: `${c.at}%`, bottom: `${c.base}%`, height: `${c.height}%`, transform: c.mirror ? "scaleX(-1)" : undefined }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={kelp[1].src}
            alt=""
            decoding="async"
            className="block h-full w-auto max-w-none origin-bottom brightness-[2.5] saturate-[0.8] dark:brightness-[1.7]"
            style={{
              animation: `kelp-wave ${c.secs}s ease-in-out ${-i * 1.7}s infinite`,
              maskImage: "linear-gradient(180deg,transparent 0%,#000 14%,#000 90%,transparent 100%)",
              WebkitMaskImage: "linear-gradient(180deg,transparent 0%,#000 14%,#000 90%,transparent 100%)",
            }}
          />
        </span>
      ))}
    </div>
  );
}

/** Two fish swimming through the kelp. */
export function KelpFish() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {fish.map((f, i) => (
        <Fish key={f.src} index={i} />
      ))}
    </div>
  );
}
