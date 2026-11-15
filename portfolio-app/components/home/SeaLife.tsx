"use client";

import gsap from "gsap";
import { useRef, type CSSProperties } from "react";
import type { Layer } from "@/components/home/liveLayers";
import { prefersReducedMotion, useSceneGsap } from "@/lib/useSceneGsap";
import { playChime, playSwish } from "@/lib/worldSound";

const box = (l: Layer): CSSProperties => ({
  left: `${l.left}%`,
  top: `${l.top}%`,
  width: `${l.width}%`,
  height: `${l.height}%`,
});

function Sprite({ layer, mark, className = "" }: { layer: Layer; mark: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...{ [`data-${mark}`]: "" }}
      src={layer.src}
      alt=""
      decoding="async"
      draggable={false}
      className={`absolute max-w-none select-none will-change-transform ${className}`}
      style={box(layer)}
    />
  );
}

/**
 * A school of fish cut from a print. The school drifts as one while each fish
 * wiggles on its own; tap any fish and they scatter, then regroup.
 */
export function FishSchool({ fish, drift = 6 }: { fish: Layer[]; drift?: number }) {
  const root = useRef<HTMLDivElement>(null);

  useSceneGsap(root, (q) => {
    const r = gsap.utils.random;
    const loops: gsap.core.Animation[] = [
      gsap.to(q("[data-school]"), { xPercent: () => r(-drift, drift), yPercent: () => r(-drift / 2, drift / 2), duration: () => r(7, 11), ease: "sine.inOut", repeat: -1, yoyo: true, repeatRefresh: true }),
    ];
    q("[data-fish]").forEach((f, i) => {
      loops.push(
        gsap.to(f, { x: () => r(-10, 10), y: () => r(-7, 7), rotation: () => r(-6, 6), duration: () => r(1.2, 2.4), ease: "sine.inOut", repeat: -1, yoyo: true, repeatRefresh: true, delay: i * 0.2 }),
      );
    });
    return loops;
  });

  const scatter = () => {
    playSwish();
    if (prefersReducedMotion() || !root.current) return;
    const fishEls = root.current.querySelectorAll("[data-fish]");
    gsap.timeline()
      .to(fishEls, { x: () => gsap.utils.random(-140, 140), y: () => gsap.utils.random(-90, 90), rotation: () => gsap.utils.random(-30, 30), duration: 0.35, ease: "power3.out", stagger: 0.02 })
      .to(fishEls, { x: 0, y: 0, rotation: 0, duration: 1.6, ease: "elastic.out(1, 0.6)", stagger: 0.04 });
  };

  return (
    <div ref={root} className="absolute inset-0">
      <div data-school className="absolute inset-0">
        {fish.map((f) => (
          <button
            key={f.src}
            type="button"
            tabIndex={-1}
            aria-hidden
            onClick={scatter}
            className="pointer-events-auto absolute cursor-pointer"
            style={box(f)}
          >
            <Sprite layer={{ ...f, left: 0, top: 0, width: 100, height: 100 }} mark="fish" />
          </button>
        ))}
      </div>
    </div>
  );
}

/** The bubbles drawn in a print, rising for real and starting over. */
export function PrintBubbles({ bubbles }: { bubbles: Layer[] }) {
  const root = useRef<HTMLDivElement>(null);
  useSceneGsap(root, (q) =>
    q("[data-bubble]").map((b, i) =>
      gsap.fromTo(
        b,
        { y: 0, x: 0, opacity: 0, scale: 0.6 },
        {
          keyframes: { y: [0, -120, -260], x: [0, 8, -6], opacity: [0, 1, 0], scale: [0.6, 1, 1.1] },
          duration: () => gsap.utils.random(4, 7),
          ease: "none",
          repeat: -1,
          repeatRefresh: true,
          delay: i * 0.6,
        },
      ),
    ),
  );
  return (
    <div ref={root} className="pointer-events-none absolute inset-0">
      {bubbles.map((b) => (
        <Sprite key={b.src} layer={b} mark="bubble" />
      ))}
    </div>
  );
}

/** Soft shafts of light that sway and breathe, matching the print's rays. */
export function LightRays({ side = "right" }: { side?: "left" | "right" }) {
  const root = useRef<HTMLDivElement>(null);
  useSceneGsap(root, (q) =>
    q("[data-ray]").map((ray, i) =>
      gsap.to(ray, { opacity: () => gsap.utils.random(0.08, 0.32), xPercent: () => gsap.utils.random(-30, 30), duration: () => gsap.utils.random(3, 6), ease: "sine.inOut", repeat: -1, yoyo: true, repeatRefresh: true, delay: i * 0.7 }),
    ),
  );
  const left = side === "right";
  return (
    <div ref={root} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          data-ray
          className="absolute -top-[10%] h-[85%] opacity-0"
          style={{
            left: left ? `${48 + i * 9}%` : `${4 + i * 9}%`,
            width: `${5 + (i % 2) * 4}%`,
            transform: `skewX(${left ? 22 : -22}deg)`,
            background: "linear-gradient(180deg, rgba(220,240,240,0.9), rgba(220,240,240,0))",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Atlantis lighting up: the windows come on block by block as you arrive,
 * then flicker like old lamps. Tap the city and every light surges.
 */
export function CityLights({ groups = 4 }: { groups?: number }) {
  const root = useRef<HTMLDivElement>(null);
  const surgeRef = useRef<(() => void) | null>(null);

  useSceneGsap(root, (q, contextSafe) => {
    const r = gsap.utils.random;
    const lights = q("[data-lights]");
    const glow = q("[data-cityglow]");
    gsap.set([...lights, ...glow], { opacity: 0 });
    // Arrival: blocks switch on one after another.
    const arrive = gsap.timeline({ paused: true })
      .to(lights, { opacity: 1, duration: 0.25, ease: "power1.in", stagger: 0.35 })
      .to(glow, { opacity: 0.75, duration: 1.2, ease: "sine.out" }, "<0.2");
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { arrive.play(); io.disconnect(); } }, { threshold: 0.35 });
    if (root.current) io.observe(root.current);
    // Flicker: each block dips at random, mostly staying lit.
    const loops: gsap.core.Animation[] = lights.map((l) =>
      gsap.timeline({ repeat: -1, repeatRefresh: true, delay: r(2, 5) })
        .to(l, { opacity: () => r(0.25, 0.7), duration: () => r(0.05, 0.15), ease: "steps(2)" })
        .to(l, { opacity: 1, duration: () => r(0.05, 0.2) })
        .to(l, { opacity: () => r(0.8, 1), duration: () => r(1.5, 4), ease: "sine.inOut" }),
    );
    loops.push(gsap.to(glow, { scale: 1.02, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 }));
    surgeRef.current = contextSafe(() => {
      gsap.timeline()
        .to(lights, { opacity: 1, duration: 0.1, stagger: 0.05 })
        .to(glow, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0)
        .to(glow, { opacity: 0.75, duration: 1.8, ease: "sine.inOut" });
    });
    return loops;
  });

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-auto absolute inset-x-0 bottom-0 top-[45%] cursor-pointer"
      onClick={() => {
        playChime();
        if (!prefersReducedMotion()) surgeRef.current?.();
      }}
    >
      <div className="absolute inset-x-0 bottom-0 aspect-[3/2]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img data-cityglow src="/scenes/live/city-glow.webp" alt="" draggable={false} className="absolute inset-0 h-full w-full mix-blend-screen" />
        {Array.from({ length: groups }, (_, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} data-lights src={`/scenes/live/city-lights-${i}.webp`} alt="" draggable={false} className="absolute inset-0 h-full w-full" />
        ))}
      </div>
    </div>
  );
}
