import type { CSSProperties } from "react";

interface WalkerProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
  flip?: boolean;
}

const limb = (origin: string, delay: string): CSSProperties => ({
  transformBox: "fill-box",
  transformOrigin: origin,
  animationDelay: delay,
});

/** A person strolling, arms and legs swinging in a real walk cycle. */
export function Walker({ size = 72, className, style, flip = false }: WalkerProps) {
  return (
    <svg
      width={size * 0.48}
      height={size}
      viewBox="0 0 40 84"
      fill="none"
      aria-hidden
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined, ...style }}
    >
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        <path className="animate-swing" style={limb("20px 50px", "-0.31s")} d="M20 50 L13 79" />
        <path className="animate-swing" style={limb("20px 50px", "0s")} d="M20 50 L27 79" />
        <path className="animate-swing" style={limb("20px 30px", "0s")} d="M20 30 L12 47" />
        <path className="animate-swing" style={limb("20px 30px", "-0.31s")} d="M20 30 L28 47" />
        <path d="M20 27 L20 52" />
      </g>
      <circle cx="20" cy="17" r="8" fill="currentColor" />
    </svg>
  );
}
