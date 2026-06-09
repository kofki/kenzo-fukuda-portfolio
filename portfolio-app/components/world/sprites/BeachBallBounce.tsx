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
