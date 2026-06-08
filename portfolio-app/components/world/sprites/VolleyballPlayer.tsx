import type { CSSProperties } from "react";

interface VolleyballPlayerProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
  flip?: boolean;
  /** Stagger the bump bounce between the two players. */
  delay?: string;
}

/** A player in a bump stance: knees bent, forearms clasped low, bouncing. */
export function VolleyballPlayer({
  size = 70,
  className,
  style,
  flip = false,
  delay = "0s",
}: VolleyballPlayerProps) {
  return (
    <svg
      width={size * 0.52}
      height={size}
      viewBox="0 0 46 84"
      fill="none"
      aria-hidden
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined, ...style }}
    >
      <g
        className="animate-bump"
        style={{ animationDelay: delay, transformBox: "fill-box", transformOrigin: "23px 82px" }}
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M23 50 L15 64 L13 82" />
        <path d="M23 50 L31 64 L33 82" />
        <path d="M23 30 L24 52" />
        <path d="M23 36 L31 50" />
        <path d="M24 36 L33 50" />
        <circle cx="22" cy="18" r="7.5" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
