import type { CSSProperties } from "react";

interface VolleyballNetProps {
  width?: number;
  className?: string;
  style?: CSSProperties;
}

// Deterministic mesh lines so server and client render identically.
const VERTICALS = Array.from({ length: 16 }, (_, i) => 22 + i * 11.6);
const HORIZONTALS = [30, 41, 52];

/** A volleyball net strung between two posts. */
export function VolleyballNet({ width = 220, className, style }: VolleyballNetProps) {
  return (
    <svg
      width={width}
      height={width * 0.5}
      viewBox="0 0 220 110"
      fill="none"
      aria-hidden
      className={className}
      style={style}
    >
      <path
        d="M10 12 L10 104 M210 12 L210 104"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M10 20 L210 20 M10 60 L210 60" stroke="currentColor" strokeWidth="3" />
      <g stroke="currentColor" strokeWidth="1" opacity="0.55">
        {VERTICALS.map((x) => (
          <path key={`v${x}`} d={`M${x} 22 L${x} 58`} />
        ))}
        {HORIZONTALS.map((y) => (
          <path key={`h${y}`} d={`M14 ${y} L206 ${y}`} />
        ))}
      </g>
    </svg>
  );
}
