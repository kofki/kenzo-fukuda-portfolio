import type { CSSProperties } from "react";

interface ShellProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function Shell({ size = 28, className, style }: ShellProps) {
  return (
    <svg
      width={size}
      height={size * 0.94}
      viewBox="0 0 32 30"
      fill="none"
      aria-hidden
      className={className}
      style={style}
    >
      <path
        d="M16 28 C4 24 2 10 8 4 C10 12 12 12 16 12 C20 12 22 12 24 4 C30 10 28 24 16 28 Z"
        fill="currentColor"
      />
      <circle cx="16" cy="26.5" r="2" fill="currentColor" />
      <g stroke="var(--surface)" strokeWidth="1.3" strokeLinecap="round" opacity="0.55">
        <path d="M16 26 L16 12" />
        <path d="M16 26 L9 9" />
        <path d="M16 26 L23 9" />
        <path d="M16 26 L12 10.5" />
        <path d="M16 26 L20 10.5" />
      </g>
    </svg>
  );
}
