import type { CSSProperties } from "react";

interface CrabProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
  flip?: boolean;
}

const leg = (origin: string, delay: string): CSSProperties => ({
  transformBox: "fill-box",
  transformOrigin: origin,
  animationDelay: delay,
});

export function Crab({ size = 44, className, style, flip = false }: CrabProps) {
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 64 46"
      fill="none"
      aria-hidden
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined, ...style }}
    >
      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <g className="animate-jiggle" style={leg("18px 31px", "0s")}>
          <path d="M22 30 L10 25" />
          <path d="M22 33 L8 33" />
          <path d="M22 36 L11 42" />
        </g>
        <g className="animate-jiggle" style={leg("46px 31px", "-0.16s")}>
          <path d="M42 30 L54 25" />
          <path d="M42 33 L56 33" />
          <path d="M42 36 L53 42" />
        </g>
      </g>

      <g fill="currentColor">
        <path d="M16 26 q-9 -2 -12 -9 q5 -1 8 2 q1 -4 4 -4 q2 5 0 11 Z" />
        <path d="M48 26 q9 -2 12 -9 q-5 -1 -8 2 q-1 -4 -4 -4 q-2 5 0 11 Z" />
        <ellipse cx="32" cy="31" rx="16" ry="10" />
      </g>

      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M27 23 L26 15" />
        <path d="M37 23 L38 15" />
      </g>
      <circle cx="26" cy="13" r="2.6" fill="currentColor" />
      <circle cx="38" cy="13" r="2.6" fill="currentColor" />
      <circle cx="26.7" cy="12.2" r="0.9" fill="var(--surface)" />
      <circle cx="38.7" cy="12.2" r="0.9" fill="var(--surface)" />
    </svg>
  );
}
