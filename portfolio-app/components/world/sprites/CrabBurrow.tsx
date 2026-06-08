"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Crab } from "@/components/world/sprites/Crab";
import { useWorldTap } from "@/lib/useWorldTap";
import { playDig } from "@/lib/worldSound";

interface CrabBurrowProps {
  size?: number;
  flip?: boolean;
  className?: string;
  style?: CSSProperties;
}

type Phase = "idle" | "digging" | "hidden" | "rising";

// crab-dig's end state and crab-rise's start state match, so phase changes
// never jump. `forwards` holds the buried pose through the 3s hidden phase.
const ANIM: Record<Phase, string | undefined> = {
  idle: undefined,
  digging: "crab-dig 0.5s ease-in forwards",
  hidden: "crab-dig 0.5s ease-in forwards",
  rising: "crab-rise 0.5s ease-out forwards",
};

const DIG_MS = 500;
const HIDDEN_MS = 3000;

export function CrabBurrow({ size = 32, flip = false, className, style }: CrabBurrowProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  useWorldTap(wrapperRef, () => {
    if (phase !== "idle") return;
    const after = (ms: number, fn: () => void) => {
      timers.current.push(setTimeout(fn, ms));
    };
    setPhase("digging");
    playDig();
    after(DIG_MS, () => setPhase("hidden"));
    after(DIG_MS + HIDDEN_MS, () => {
      setPhase("rising");
      playDig();
    });
    after(DIG_MS + HIDDEN_MS + DIG_MS, () => {
      setPhase("idle");
      timers.current = [];
    });
  });

  const buried = phase !== "idle";

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className={className}
      style={{ position: "relative", display: "inline-block", ...style }}
    >
      <span
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          transform: "translateX(-50%)",
          width: size * 1.05,
          height: size * 0.34,
          borderRadius: "50%",
          background:
            "radial-gradient(50% 60% at 50% 50%, rgba(22,13,4,0.5) 0%, rgba(22,13,4,0.34) 58%, transparent 78%)",
          opacity: buried ? 1 : 0,
          transition: "opacity 300ms ease",
          pointerEvents: "none",
        }}
      />
      <span style={{ display: "inline-block", animation: ANIM[phase] }}>
        <Crab size={size} flip={flip} />
      </span>
    </div>
  );
}
