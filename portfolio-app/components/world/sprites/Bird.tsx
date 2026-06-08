import type { CSSProperties } from "react";

interface BirdProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/** A gull silhouette whose wings flap as it glides across the sky. */
export function Bird({ size = 26, className, style }: BirdProps) {
  return (
    <svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 44 22"
      fill="none"
      aria-hidden
      className={className}
      style={style}
    >
      <path
        className="animate-glide"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        d="M2 11 C9 3 16 11 22 13 C28 11 35 3 42 11"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
