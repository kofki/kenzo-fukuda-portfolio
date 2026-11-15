import { WaterMood } from "@/components/home/WaterMood";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Fades a scenery layer out at its top and bottom edges, so it melts into the
 * section's water colour. Each section starts with the colour the previous
 * one ends with, so with every image faded at its edges there is no line
 * anywhere in the dive.
 */
export function fadeEdges(top = 14, bottom = 86): CSSProperties {
  const mask = `linear-gradient(180deg, transparent 0%, #000 ${top}%, #000 ${bottom}%, transparent 100%)`;
  return { maskImage: mask, WebkitMaskImage: mask };
}

/**
 * Shell for every section below the surface. Text is always cream on deep
 * water, whatever the theme; dark mode only dims the water a little so the
 * whole dive reads as night.
 */
export function Underwater({
  id,
  label,
  background,
  spill = false,
  mood = true,
  glow,
  scenery,
  children,
  className,
}: {
  id: string;
  label?: string;
  /** CSS background for the water itself, usually a gradient. */
  background: string;
  /** Let grounded scenery reach down past the bottom edge (clips sideways only). */
  spill?: boolean;
  /** Draw this section's own day/night water. Off where `SeaBackdrop` does it. */
  mood?: boolean;
  /** Lights that shine through the night water, drawn above it. */
  glow?: ReactNode;
  /** Images and moving layers behind the content. */
  scenery?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      data-underwater
      aria-label={label}
      className={cn("relative text-cream", spill ? "overflow-x-clip" : "overflow-clip", className)}
      style={{ background }}
    >
      {scenery}
      {mood ? (
        <div aria-hidden>
          <WaterMood />
        </div>
      ) : null}
      {glow}
      {/* Taps pass through empty space to the creatures behind; text and
          controls still catch them. */}
      <div className="pointer-events-none relative z-10 [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_dl]:pointer-events-auto [&_figure]:pointer-events-auto [&_h2]:pointer-events-auto [&_h3]:pointer-events-auto [&_li]:pointer-events-auto [&_p]:pointer-events-auto">
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-hand text-2xl leading-none text-coral-soft" style={{ rotate: "-2deg" }}>
      {children}
    </p>
  );
}

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn("mt-2 font-display text-[clamp(2rem,5vw,3rem)] leading-[1.08] text-cream", className)}>
      {children}
    </h2>
  );
}
