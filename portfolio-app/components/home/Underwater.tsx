import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Shell for every section below the surface. Text is always cream on deep
 * water, whatever the theme; dark mode only dims the water a little so the
 * whole dive reads as night.
 */
export function Underwater({
  id,
  label,
  background,
  scenery,
  children,
  className,
}: {
  id: string;
  label?: string;
  /** CSS background for the water itself, usually a gradient. */
  background: string;
  /** Images and moving layers behind the content. */
  scenery?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn("relative overflow-hidden text-cream", className)}
      style={{ background }}
    >
      {scenery}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#050c1c] opacity-0 transition-opacity duration-700 dark:opacity-30"
      />
      <div className="relative z-10">{children}</div>
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
