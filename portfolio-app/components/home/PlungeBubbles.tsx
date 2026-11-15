"use client";

import { motion, useMotionValueEvent, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef } from "react";

// A fixed, seeded spread so server and client agree. Each bubble: where it
// starts across the screen (%), its size (px), when it sets off (0-1 of the
// plunge), how long it takes to rise (share of the plunge), and how far it
// wobbles side to side (px).
function seeded(n: number) {
  let s = 7;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  return Array.from({ length: n }, (_, i) => {
    const big = i % 5 === 0;
    // Most set off in the first moments under, like the burst from a jump.
    const r = rnd();
    return {
      x: 2 + rnd() * 96,
      size: big ? 34 + rnd() * 36 : 7 + rnd() * 20,
      start: r * r * 0.9,
      rise: 0.12 + rnd() * 0.2,
      wobble: 6 + rnd() * 18,
      turns: 1.5 + rnd() * 2.5,
    };
  });
}
const BUBBLES = seeded(90);

/**
 * The rush of bubbles when you plunge in: dozens of them, big and small,
 * stream up past the camera and wobble as they go, set off one after another
 * from the moment the waterline appears. They live under the waterline only
 * (`line`: 0 at the bottom of the screen, 1 past the top), and they are
 * scrubbed by the scroll, so scrolling back up sends them back down.
 */
export function PlungeBubbles({ line, plunge }: { line: MotionValue<number>; plunge: MotionValue<number> }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const boxY = useTransform(line, (l) => `${(1 - l) * 100}%`);
  const innerY = useTransform(line, (l) => `${-(1 - l) * 100}%`);

  const draw = (t: number) => {
    BUBBLES.forEach((b, i) => {
      const el = refs.current[i];
      if (!el) return;
      const q = Math.min(1, Math.max(0, (t - b.start * 0.8) / b.rise));
      if (q <= 0 || q >= 1) {
        el.style.opacity = "0";
        return;
      }
      // Fast off the mark, easing as it goes; from below the screen to off the top.
      const eased = 1 - Math.pow(1 - q, 1.6);
      const y = 108 - eased * 130;
      const dx = Math.sin(q * Math.PI * 2 * b.turns) * b.wobble;
      const grow = 0.7 + q * 0.5;
      el.style.opacity = String(Math.min(1, q * 6) * Math.min(1, (1 - q) * 4));
      el.style.transform = `translate3d(${dx}px, ${y}cqh, 0) scale(${grow})`;
    });
  };

  useMotionValueEvent(plunge, "change", draw);
  useEffect(() => draw(plunge.get()));

  return (
    <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-30 overflow-hidden will-change-transform" style={{ y: boxY }}>
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: innerY }}>
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="absolute top-0 rounded-full border-[1.5px] border-[#efe4cb]/85 bg-[#efe4cb]/10 opacity-0 will-change-transform"
            style={{ left: `${b.x}%`, width: b.size, height: b.size }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
