"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { HeroSky } from "@/components/home/HeroSky";
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
  { key: "net", label: "Bounce the volleyball", left: 32.4, bottom: 0.5, height: 10.4, animation: "ball-bounce", duration: 700, sound: playBounce, day: [352, 246], night: [329, 212], desktopOnly: true },
  { key: "crab", label: "Poke the crab", left: 54.7, bottom: 0.5, height: 5.7, animation: "crab-poke", duration: 1400, idle: "crab-idle 7s ease-in-out infinite", sound: playDig, day: [184, 129], night: [170, 126] },
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
          src={`/props/day/${prop.key}.webp`}
          alt=""
          width={prop.day[0]}
          height={prop.day[1]}
          className="h-full w-auto dark:hidden"
          sizes="160px"
        />
        <Image
          src={`/props/night/${prop.key}.webp`}
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
function waveStyle(layer: WaveLayer, index: number): CSSProperties {
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
    return { ...base, animation: `glint ${2.2 + (index % 3) * 0.7}s ease-in-out ${-index * 0.6}s infinite` };
  }
  return { ...base, transformOrigin: "50% 0%", animation: "shore-wash 7s ease-in-out infinite" };
}

function Waves({ layers, className, ready }: { layers: WaveLayer[]; className: string; ready: boolean }) {
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
          className="absolute max-w-none will-change-transform"
          style={waveStyle(layer, index)}
        />
      ))}
    </div>
  );
}

/**
 * The woodblock beach. The scene keeps a 3:2 shape and stays anchored to the
 * bottom of the hero, so the sand, the props and the horizon line up on every
 * screen. Both prints put the horizon 75.4% down and the sand at 92.6%, so
 * switching day and night never moves the sea. The breakers, glints and
 * shoreline foam are cut out of the print and animated on top of it.
 */
export function BeachScene() {
  // The wave layers are tiny and arrive before the print; keep them hidden
  // until the print under them has loaded, so they never float on nothing.
  const [dayReady, setDayReady] = useState(false);
  const [nightReady, setNightReady] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);

  // A cached print can finish loading before React attaches onLoad.
  useEffect(() => {
    const imgs = sceneRef.current?.querySelectorAll<HTMLImageElement>("img[data-print]");
    imgs?.forEach((img) => {
      if (!img.complete || !img.naturalWidth) return;
      if (img.dataset.print === "day") setDayReady(true);
      else setNightReady(true);
    });
  }, []);

  return (
    <div ref={sceneRef} className="absolute bottom-0 left-1/2 aspect-[3/2] h-[max(100cqh,66.67cqw)] -translate-x-1/2 max-sm:-translate-x-[71%]">
      <Image
        src="/scenes/beach-day.webp"
        alt=""
        fill
        preload
        data-print="day"
        onLoad={() => setDayReady(true)}
        sizes="(max-width: 640px) 260vw, 100vw"
        className="object-cover transition-opacity duration-700 dark:opacity-0"
      />
      <Image
        src="/scenes/beach-night.webp"
        alt=""
        fill
        data-print="night"
        onLoad={() => setNightReady(true)}
        sizes="(max-width: 640px) 260vw, 100vw"
        className="object-cover opacity-0 transition-opacity duration-700 dark:opacity-100"
      />
      <HeroSky />
      <Waves layers={dayWaves} ready={dayReady} className="dark:hidden" />
      <Waves layers={nightWaves} ready={nightReady} className="hidden dark:block" />
      {PROPS.map((prop) => (
        <PropButton key={prop.key} prop={prop} />
      ))}
    </div>
  );
}
