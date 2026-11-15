"use client";

import Image from "next/image";
import { useState } from "react";
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
  animation: string;
  duration: number;
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
  { key: "surfboard", label: "Wobble the surfboard", left: 15.6, bottom: 0.5, height: 13.1, animation: "surf-wobble", duration: 900, sound: playKnock, day: [94, 340], night: [99, 323], desktopOnly: true },
  { key: "net", label: "Bounce the volleyball", left: 32.4, bottom: 0.5, height: 10.4, animation: "ball-bounce", duration: 700, sound: playBounce, day: [352, 246], night: [329, 212], desktopOnly: true },
  { key: "crab", label: "Poke the crab", left: 54.7, bottom: 0.5, height: 5.7, animation: "crab-dig", duration: 600, sound: playDig, day: [184, 129], night: [170, 126] },
  { key: "umbrella", label: "Open and close the umbrella", left: 70.3, bottom: 0.5, height: 14.1, animation: "umbrella-fold", duration: 800, sound: playWhoosh, day: [302, 313], night: [84, 328] },
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
      onAnimationEnd={() => setPlaying(false)}
      className={`absolute origin-bottom cursor-pointer outline-offset-4 ${prop.desktopOnly ? "max-sm:hidden" : ""}`}
      style={{
        left: `${prop.left}%`,
        bottom: `${prop.bottom}%`,
        height: `${prop.height}%`,
        animation: playing ? `${prop.animation} ${prop.duration}ms ease-in-out` : undefined,
      }}
    >
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
    </button>
  );
}

/**
 * The woodblock beach. The scene keeps a 3:2 shape and stays anchored to the
 * bottom of the hero, so the sand, the props and the horizon line up on every
 * screen. Wide screens crop the top of the sky; phones crop the sides and keep
 * the right-hand half with the sun or moon.
 */
export function BeachScene() {
  return (
    <div className="absolute bottom-0 left-1/2 aspect-[3/2] h-[max(100%,66.67vw)] -translate-x-1/2 max-sm:-translate-x-[71%]">
      <Image
        src="/scenes/beach-day.webp"
        alt=""
        fill
        preload
        sizes="(max-width: 640px) 260vw, 100vw"
        className="object-cover transition-opacity duration-700 dark:opacity-0"
      />
      <Image
        src="/scenes/beach-night.webp"
        alt=""
        fill
        sizes="(max-width: 640px) 260vw, 100vw"
        className="object-cover opacity-0 transition-opacity duration-700 dark:opacity-100"
      />
      {PROPS.map((prop) => (
        <PropButton key={prop.key} prop={prop} />
      ))}
    </div>
  );
}
