import type { CSSProperties } from "react";

interface FishProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
  flip?: boolean;
}

/** A simple fish whose tail wags gently (animate-sway on the tail group). */
export function Fish({ size = 28, className, style, flip = false }: FishProps) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 50 30"
      fill="none"
      aria-hidden
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined, ...style }}
    >
      <path
        d="M4 15 C12 4 30 4 40 15 C30 26 12 26 4 15 Z"
        fill="currentColor"
      />
      <path
        className="animate-sway"
        style={{ transformBox: "fill-box", transformOrigin: "left center" }}
        d="M39 15 L50 7 L47 15 L50 23 Z"
        fill="currentColor"
      />
      <circle cx="14" cy="13" r="1.8" fill="var(--surface)" />
    </svg>
  );
}
