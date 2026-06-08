import type { CSSProperties } from "react";

interface GuitarProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function Guitar({ size = 130, className, style }: GuitarProps) {
  return (
    <svg
      width={size * 0.42}
      height={size}
      viewBox="0 0 54 130"
      fill="none"
      aria-hidden
      className={className}
      style={style}
    >
      <rect x="22" y="6" width="9" height="62" rx="3" fill="currentColor" />
      <rect x="20.5" y="2" width="12" height="9" rx="2" fill="currentColor" />
      <path
        d="M27 60 C44 60 50 78 50 92 C50 112 40 126 27 126 C14 126 4 112 4 92 C4 78 10 60 27 60 Z"
        fill="currentColor"
      />
      <circle cx="27" cy="92" r="9" fill="var(--surface)" />
      <rect x="24" y="104" width="6" height="10" rx="1.5" fill="var(--surface)" opacity="0.7" />
      <g stroke="var(--surface)" strokeWidth="0.7" opacity="0.5">
        <path d="M24 9 L24.5 104" />
        <path d="M26.5 9 L27 104" />
        <path d="M29 9 L29.5 104" />
      </g>
      <g fill="var(--surface)" opacity="0.6">
        <circle cx="21" cy="5" r="1.2" />
        <circle cx="21" cy="8.5" r="1.2" />
        <circle cx="32" cy="5" r="1.2" />
        <circle cx="32" cy="8.5" r="1.2" />
      </g>
    </svg>
  );
}
