"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { BeachScene } from "@/components/home/BeachScene";
import { LiveScene } from "@/components/home/LiveScene";
import { PlungeBubbles } from "@/components/home/PlungeBubbles";
import { useReducedMotion } from "@/lib/useReducedMotion";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** 0 → 1 as scroll progress goes from `from` to `to`, clamped. */
const ramp = (v: number, from: number, to: number) => clamp01((v - from) / (to - from));

// The waterline, drawn like the print's breakers: one 720 x 28 tile of a
// rolling wave that repeats across the screen. The beach above is cut along
// the same curve (a mask), and the foam and its ink line are drawn on it.
const TILE_W = 720;
const TILE_H = 28;
const waveY = (x: number) => {
  const t = (x / TILE_W) * Math.PI * 2;
  return 14 + 5.5 * Math.sin(2 * t) + 2.2 * Math.sin(5 * t + 1.1) + 1 * Math.sin(9 * t + 2.3);
};
const wavePoints = (dy = 0) =>
  Array.from({ length: TILE_W / 8 + 1 }, (_, i) => `${i * 8} ${(waveY(i * 8) + dy).toFixed(1)}`).join(" L");
const svgUrl = (body: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${TILE_W}' height='${TILE_H}' viewBox='0 0 ${TILE_W} ${TILE_H}'>${body}</svg>`)}")`;
// Opaque above the wave, clear below it.
const WAVE_MASK = svgUrl(`<path d='M0 0 L${wavePoints()} L${TILE_W} 0 Z' fill='black'/>`);
// Foam on the crest with a thin ink line under it, as the print draws its waves.
const WAVE_FOAM = svgUrl(
  `<path d='M${wavePoints(2.6)}' fill='none' stroke='#16395a' stroke-width='1.6' stroke-linecap='round'/>` +
    `<path d='M${wavePoints(0)}' fill='none' stroke='#efe4cb' stroke-width='3.4' stroke-linecap='round'/>` +
    `<path d='M${wavePoints(-2.2)}' fill='none' stroke='#fbf6ea' stroke-width='1.2' stroke-linecap='round' opacity='0.8'/>`,
);
const BEACH_MASK = {
  maskImage: `${WAVE_MASK}, linear-gradient(#000, #000)`,
  WebkitMaskImage: `${WAVE_MASK}, linear-gradient(#000, #000)`,
  maskSize: `${TILE_W}px ${TILE_H}px, 100% calc(100% - ${TILE_H - 1}px)`,
  WebkitMaskSize: `${TILE_W}px ${TILE_H}px, 100% calc(100% - ${TILE_H - 1}px)`,
  maskPosition: "left bottom, left top",
  WebkitMaskPosition: "left bottom, left top",
  maskRepeat: "repeat-x, no-repeat",
  WebkitMaskRepeat: "repeat-x, no-repeat",
} as const;

/** Where the waterline starts climbing the screen, as a share of the scroll. */
const DIP = 0.5;

/**
 * Where the dive breaks the surface, as a share of the hero's pinned scroll.
 * `SeaBackdrop` starts at exactly this point, so keep the two in step.
 */
export const SURFACE = 0.86;

/**
 * Transition 1, the dive. The hero holds still while the camera leans in
 * towards the sea and the name falls away. Then the camera dips under: the
 * waterline, edged with foam, climbs up the screen. Below it is the water
 * itself (`SeaBackdrop`, the surface seen from below with sunlight coming
 * down); above it the beach is still there, until the line passes the top.
 * As it goes, a rush of bubbles streams up past the camera, as if you had
 * just jumped in. From there you just keep sinking into Projects.
 *
 * The cut-out waves hold still while the camera pushes in, so their edges
 * never come apart.
 *
 * The sticky frame is a size container: the beach and the hero text both size
 * themselves from it (cqh / cqw), so they stay locked together even when the
 * frame's 620px minimum is taller than the window.
 *
 * Reduced motion: no pin and no dive, just the hero.
 */
export function HeroDive({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const beachBox = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // The camera pushes in towards the sea and tips down to it: up to 2.8x,
  // aimed below the horizon, while the frame slides up so the water fills
  // the screen. The slide is small enough that the bottom of the scaled
  // scene never lifts off the bottom of the frame.
  const push = (v: number) => Math.pow(ramp(v, 0.02, SURFACE), 1.5);
  const zoom = useTransform(p, (v) => 1 + 1.8 * push(v));
  const tilt = useTransform(p, (v) => `${-push(v) * 26}%`);
  const textOpacity = useTransform(p, (v) => 1 - ramp(v, 0.02, 0.24));
  const textY = useTransform(p, (v) => `${-ramp(v, 0.02, 0.3) * 18}%`);
  // The waterline: 0 at the bottom of the screen, 1 past the top. The beach
  // sits in a box whose bottom edge rides up with it (the box moves up, its
  // contents move back down by the same amount), all in transforms.
  const line = (v: number) => Math.pow(ramp(v, DIP, SURFACE), 0.9);
  const boxY = useTransform(p, (v) => `${-line(v) * 100}%`);
  const innerY = useTransform(p, (v) => `${line(v) * 100}%`);
  const foamY = useTransform(p, (v) => `${-line(v) * 100}cqh`);
  // The camera rolls a little as it goes under, like a body in the swell; the
  // waterline tilts with it.
  const roll = useTransform(p, (v) => Math.sin(line(v) * Math.PI * 2) * 0.7 * (1 - line(v) * 0.5));
  const lineValue = useTransform(p, line);
  // The bubble rush runs from when the waterline appears until a little after
  // you are under.
  const plunge = useTransform(p, (v) => ramp(v, DIP + 0.02, Math.min(1, SURFACE + 0.13)));
  const foamOpacity = useTransform(p, (v) => (v < DIP || v > SURFACE + 0.02 ? 0 : 1));

  useMotionValueEvent(p, "change", (v) => {
    const el = frame.current;
    if (!el) return;
    if (v > 0.015) el.dataset.diving = "";
    else delete el.dataset.diving;
    // Cut the beach along the wave only while the waterline is on screen.
    const box = beachBox.current;
    if (!box) return;
    const dipping = v > DIP;
    if (dipping !== (box.dataset.dipping === "")) {
      if (dipping) box.dataset.dipping = "";
      else delete box.dataset.dipping;
      for (const [k, val] of Object.entries(BEACH_MASK)) box.style.setProperty(k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`).replace(/^webkit/, "-webkit"), dipping ? val : "");
    }
  });

  if (reduced) {
    return (
      <div ref={ref} className="relative">
        <LiveScene className="relative h-[100svh] min-h-[620px] overflow-hidden [container-type:size]">
          <BeachScene />
          {children}
        </LiveScene>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[200svh] max-sm:h-[170svh]">
      <div ref={frame} className="sticky top-0 h-[100svh] min-h-[620px]">
        <LiveScene className="absolute inset-0 overflow-hidden [container-type:size]">
          <motion.div className="absolute -inset-x-[4%] inset-y-0 overflow-hidden will-change-transform" ref={beachBox} style={{ y: boxY, rotate: roll }}>
            <motion.div className="absolute inset-y-0 left-[3.7%] right-[3.7%] will-change-transform" style={{ y: innerY }}>
              {/* Lean in on the sea a little below the horizon (the horizon
                  is max(24.6cqh, 16.4cqw) up from the bottom of the frame). */}
              <motion.div
                className="absolute inset-0 will-change-transform"
                style={{ scale: zoom, y: tilt, transformOrigin: "50% calc(100% - max(15cqh, 10cqw))" }}
              >
                <BeachScene />
              </motion.div>
              <motion.div className="pointer-events-none absolute inset-0 z-20 will-change-transform [&>*]:h-full" style={{ opacity: textOpacity, y: textY }}>
                {children}
              </motion.div>
            </motion.div>
          </motion.div>
          <PlungeBubbles line={lineValue} plunge={plunge} />
          {/* The foam along the waterline as it climbs, on the same curve
              the beach is cut along. */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-x-[4%] bottom-0 z-30 will-change-transform"
            style={{ height: TILE_H, y: foamY, rotate: roll, opacity: foamOpacity, backgroundImage: WAVE_FOAM, backgroundSize: `${TILE_W}px ${TILE_H}px`, backgroundRepeat: "repeat-x" }}
          />
        </LiveScene>
      </div>
    </div>
  );
}
