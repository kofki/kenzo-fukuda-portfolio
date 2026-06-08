import type { CSSProperties } from "react";

interface UmbrellaProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function Umbrella({ size = 120, className, style }: UmbrellaProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden
      className={className}
      style={style}
    >
      <path d="M60 40 L60 114" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 114 l-6 8 M60 114 l6 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="34" r="3.5" fill="currentColor" />
      <path
        d="M10 44 A52 40 0 0 1 110 44
           C101 53 93 53 85 44
           C77 53 69 53 61 44
           C53 53 45 53 37 44
           C29 53 21 53 13 44
           Z"
        fill="currentColor"
      />
      <g stroke="var(--surface)" strokeWidth="1.6" opacity="0.45">
        <path d="M60 40 L37 47" />
        <path d="M60 40 L85 47" />
        <path d="M60 40 L13 46" />
        <path d="M60 40 L107 46" />
      </g>
    </svg>
  );
}
