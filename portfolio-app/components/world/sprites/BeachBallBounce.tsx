"use client";

import { useRef, useState, type CSSProperties } from "react";
import { BeachBall } from "@/components/world/props/BeachBall";
import { useWorldTap } from "@/lib/useWorldTap";
import { playBounce } from "@/lib/worldSound";

interface BeachBallBounceProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function BeachBallBounce({ size, className, style }: BeachBallBounceProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Bumping the key remounts the animated span so the hop replays every tap.
  const [bounceKey, setBounceKey] = useState(0);

  useWorldTap(wrapperRef, () => {
    setBounceKey((k) => k + 1);
    playBounce();
  });

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className={className}
      // Transparent padding enlarges the tap target — the ball itself is only
      // ~30px, far too small to reliably hit on the -z-10 background.
      style={{ padding: 18, ...style }}
    >
      <span
        key={bounceKey}
        style={{
          display: "inline-block",
          transformOrigin: "50% 100%",
          animation: bounceKey > 0 ? "ball-squash 0.6s cubic-bezier(0.3, 0.8, 0.5, 1)" : undefined,
        }}
      >
        <BeachBall size={size} />
      </span>
    </div>
  );
}
