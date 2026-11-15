"use client";

import { useState } from "react";
import { fish, kelp } from "@/components/home/creatureLayers";
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={dart}
          src={f.src}
          alt=""
          decoding="async"
          className="block h-full w-full brightness-[2.6] saturate-[0.8]"
          style={{ animation: dart ? "fish-dart 600ms ease-out" : undefined }}
        />
      </button>
    </div>
  );
}

/** Kelp swaying up both edges of Logbook, with two fish swimming between. */
export function KelpForest() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {kelp.map((k, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={k.src}
          src={k.src}
          alt=""
          decoding="async"
          className="absolute bottom-[-8%] h-[118%] w-auto max-w-none origin-bottom brightness-[2.2] saturate-[0.85]"
          style={{
            [i === 0 ? "left" : "right"]: "-1%",
            animation: `kelp-sway ${8 + i * 1.5}s ease-in-out ${-i * 3}s infinite`,
          }}
        />
      ))}
      {fish.map((f, i) => (
        <Fish key={f.src} index={i} />
      ))}
    </div>
  );
}
