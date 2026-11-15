import type { CSSProperties } from "react";

// The prints draw almost every fish facing left; these face right.
const FACES_RIGHT = new Set(["/scenes/live/city-fish-1.webp", "/scenes/creatures/kelp-fish-0.webp"]);

export const facesRight = (src: string) => FACES_RIGHT.has(src);

/**
 * A flat fish cut-out that actually swims. The sprite is drawn twice and cut
 * at the tail joint (about 60% of the way back from the head): the tail half
 * sweeps from side to side, narrowing as it turns towards or away from us,
 * and the front half yaws against it, so the body flexes with every kick.
 * Each fish gets its own beat. Pure CSS, so it pauses with its scene.
 */
export function SwimSprite({
  src,
  beat = 0.9,
  kick = 1,
  delay = 0,
  className = "",
  style,
  mark,
}: {
  src: string;
  /** Seconds per full tail beat. */
  beat?: number;
  /** How hard it kicks: 1 for a fish going somewhere, less for one that is
   * just hanging in the water. */
  kick?: number;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  /** Adds data-<mark> to the wrapper, for scripts that move the fish. */
  mark?: string;
}) {
  const right = facesRight(src);
  const joint = right ? 40 : 60; // % from the left edge
  const timing = `${beat}s ease-in-out ${delay}s infinite`;
  // Each half is a window that shows only its part of the sprite (the image
  // inside is the full fish, shifted), with a sliver of overlap at the joint.
  const half = (part: "tail" | "body") => {
    const tailIsLeft = right;
    const isLeft = part === "tail" ? tailIsLeft : !tailIsLeft;
    const from = isLeft ? 0 : part === "tail" ? joint : joint - 3;
    const to = isLeft ? (part === "tail" ? joint : joint + 3) : 100;
    const width = to - from;
    return (
      <span
        className="absolute inset-y-0 overflow-hidden"
        style={{
          left: `${from}%`,
          width: `${width}%`,
          transformOrigin: isLeft ? "100% 50%" : "0% 50%",
          animation: `${part === "tail" ? "fish-tail" : "fish-body"} ${timing}`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          decoding="async"
          draggable={false}
          className="absolute inset-y-0 h-full max-w-none select-none"
          style={{ width: `${(100 / width) * 100}%`, left: `${(-from / width) * 100}%` }}
        />
      </span>
    );
  };
  return (
    <span data-swim {...(mark ? { [`data-${mark}`]: "" } : {})} className={`relative block will-change-transform ${className}`} style={{ ...style, ["--kick" as string]: kick }}>
      {half("tail")}
      {half("body")}
    </span>
  );
}
