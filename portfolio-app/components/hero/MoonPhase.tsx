"use client";

import { useSyncExternalStore, type CSSProperties } from "react";

// Synodic month and a known new-moon epoch (2000-01-06 18:14 UTC).
const SYNODIC = 29.530588853;
const NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

const CX = 50;
const CY = 50;
const R = 46;

// The phase barely moves within a session, so compute once and cache a stable
// snapshot (useSyncExternalStore needs referential stability). Server -> null
// (a plain full disc) so hydration matches; the real phase appears on mount.
let cachedPhase: number | null = null;
function subscribe(): () => void {
  return () => {};
}
function getSnapshot(): number {
  if (cachedPhase === null) {
    const days = (Date.now() - NEW_MOON) / 86_400_000;
    cachedPhase = (((days % SYNODIC) + SYNODIC) % SYNODIC) / SYNODIC;
  }
  return cachedPhase;
}
function getServerSnapshot(): number | null {
  return null;
}

interface MoonPhaseProps {
  className?: string;
  style?: CSSProperties;
}

/** A clean, minimal moon that still renders the real current phase. */
export function MoonPhase({ className, style }: MoonPhaseProps) {
  const phase = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const lit = "var(--sun)";
  const shadow = "color-mix(in oklab, var(--sky-mid) 78%, var(--sky-top))";

  let face;
  if (phase === null) {
    face = <circle cx={CX} cy={CY} r={R} fill={lit} />;
  } else {
    const angle = 2 * Math.PI * phase;
    const rx = Math.abs(R * Math.cos(angle));
    const gibbous = phase > 0.25 && phase < 0.75;
    const litRight = phase < 0.5; // waxing lights the right limb
    const sweep = litRight ? 1 : 0;
    const litHalf = `M ${CX} ${CY - R} A ${R} ${R} 0 0 ${sweep} ${CX} ${CY + R} Z`;
    face = (
      <>
        <circle cx={CX} cy={CY} r={R} fill={shadow} />
        <path d={litHalf} fill={lit} />
        <ellipse cx={CX} cy={CY} rx={rx} ry={R} fill={gibbous ? lit : shadow} />
      </>
    );
  }

  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className} style={style}>
      {face}

      <circle
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke="color-mix(in oklab, var(--sun) 40%, transparent)"
        strokeWidth="2"
        opacity="0.45"
      />
    </svg>
  );
}
