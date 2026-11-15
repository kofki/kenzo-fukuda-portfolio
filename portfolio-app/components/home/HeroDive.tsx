"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { BeachScene, DiveContext } from "@/components/home/BeachScene";
import { LiveScene } from "@/components/home/LiveScene";
import { PlungeBubbles } from "@/components/home/PlungeBubbles";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { playBloop, playSplash, soundAwake } from "@/lib/worldSound";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** 0 → 1 as scroll progress goes from `from` to `to`, clamped. */
const ramp = (v: number, from: number, to: number) => clamp01((v - from) / (to - from));


// Droplets clinging to the lens along the waterline: [left %, offset px from
// the line, size px, seconds for their slow wobble].
const DROPLETS: [number, number, number, number][] = Array.from({ length: 14 }, (_, i) => [
  (i * 41.7 + 6) % 100,
  ((i * 13) % 34) - 22,
  3 + ((i * 7) % 11),
  3 + ((i * 5) % 4),
]);

/**
 * By this share of the scroll the waterline has come up from the bottom of the
 * screen to the shoreline, as the sand passes under the camera. From there it
 * climbs over the sea in the print, then the sky, until you are under.
 */
const DIP = 0.12;

/** The half-under shot: camera at water level, horizon on the waterline. */
const HALF = 0.45;

/**
 * Where the dive breaks the surface, as a share of the hero's pinned scroll.
 * `SeaBackdrop` starts at exactly this point, so keep the two in step.
 */
export const SURFACE = 0.8;

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
  const splashed = useRef(false);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // How far the camera has gone, beach to surface. The sand layer in
  // BeachScene leaves on this; the sky and sea follow the camera rig below.
  const dive = useTransform(p, (v) => ramp(v, 0, SURFACE));
  // As the surface comes up to the lens the light turns cool and blue.
  const chill = useTransform(p, (v) => Math.pow(ramp(v, 0.2, SURFACE), 1.4) * 0.25);
  const textOpacity = useTransform(p, (v) => 1 - ramp(v, 0.01, 0.07));
  const textY = useTransform(p, (v) => `${-ramp(v, 0.01, 0.08) * 18}%`);

  // Frame and scene sizes in px. The scene is max(frame height, 2/3 of its
  // width) tall and anchored to the bottom of the frame.
  const size = useRef({ hf: 800, hs: 800 });
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const measure = () => {
      const hf = el.clientHeight || 1;
      size.current = { hf, hs: Math.max(hf, (el.clientWidth * 2) / 3) };
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /**
   * The camera rig, in three moves (positions in px from the top of the frame):
   *
   * 1. Stepping in (to DIP): the sand passes under the camera and the water
   *    comes up from the bottom of the screen to the shoreline.
   * 2. Down to water level (to HALF): the sky pushes in and the horizon comes
   *    down towards the middle; the sea flattens into a thin strip, as it does
   *    when your eyes reach the surface, and the waterline rides just under
   *    it. This is the half-under shot.
   * 3. Under (to SURFACE): the sky, the strip and the line slide up and away.
   */
  const rig = (v: number) => {
    const { hf, hs } = size.current;
    const hor0 = hf - hs + 0.751 * hs;
    const band0 = 0.133 * hs;
    const horHalf = 0.4 * hf;
    const flat = 0.32;
    // The waterline waits below the screen until the sand has gone and only
    // water is left; then it comes up.
    if (v <= DIP) return { water: hf + 40, hor: hor0, sy: 1, zoom: 1 };
    if (v <= HALF) {
      const t = ramp(v, DIP, HALF);
      const b = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const hor = hor0 + (horHalf - hor0) * b;
      const sy = 1 + (flat - 1) * b;
      // From below the screen up to the near edge of the flattening sea.
      const rise = 1 - Math.pow(1 - ramp(t, 0, 0.55), 2);
      const edge = hor + band0 * sy;
      return { water: hf + 40 + (edge - hf - 40) * rise, hor, sy, zoom: 1 + 0.3 * b };
    }
    const c = Math.pow(ramp(v, HALF, SURFACE), 1.15);
    const waterHalf = horHalf + band0 * flat;
    const lift = c * (waterHalf + 60);
    return { water: waterHalf - lift, hor: horHalf - lift, sy: flat, zoom: 1.3 };
  };
  const hor0 = () => {
    const { hf, hs } = size.current;
    return hf - hs + 0.751 * hs;
  };
  const skyY = useTransform(p, (v) => rig(v).hor - hor0());
  const zoom = useTransform(p, (v) => rig(v).zoom);
  const seaSY = useTransform(p, (v) => rig(v).sy);
  const layers = { dive, skyY, zoom, seaSY };

  // The waterline as a share of the frame from the bottom: 0 at the bottom
  // of the screen, 1 past the top. The beach sits in a box whose bottom edge
  // rides up with it (the box moves up, its contents move back down by the
  // same amount), all in transforms.
  const line = (v: number) => Math.min(1.1, Math.max(0, 1 - rig(v).water / size.current.hf));
  const boxY = useTransform(p, (v) => `${-line(v) * 100}%`);
  const innerY = useTransform(p, (v) => `${line(v) * 100}%`);
  const foamY = useTransform(p, (v) => `${-line(v) * 100}cqh`);
  // The camera tips a little as it comes down to the water, then levels out
  // as it goes under; the waterline tilts with it.
  const roll = useTransform(p, (v) => Math.sin(ramp(v, DIP, SURFACE) * Math.PI) * -1.2);
  const lineValue = useTransform(p, line);
  // The bubble rush runs from the half-under moment until a little after you
  // are under.
  const plunge = useTransform(p, (v) => ramp(v, HALF - 0.08, Math.min(1, SURFACE + 0.13)));
  const foamOpacity = useTransform(p, (v) => (v < DIP + 0.01 || v > SURFACE + 0.02 ? 0 : 1));

  useMotionValueEvent(p, "change", (v) => {
    const el = frame.current;
    if (!el) return;
    if (v > 0.015) el.dataset.diving = "";
    else delete el.dataset.diving;
    // The splash as you go under, once each way down.
    const crossed = v > HALF + 0.03;
    if (crossed && !splashed.current && soundAwake()) {
      playSplash();
      window.setTimeout(playBloop, 260);
    }
    splashed.current = crossed;
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
          <motion.div className="absolute -inset-x-[4%] inset-y-0 overflow-hidden will-change-transform" style={{ y: boxY, rotate: roll }}>
            <motion.div className="absolute inset-y-0 left-[3.7%] right-[3.7%] will-change-transform" style={{ y: innerY }}>
              <DiveContext.Provider value={layers}>
                <BeachScene />
              </DiveContext.Provider>
              <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-[#1d5f80] mix-blend-soft-light" style={{ opacity: chill }} />
              <motion.div className="pointer-events-none absolute inset-0 z-20 will-change-transform [&>*]:h-full" style={{ opacity: textOpacity, y: textY }}>
                {children}
              </motion.div>
            </motion.div>
          </motion.div>
          <PlungeBubbles line={lineValue} plunge={plunge} />
          {/* The waterline as it climbs, on the same curve the beach is cut
              along: the underside of the surface glowing just below it, the
              band of water on the lens, and droplets clinging along it. */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-x-[4%] bottom-0 z-30 h-0 will-change-transform"
            style={{ y: foamY, rotate: roll, opacity: foamOpacity }}
          >
            {/* Just under the line the water is the same navy as the sea above
                it, deepening into the water below: one sea, not two. */}
            <div className="absolute inset-x-0 top-0 h-[30cqh] bg-[linear-gradient(180deg,#2b546f_0%,rgba(43,84,111,0.6)_30%,rgba(43,84,111,0)_100%)] dark:bg-[linear-gradient(180deg,#0b2c4e_0%,rgba(11,44,78,0.6)_30%,rgba(11,44,78,0)_100%)]" />
            {/* The foam itself is the print's own shoreline wash, straightened
                into one band, so the line is drawn in the same ink as the
                waves beside it. */}
            <div className="absolute inset-x-0 top-[-1.8cqh] h-[3.6cqh] bg-[url(/scenes/waves/waterline-day.webp)] bg-[length:auto_100%] bg-repeat-x dark:hidden" />
            <div className="absolute inset-x-0 top-[-1.8cqh] hidden h-[3.6cqh] bg-[url(/scenes/waves/waterline-night.webp)] bg-[length:auto_100%] bg-repeat-x dark:block" />
            {DROPLETS.map(([left, dy, size, secs], i) => (
              <span
                key={i}
                className="absolute rounded-full border-[1.5px] border-[#efe4cb]/85 bg-[#efe4cb]/10 animate-[drop-wobble_var(--s)_ease-in-out_infinite]"
                style={{ left: `${left}%`, bottom: -dy, width: size, height: size * 1.12, animationDelay: `${-i * 0.7}s`, ["--s" as string]: `${secs}s` }}
              />
            ))}
          </motion.div>
        </LiveScene>
      </div>
    </div>
  );
}
