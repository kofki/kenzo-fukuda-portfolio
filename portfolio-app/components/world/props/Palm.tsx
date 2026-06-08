import type { CSSProperties } from "react";

interface PalmProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

const TRUNK = "#8a5a2b";
const TRUNK_DARK = "#6e4620";

export function Palm({ size = 160, className, style }: PalmProps) {
  return (
    <svg
      width={size * 0.8}
      height={size}
      viewBox="0 0 120 150"
      fill="none"
      aria-hidden
      className={className}
      style={style}
    >
      <g
        className="animate-sway"
        style={{ transformBox: "fill-box", transformOrigin: "60px 150px" }}
      >
        <path
          d="M58 150 C53 110 55 80 64 52"
          stroke={TRUNK}
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <g stroke={TRUNK_DARK} strokeWidth="1.4" strokeLinecap="round" opacity="0.6">
          <path d="M55 132 l8 -1" />
          <path d="M55 112 l9 -1" />
          <path d="M56 92 l9 -1" />
          <path d="M59 72 l8 -1" />
        </g>
        <g fill="currentColor">
          <path d="M64 52 C44 40 26 42 12 52 C30 46 50 48 65 57 Z" />
          <path d="M64 52 C84 40 102 44 114 56 C96 48 78 48 65 57 Z" />
          <path d="M64 52 C58 30 46 18 30 12 C50 24 60 38 65 57 Z" />
          <path d="M64 52 C70 30 84 20 100 16 C80 26 70 40 65 57 Z" />
          <path d="M64 54 C62 40 62 30 64 20 C68 34 68 44 66 57 Z" />
        </g>
        <circle cx="60" cy="56" r="4" fill={TRUNK} />
        <circle cx="68" cy="58" r="4" fill={TRUNK_DARK} />
      </g>
    </svg>
  );
}
