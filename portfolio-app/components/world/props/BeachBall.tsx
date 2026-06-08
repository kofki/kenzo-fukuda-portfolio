import type { CSSProperties } from "react";

interface BeachBallProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function BeachBall({ size = 40, className, style }: BeachBallProps) {
  // Same palette as the Volleyball sprite: white body, ink-toned lines.
  const line = "color-mix(in oklab, var(--ink) 40%, transparent)";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      className={className}
      style={style}
    >
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="white"
        stroke="color-mix(in oklab, var(--ink) 22%, transparent)"
        strokeWidth="1"
      />
      {/* Beach-ball panels: longitude lines from pole to pole. */}
      <g fill="none" stroke={line} strokeWidth="1.4" strokeLinecap="round">
        <path d="M20 2 L20 38" />
        <path d="M20 2 C8 12 8 28 20 38" />
        <path d="M20 2 C32 12 32 28 20 38" />
      </g>
      <circle cx="20" cy="20" r="2.4" fill={line} />
    </svg>
  );
}
