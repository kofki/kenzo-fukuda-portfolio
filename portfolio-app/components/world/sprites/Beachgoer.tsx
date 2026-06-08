import type { CSSProperties } from "react";

interface BeachgoerProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
  flip?: boolean;
}

export function Beachgoer({ size = 70, className, style, flip = false }: BeachgoerProps) {
  return (
    <svg
      width={size * 0.5}
      height={size}
      viewBox="0 0 40 84"
      fill="none"
      aria-hidden
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined, ...style }}
    >
      <g
        className="animate-sway"
        style={{ transformBox: "fill-box", transformOrigin: "20px 82px" }}
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      >
        <path d="M20 52 L15 80" />
        <path d="M20 52 L25 80" />
        <path d="M20 30 L20 54" />
        <path d="M20 34 L14 50" />
        <path d="M20 34 L28 26 L23 21" />
        <circle cx="20" cy="17" r="8" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
