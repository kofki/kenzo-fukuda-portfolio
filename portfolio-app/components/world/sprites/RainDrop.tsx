import type { CSSProperties } from "react";

interface RainDropProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function RainDrop({ size = 12, className, style }: RainDropProps) {
  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 10 15"
      fill="currentColor"
      aria-hidden
      className={className}
      style={style}
    >
      <path d="M5 0 C5 0 9 7 9 10 A4 4 0 1 1 1 10 C1 7 5 0 5 0 Z" />
    </svg>
  );
}
