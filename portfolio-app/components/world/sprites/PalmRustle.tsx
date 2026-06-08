"use client";

import { useRef, useState, type CSSProperties } from "react";
import { Palm } from "@/components/world/props/Palm";
import { useWorldTap } from "@/lib/useWorldTap";
import { playRustle } from "@/lib/worldSound";

interface PalmRustleProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function PalmRustle({ size, className, style }: PalmRustleProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [rustling, setRustling] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useWorldTap(wrapperRef, () => {
    setRustling(true);
    playRustle();
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setRustling(false), 900);
  });

  return (
    <div ref={wrapperRef} aria-hidden className={className} style={style}>
      <Palm size={size} rustling={rustling} />
    </div>
  );
}
