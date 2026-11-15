"use client";

import { useState } from "react";
import { playPop } from "@/lib/worldSound";

// Fixed layout so server and client render the same bubbles.
const BUBBLES = [
  { left: 8, size: 10, duration: 14, delay: 0, wobble: 12 },
  { left: 19, size: 6, duration: 11, delay: -4, wobble: -8 },
  { left: 33, size: 14, duration: 17, delay: -9, wobble: 10 },
  { left: 47, size: 8, duration: 13, delay: -2, wobble: -12 },
  { left: 61, size: 12, duration: 16, delay: -12, wobble: 8 },
  { left: 72, size: 7, duration: 12, delay: -6, wobble: -10 },
  { left: 84, size: 11, duration: 15, delay: -3, wobble: 14 },
  { left: 93, size: 6, duration: 10, delay: -8, wobble: -6 },
];

/** Bubbles drifting up through the water. Tap one to pop it. */
export function Bubbles({ count = BUBBLES.length }: { count?: number }) {
  const [popped, setPopped] = useState<Record<number, number>>({});

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {BUBBLES.slice(0, count).map((b, i) => {
        const gen = popped[i] ?? 0;
        const isPopping = gen < 0;
        return (
          <span
            key={`${i}-${gen}`}
            className="absolute bottom-0"
            style={{
              left: `${b.left}%`,
              animation: `bubble-rise ${b.duration}s linear ${b.delay}s infinite`,
              ["--wobble" as string]: `${b.wobble}px`,
            }}
          >
            <button
              type="button"
              tabIndex={-1}
              onClick={() => {
                playPop();
                setPopped((p) => ({ ...p, [i]: -1 - Math.abs(p[i] ?? 0) }));
              }}
              onAnimationEnd={() => setPopped((p) => ({ ...p, [i]: Math.abs(p[i] ?? 0) + 1 }))}
              className="pointer-events-auto -m-3 block cursor-pointer p-3"
            >
              <span
                className="block rounded-full border-[1.5px] border-[#e9dcc0]/80 bg-[#e9dcc0]/10"
                style={{
                  width: b.size,
                  height: b.size,
                  animation: isPopping ? "bubble-pop 220ms ease-out forwards" : undefined,
                }}
              />
            </button>
          </span>
        );
      })}
    </div>
  );
}
