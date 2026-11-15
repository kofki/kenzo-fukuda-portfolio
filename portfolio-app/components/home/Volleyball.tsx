"use client";

import gsap from "gsap";
import { useRef, type CSSProperties } from "react";
import { prefersReducedMotion, useSceneGsap } from "@/lib/useSceneGsap";
import { playBounce } from "@/lib/worldSound";

// Every frame was cut at one scale, so one factor turns pixels into % of the
// scene's height. Player A stands left of the net, player B right of it.
const H = 9.4 / 285; // % of scene height per sprite pixel
const pct = (px: number) => px * H;
const wide = (px: number) => (px * H) / 1.5; // % of scene width (scene is 3:2)

const FRAMES = {
  "a-idle": { w: 128, h: 285, lift: 0 },
  "a-spike": { w: 206, h: 363, lift: 32 },
  "b-idle": { w: 130, h: 279, lift: 0 },
  "b-bump": { w: 192, h: 256, lift: 0 },
} as const;

const A_LEFT = 25.2;
const B_LEFT = 43.6;
const GROUND = 0.6;

function Frame({ name, left, hidden = false }: { name: keyof typeof FRAMES; left: number; hidden?: boolean }) {
  const f = FRAMES[name];
  const style: CSSProperties = {
    left: `${left}%`,
    bottom: `${GROUND + pct(f.lift)}%`,
    width: `${wide(f.w)}%`,
    height: `${pct(f.h)}%`,
    opacity: hidden ? 0 : 1,
  };
  return (
    <span data-frame={name} className="absolute block" style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/props/day/player-${name}.webp`} alt="" draggable={false} className="block h-full w-full dark:hidden" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/props/night/player-${name}.webp`} alt="" draggable={false} className="hidden h-full w-full dark:block" />
    </span>
  );
}

/**
 * Two players keep a rally going over the net: A spikes, the ball arcs over,
 * B bumps it back high, A jumps and spikes again. Tap a player and they jump
 * for joy. Hidden on phones, where the net is too.
 */
export function Volleyball() {
  const root = useRef<HTMLDivElement>(null);

  useSceneGsap(root, (q) => {
    const el = root.current;
    if (!el) return;
    const [aIdle, aSpike, bIdle, bBump] = ["a-idle", "a-spike", "b-idle", "b-bump"].map((n) => q(`[data-frame="${n}"]`)[0]);
    const ball = q("[data-vball]")[0];
    const W = () => el.clientWidth;
    const Hh = () => el.clientHeight;
    // Ball positions as % of the scene: x from the left, y up from the ground.
    const at = (x: number, y: number) => ({ x: () => (x / 100) * W(), y: () => (-y / 100) * Hh() });
    const spike = { x: A_LEFT + 4.2, y: 14.2 };
    const bump = { x: B_LEFT + 0.6, y: 4.6 };
    const show = (on: Element, off: Element) => [gsap.set(on, { opacity: 1 }), gsap.set(off, { opacity: 0 })];

    const tl = gsap.timeline({ repeat: -1, repeatRefresh: true, defaults: { ease: "none" } });
    tl.set(ball, at(spike.x, spike.y))
      // A jumps and spikes
      .add(() => { show(aSpike, aIdle); })
      .fromTo(aSpike, { y: 8 }, { y: -6, duration: 0.25, ease: "power2.out" })
      // ball flies over the net and drops to B
      .to(ball, { x: at(bump.x, 0).x, duration: 1.05 }, "<0.12")
      .to(ball, { y: at(0, 19).y, duration: 0.42, ease: "power1.out" }, "<")
      .to(ball, { y: at(0, bump.y).y, duration: 0.63, ease: "power1.in" }, ">")
      .to(aSpike, { y: 0, duration: 0.3, ease: "power2.in" }, "<-0.5")
      .add(() => { show(aIdle, aSpike); }, "<0.3")
      // B bumps it back, high
      .add(() => { show(bBump, bIdle); })
      .fromTo(bBump, { y: 0 }, { y: -4, duration: 0.15, yoyo: true, repeat: 1, ease: "sine.inOut" })
      .to(ball, { x: at(spike.x, 0).x, duration: 1.5 }, "<0.05")
      .to(ball, { y: at(0, 27).y, duration: 0.8, ease: "power1.out" }, "<")
      .to(ball, { y: at(0, spike.y).y, duration: 0.7, ease: "power1.in" }, ">")
      .add(() => { show(bIdle, bBump); }, "<-0.9");
    gsap.set([aSpike, bBump], { opacity: 0 });
    const spin = gsap.to(ball, { rotation: 360, duration: 1.2, ease: "none", repeat: -1 });
    return [tl, spin];
  });

  const cheer = (event: { currentTarget: HTMLElement }) => {
    playBounce();
    if (prefersReducedMotion()) return;
    gsap.fromTo(event.currentTarget, { y: 0 }, { y: -18, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 3 });
  };

  return (
    <div ref={root} aria-hidden className="pointer-events-none absolute inset-0 max-sm:hidden">
      <button type="button" tabIndex={-1} onClick={cheer} className="pointer-events-auto absolute inset-0 cursor-pointer" style={{ clipPath: `inset(84% ${100 - A_LEFT - 6}% 0 ${A_LEFT - 2}%)` }}>
        <span className="absolute inset-0">
          <Frame name="a-idle" left={A_LEFT} />
          <Frame name="a-spike" left={A_LEFT - 1.2} hidden />
        </span>
      </button>
      <button type="button" tabIndex={-1} onClick={cheer} className="pointer-events-auto absolute inset-0 cursor-pointer" style={{ clipPath: `inset(84% ${100 - B_LEFT - 6}% 0 ${B_LEFT - 2}%)` }}>
        <span className="absolute inset-0">
          <Frame name="b-idle" left={B_LEFT} />
          <Frame name="b-bump" left={B_LEFT - 1.4} hidden />
        </span>
      </button>
      <span data-vball className="absolute left-0 top-full block will-change-transform" style={{ width: `${wide(52)}%`, aspectRatio: "1", marginLeft: `-${wide(26)}%`, marginTop: `-${wide(26)}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/props/day/ball.webp" alt="" draggable={false} className="block h-full w-full dark:hidden" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/props/night/ball.webp" alt="" draggable={false} className="hidden h-full w-full dark:block" />
      </span>
    </div>
  );
}
