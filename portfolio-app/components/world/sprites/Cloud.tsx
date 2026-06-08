import type { CSSProperties } from "react";

interface CloudProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/** A soft, puffy cloud built from overlapping lobes (no icon library). */
export function Cloud({ size = 90, className, style }: CloudProps) {
  return (
    <svg
      width={size}
      height={size * 0.62}
      viewBox="0 0 100 62"
      fill="currentColor"
      aria-hidden
      className={className}
      style={style}
    >
      <ellipse cx="30" cy="40" rx="24" ry="18" />
      <ellipse cx="55" cy="33" rx="27" ry="23" />
      <ellipse cx="77" cy="42" rx="20" ry="16" />
      <rect x="12" y="40" width="76" height="20" rx="10" />
    </svg>
  );
}
