"use client";

import { useRef, useState, type CSSProperties } from "react";
import { Surfboard } from "@/components/world/props/Surfboard";
import { useWorldTap } from "@/lib/useWorldTap";
import { playKnock } from "@/lib/worldSound";

interface SurfboardRockProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function SurfboardRock({ size, className, style }: SurfboardRockProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Bumping the key remounts the animated span so the rock replays every tap.
  const [rockKey, setRockKey] = useState(0);

  useWorldTap(wrapperRef, () => {
    setRockKey((k) => k + 1);
    playKnock();
  });

  return (
    <div ref={wrapperRef} aria-hidden className={className} style={style}>
      <span
        key={rockKey}
        style={{
          display: "inline-block",
          // Pivot at the base — the board is planted in the sand.
          transformOrigin: "50% 100%",
          animation: rockKey > 0 ? "surf-wobble 0.66s ease-out" : undefined,
        }}
      >
        <Surfboard size={size} />
      </span>
    </div>
  );
}
