import type { CSSProperties } from "react";

interface VolleyballProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/** A white volleyball with the classic curved panel seams. */
export function Volleyball({ size = 22, className, style }: VolleyballProps) {
  const seam = "color-mix(in oklab, var(--ink) 50%, transparent)";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
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
      <g fill="none" stroke={seam} strokeWidth="1.4" strokeLinecap="round">
        <path d="M3 16 C13 13 27 13 37 18" />
        <path d="M4 26 C14 31 27 31 36 23" />
        <path d="M16 3 C12 14 12 27 17 37" />
        <path d="M25 3 C28 14 28 26 23 37" />
      </g>
    </svg>
  );
}
