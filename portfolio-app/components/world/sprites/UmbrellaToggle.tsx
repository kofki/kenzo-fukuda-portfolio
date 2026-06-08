"use client";

import { useRef, useState, type CSSProperties } from "react";
import { Umbrella } from "@/components/world/props/Umbrella";
import { useWorldTap } from "@/lib/useWorldTap";
import { playWhoosh } from "@/lib/worldSound";

interface UmbrellaToggleProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function UmbrellaToggle({ size, className, style }: UmbrellaToggleProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);

  useWorldTap(wrapperRef, () => {
    setCollapsed((c) => !c);
    playWhoosh();
  });

  return (
    <div ref={wrapperRef} aria-hidden className={className} style={style}>
      <Umbrella size={size} collapsed={collapsed} />
    </div>
  );
}
