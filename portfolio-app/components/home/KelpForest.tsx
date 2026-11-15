"use client";

import { useState } from "react";
import { fish, kelp } from "@/components/home/creatureLayers";
import { SwimSprite } from "@/components/home/SwimSprite";
import { Grounded, Pass } from "@/components/home/Grounded";
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

/**
 * The kelp bed under Logbook: two tall clumps rooted on the sea floor at the
 * edges, swaying slowly. They drift in from the sides as Logbook arrives and
 * part to either side again as we swim on past them.
 */
export function KelpBed() {
  return (
    <Grounded className="h-[130%]">
      {/* Both clumps are the clean right-hand kelp from the print; the left
          one is its mirror image (the left one in the print has stray ink
          stuck to it). */}
      {[0, 1].map((i) => (
        <Pass key={i} to={i === 0 ? "left" : "right"} lag={i * 0.05} enter>
          <span
            className="absolute bottom-0 block h-full"
            style={{ [i === 0 ? "left" : "right"]: "-1%", transform: i === 0 ? "scaleX(-1)" : undefined }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={kelp[1].src}
              alt=""
              decoding="async"
              className="block h-full w-auto max-w-none origin-bottom brightness-[2.2] saturate-[0.85] dark:brightness-[1.5]"
              style={{
                animation: `kelp-sway ${11 + i * 2}s ease-in-out ${-i * 4}s infinite`,
                // The print cut the fronds off at the top; let them fade into
                // the water above instead.
                maskImage: "linear-gradient(180deg,transparent 0%,#000 28%)",
                WebkitMaskImage: "linear-gradient(180deg,transparent 0%,#000 28%)",
              }}
            />
          </span>
        </Pass>
      ))}
    </Grounded>
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
