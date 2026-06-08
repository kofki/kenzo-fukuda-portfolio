import type { CSSProperties } from "react";

interface SurfboardProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/** A surfboard standing upright in the sand, with a fin and a leash. */
export function Surfboard({ size = 120, className, style }: SurfboardProps) {
  return (
    <svg
      width={size * 0.32}
      height={size}
      viewBox="0 0 40 120"
      fill="none"
      aria-hidden
      className={className}
      style={style}
    >
      {/* board */}
      <path
        d="M20 2 C29 22 31 60 27 98 C25 112 15 112 13 98 C9 60 11 22 20 2 Z"
        fill="currentColor"
      />
      {/* stringer */}
      <path d="M20 7 L20 104" stroke="var(--surface)" strokeWidth="1.5" opacity="0.5" />
      {/* nose accent stripe */}
      <path d="M14 34 C18 30 22 30 26 34" stroke="var(--surface)" strokeWidth="2.5" opacity="0.55" fill="none" />
      {/* fin near the tail */}
      <path d="M27 96 C33 99 34 104 31 108 C29 104 27 102 25 100 Z" fill="currentColor" />
      {/* leash */}
      <path d="M20 108 C26 112 28 116 24 119" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
    </svg>
  );
}
