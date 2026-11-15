"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/useSceneGsap";
import { playPop } from "@/lib/worldSound";

const POOL = 18;

/**
 * Underwater, bubbles trail behind the pointer, and a tap on open water lets
 * out a little burst. One fixed layer and a reused pool of bubbles, so it
 * never creates nodes while you move (gsap-performance).
 */
export function BubbleTrail() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = layer.current;
    if (!root || prefersReducedMotion()) return;
    const bubbles = Array.from(root.children) as HTMLElement[];
    let next = 0;
    let lastX = 0;
    let lastY = 0;
    let lastT = 0;

    const spawn = (x: number, y: number, big = false) => {
      const b = bubbles[next];
      next = (next + 1) % bubbles.length;
      const size = big ? gsap.utils.random(8, 16) : gsap.utils.random(5, 11);
      gsap.killTweensOf(b);
      gsap.set(b, { x: x - size / 2, y: y - size / 2, width: size, height: size, opacity: 0.9, scale: 0.4 });
      gsap.to(b, {
        y: `-=${gsap.utils.random(70, big ? 200 : 140)}`,
        x: `+=${gsap.utils.random(-18, 18)}`,
        scale: 1,
        opacity: 0,
        duration: gsap.utils.random(1.1, 1.8),
        ease: "power1.out",
      });
    };

    const underwater = (target: EventTarget | null) =>
      target instanceof Element && target.closest("[data-underwater]");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || !underwater(e.target)) return;
      const now = performance.now();
      if (now - lastT < 60 || Math.hypot(e.clientX - lastX, e.clientY - lastY) < 22) return;
      lastT = now;
      lastX = e.clientX;
      lastY = e.clientY;
      spawn(e.clientX, e.clientY);
    };
    const onDown = (e: PointerEvent) => {
      if (!underwater(e.target)) return;
      if (e.target instanceof Element && e.target.closest("a, button, [data-fish], input")) return;
      playPop();
      for (let i = 0; i < 6; i += 1) spawn(e.clientX + gsap.utils.random(-14, 14), e.clientY + gsap.utils.random(-8, 8), true);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      gsap.killTweensOf(bubbles);
    };
  }, []);

  return (
    <div ref={layer} aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {Array.from({ length: POOL }, (_, i) => (
        <span key={i} className="absolute left-0 top-0 rounded-full border-[1.5px] border-[#e9dcc0]/85 bg-[#e9dcc0]/10 opacity-0 will-change-transform" />
      ))}
    </div>
  );
}
