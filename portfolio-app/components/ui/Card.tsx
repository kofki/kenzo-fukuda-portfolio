import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Scatter angles for hand-placed prints. Keyed off a caller-supplied seed rather
// than Math.random so the server and client agree and the tilt never jumps
// between renders.
const TILTS = [-2.1, 1.4, -0.9, 2.3, -1.6, 1.1];

/**
 * A Polaroid print. The frame gutters and bottom ledge come from `.polaroid` in
 * globals.css (real SX-70 proportions); children supply a `.polaroid-window`
 * for the square photo and a `.polaroid-caption` for the ledge.
 */
export function Card({
  children,
  className,
  seed = "",
}: {
  children: ReactNode;
  className?: string;
  /** Any stable string (a slug works) — picks this print's scatter angle. */
  seed?: string;
}) {
  let total = 0;
  for (let i = 0; i < seed.length; i += 1) total += seed.charCodeAt(i);
  const tilt = TILTS[total % TILTS.length];

  return (
    <div
      // The tilt travels as a custom property so `hover:rotate-0` can still win.
      // In Tailwind v4 rotate/translate are independent properties, so the
      // straighten-on-hover and the lift compose without fighting.
      className={cn(
        "group polaroid relative rotate-[var(--tilt)] transition-all duration-500 hover:rotate-0 hover:-translate-y-1",
        className,
      )}
      style={{ "--tilt": `${tilt}deg` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
