import type { CSSProperties } from "react";

interface BoatProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/** A small sailboat: hull, mast, and two sails. Bob it via animate-bob. */
export function Boat({ size = 40, className, style }: BoatProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={className}
      style={style}
    >
      <path d="M23 6 L23 31 L8 31 Z" fill="currentColor" opacity="0.92" />
      <path d="M27 13 L40 31 L27 31 Z" fill="currentColor" opacity="0.62" />
      <rect x="22.5" y="6" width="2" height="26" rx="1" fill="currentColor" />
      <path d="M6 33 L42 33 L36 43 L12 43 Z" fill="currentColor" />
    </svg>
  );
}
