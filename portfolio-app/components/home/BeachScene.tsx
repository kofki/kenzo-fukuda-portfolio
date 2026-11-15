"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, motionValue, useTransform, type MotionValue } from "motion/react";
import { HeroSky } from "@/components/home/HeroSky";
import { Volleyball } from "@/components/home/Volleyball";
import { dayWaves, nightWaves, type WaveLayer } from "@/components/home/waveLayers";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  playBounce,
  playDig,
  playKnock,
  playStrum,
  playWhoosh,
} from "@/lib/worldSound";

interface Prop {
  key: string;
  /** Image file name when it differs from the key. */
  file?: string;
  label: string;
  /** Position inside the 3:2 scene, in % of its width / height. */
  left: number;
  bottom: number;
  height: number;
  /** One-shot animation played on tap. */
  animation: string;
  duration: number;
  /** Gentle loop while nobody is touching it. */
  idle?: string;
  sound: () => void;
  /** Width / height of each cut-out, so next/image can reserve the space. */
  day: [number, number];
  night: [number, number];
  /** Hidden on phones, where only three props fit beside the button. */
  desktopOnly?: boolean;
}

// Positions match the signed-off Figma hero (page 12), measured on its
// 896 x 597 frame. The skateboard sits on the boardwalk, not the sand.
const PROPS: Prop[] = [
  { key: "skateboard", label: "Roll the skateboard", left: 0.9, bottom: 3.9, height: 3.7, animation: "skate-roll", duration: 700, sound: playKnock, day: [293, 75], night: [283, 72], desktopOnly: true },
  { key: "surfboard", label: "Wobble the surfboard", left: 15.6, bottom: 0.5, height: 13.1, animation: "surf-wobble", duration: 900, idle: "surf-idle 5s ease-in-out infinite", sound: playKnock, day: [94, 340], night: [99, 323], desktopOnly: true },
  { key: "net", file: "net-open", label: "Bounce the volleyball", left: 32.4, bottom: 0.5, height: 10.4, animation: "ball-squash", duration: 500, sound: playBounce, day: [352, 246], night: [329, 212], desktopOnly: true },
  { key: "crab", label: "Poke the crab", left: 55.6, bottom: 0.5, height: 2.6, animation: "crab-poke", duration: 1400, idle: "crab-idle 7s ease-in-out infinite", sound: playDig, day: [184, 129], night: [170, 126] },
  { key: "umbrella", label: "Open and close the umbrella", left: 70.3, bottom: 0.5, height: 14.1, animation: "umbrella-fold", duration: 800, idle: "umbrella-idle 6s ease-in-out infinite", sound: playWhoosh, day: [302, 313], night: [84, 328] },
  { key: "guitar", label: "Strum the guitar", left: 82.8, bottom: 0.7, height: 12.4, animation: "guitar-strum", duration: 700, sound: playStrum, day: [130, 316], night: [121, 285] },
];

function PropButton({ prop }: { prop: Prop }) {
  const [playing, setPlaying] = useState(false);
  const reduced = useReducedMotion();

  return (
    <button
      type="button"
      aria-label={prop.label}
      onClick={() => {
        prop.sound();
        if (reduced) return;
        setPlaying(false);
        requestAnimationFrame(() => setPlaying(true));
      }}
      onAnimationEnd={(event) => {
        if (event.animationName === prop.animation) setPlaying(false);
      }}
      className={`group absolute z-10 origin-bottom cursor-pointer outline-offset-4 ${prop.desktopOnly ? "max-sm:hidden" : ""}`}
      style={{
        left: `${prop.left}%`,
        bottom: `${prop.bottom}%`,
        height: `${prop.height}%`,
        animation: playing ? `${prop.animation} ${prop.duration}ms ease-in-out` : prop.idle,
      }}
    >
      <span className="block h-full transition-transform duration-200 group-hover:-translate-y-[4%] group-active:scale-95">
        <Image
          src={`/props/day/${prop.file ?? prop.key}.webp`}
          alt=""
          width={prop.day[0]}
          height={prop.day[1]}
          className="h-full w-auto dark:hidden"
          sizes="160px"
        />
        <Image
          src={`/props/night/${prop.file ?? prop.key}.webp`}
          alt=""
          width={prop.night[0]}
          height={prop.night[1]}
          className="hidden h-full w-auto dark:block"
          sizes="160px"
        />
      </span>
    </button>
  );
}

/** Spread start times so no two waves break together. */
function waveStyle(layer: WaveLayer, index: number, calm = false): CSSProperties {
  const base: CSSProperties = {
    left: `${layer.left}%`,
    top: `${layer.top}%`,
    width: `${layer.width}%`,
    height: `${layer.height}%`,
  };
  if (layer.kind === "crest") {
    const duration = 7 + ((index * 7) % 5);
    return {
      ...base,
      transformOrigin: "50% 100%",
      animation: `crest-roll ${duration}s ease-in-out ${-((index * 2.3) % duration)}s infinite`,
    };
  }
  if (layer.kind === "glint") {
    // Moonlight on the water shimmers slowly and softly, as dim as the moon;
    // sunlight glitters faster.
    if (calm) return { ...base, animation: `moon-glint ${7 + (index % 3) * 1.6}s ease-in-out ${-index * 1.9}s infinite` };
    return { ...base, animation: `glint ${2.2 + (index % 3) * 0.7}s ease-in-out ${-index * 0.6}s infinite` };
  }
  return { ...base, transformOrigin: "50% 0%", animation: "shore-wash 7s ease-in-out infinite" };
}

function Waves({ layers, className, ready, calm = false }: { layers: WaveLayer[]; className: string; ready: boolean; calm?: boolean }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"} ${className}`}
    >
      {layers.map((layer, index) => (
        // Plain img: these are tiny pre-cut sprites, already WebP and sized.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={layer.src}
          src={layer.src}
          alt=""
          decoding="async"
          data-wave
          className="absolute max-w-none will-change-transform"
          style={waveStyle(layer, index, calm)}
        />
      ))}
    </div>
  );
}

/**
 * The dive camera, from HeroDive: how far it has gone (0 on the beach, 1 at
 * the surface), how far the horizon has moved (px), how far the sky and sea
 * have pushed in, and how flat the sea has become as the camera reached
 * water level. Without it (reduced motion) nothing moves.
 */
export interface DiveLayers {
  dive: MotionValue<number>;
  skyY: MotionValue<number>;
  zoom: MotionValue<number>;
  seaSY: MotionValue<number>;
}
export const DiveContext = createContext<DiveLayers | null>(null);
const zero = motionValue(0);
const one = motionValue(1);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeIn = (t: number) => t * t;

// Where each cut-out layer sits in the 3:2 scene, in % of its height.
const SEA_TOP = 75.098;
const SEA_HEIGHT = 75.684; // runs on below the scene, so it can slide up
const SAND_TOP = { day: 31.738, night: 43.945 };

/**
 * The woodblock beach, cut into three depth layers that move like a camera
 * walking down the beach and into the sea:
 *
 * - the sand, with the palm, the props and the players, is nearest: it rushes
 *   down and out under the camera first, before the waterline arrives;
 * - the sky pushes in and drops with the horizon as the camera comes down
 *   to water level, and the sea flattens into a thin strip under it, the way
 *   the sea looks with your eyes at the surface (HeroDive runs the camera).
 *
 * The scene keeps a 3:2 shape anchored to the bottom of the hero, so the sand,
 * the props and the horizon line up on every screen. Both prints put the
 * horizon 75.4% down and the sand at 92.6%, so switching day and night never
 * moves the sea.
 */
export function BeachScene() {
  // The wave layers are tiny and arrive before the print; keep them hidden
  // until the print under them has loaded, so they never float on nothing.
  const [dayReady, setDayReady] = useState(false);
  const [nightReady, setNightReady] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const rig = useContext(DiveContext);
  const dive = rig?.dive ?? zero;
  const skyY = rig?.skyY ?? zero;
  const zoom = rig?.zoom ?? one;
  const seaSY = rig?.seaSY ?? one;

  // A cached print can finish loading before React attaches onLoad.
  useEffect(() => {
    const imgs = sceneRef.current?.querySelectorAll<HTMLImageElement>("img[data-print]");
    imgs?.forEach((img) => {
      if (!img.complete || !img.naturalWidth) return;
      if (img.dataset.print === "day") setDayReady(true);
      else setNightReady(true);
    });
  }, []);

  // Sand: gone under the camera within the first fifth of the way.
  const sandY = useTransform(dive, (v) => `${easeIn(clamp01(v / 0.15)) * 115}%`);
  const sandScale = useTransform(dive, (v) => 1 + easeIn(clamp01(v / 0.15)) * 0.3);

  const seaWaves = (w: WaveLayer[]) => w.filter((l) => l.kind !== "shore");
  const shoreWaves = (w: WaveLayer[]) => w.filter((l) => l.kind === "shore");

  return (
    <div
      ref={sceneRef}
      data-day-ready={dayReady ? "" : undefined}
      data-night-ready={nightReady ? "" : undefined}
      // The sky's own colours stand in until the print arrives.
      className="absolute bottom-0 left-1/2 aspect-[3/2] h-[max(100cqh,66.67cqw)] -translate-x-1/2 bg-[linear-gradient(180deg,#f1d5ac_0%,#f59b69_62%,#305670_76%,#a6967e_100%)] max-sm:-translate-x-[71%] dark:bg-[linear-gradient(180deg,#08172b_0%,#143f67_62%,#0a2c4e_76%,#2b4761_100%)]"
    >
      {/* Sky, furthest away */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: skyY, scale: zoom, transformOrigin: `50% ${SEA_TOP}%` }}>
        <Image src="/scenes/layers/beach-day-sky.webp" alt="" fill preload data-print="day" onLoad={() => setDayReady(true)} sizes="(max-width: 640px) 260vw, 100vw" className="object-cover transition-opacity duration-700 dark:opacity-0" />
        <Image src="/scenes/layers/beach-night-sky.webp" alt="" fill loading="eager" data-print="night" onLoad={() => setNightReady(true)} sizes="(max-width: 640px) 260vw, 100vw" className="object-cover opacity-0 transition-opacity duration-700 dark:opacity-100" />
        <div data-scene-overlay className="absolute inset-0">
          <HeroSky part="sky" />
        </div>
      </motion.div>

      {/* Sea, in the middle */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: skyY, scaleX: zoom, scaleY: seaSY, transformOrigin: `50% ${SEA_TOP}%` }}>
        <div className="absolute inset-x-0" style={{ top: `${SEA_TOP}%`, height: `${SEA_HEIGHT}%` }}>
          <Image loading="eager" src="/scenes/layers/beach-day-sea.webp" alt="" fill sizes="(max-width: 640px) 260vw, 100vw" className="object-fill transition-opacity duration-700 dark:opacity-0" />
          <Image loading="eager" src="/scenes/layers/beach-night-sea.webp" alt="" fill sizes="(max-width: 640px) 260vw, 100vw" className="object-fill opacity-0 transition-opacity duration-700 dark:opacity-100" />
        </div>
        <div data-scene-overlay className="absolute inset-0">
          <HeroSky part="sea" />
          <Waves layers={seaWaves(dayWaves)} ready={dayReady} className="dark:hidden" />
          <Waves layers={seaWaves(nightWaves)} ready={nightReady} className="hidden dark:block" calm />
        </div>
      </motion.div>

      {/* Sand, nearest: the palm, the props and the players stand on it */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: sandY, scale: sandScale, transformOrigin: "50% 100%" }}>
        {(["day", "night"] as const).map((t) => (
          <div key={t} className={`absolute inset-x-0 bottom-0 ${t === "day" ? "transition-opacity duration-700 dark:opacity-0" : "opacity-0 transition-opacity duration-700 dark:opacity-100"}`} style={{ top: `${SAND_TOP[t]}%` }}>
            <Image loading="eager" src={`/scenes/layers/beach-${t}-sand.webp`} alt="" fill sizes="(max-width: 640px) 260vw, 100vw" className="object-fill" />
          </div>
        ))}
        <div data-scene-overlay className="absolute inset-0">
          <HeroSky part="palm" />
          <Waves layers={shoreWaves(dayWaves)} ready={dayReady} className="dark:hidden" />
          <Waves layers={shoreWaves(nightWaves)} ready={nightReady} className="hidden dark:block" />
          {PROPS.map((prop) => (
            <PropButton key={prop.key} prop={prop} />
          ))}
          <Volleyball />
        </div>
      </motion.div>
    </div>
  );
}
