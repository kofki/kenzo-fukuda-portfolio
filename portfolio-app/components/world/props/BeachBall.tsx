import type { CSSProperties } from "react";

interface BeachBallProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function BeachBall({ size = 40, className, style }: BeachBallProps) {
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
      <circle cx="20" cy="20" r="18" fill="currentColor" />
      <path d="M20 2 A18 18 0 0 1 20 38 Z" fill="var(--surface)" opacity="0.55" />
      <path d="M2 20 A18 18 0 0 1 38 20" stroke="var(--surface)" strokeWidth="2" opacity="0.5" fill="none" />
      <circle cx="20" cy="20" r="3.5" fill="var(--surface)" />
    </svg>
  );
}
