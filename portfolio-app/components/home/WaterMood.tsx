import type { CSSProperties } from "react";
import { LiveScene } from "@/components/home/LiveScene";

// Fixed, so server and client agree: [left %, top %, size px, seconds].
const PLANKTON: [number, number, number, number][] = Array.from({ length: 30 }, (_, i) => [
  (i * 37.3 + 11) % 100,
  (i * 61.7 + 7) % 100,
  2 + (i % 3),
  5 + ((i * 7) % 9),
]);

/**
 * How the water looks by day and by night, laid over a section's scenery.
 * Day: sunlit, greener water. Night: the water goes dark and the plankton
 * glows, drifting and blinking.
 */
export function WaterMood() {
  return (
    <LiveScene className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Day */}
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-[#5fd6cf] opacity-45 mix-blend-soft-light" />
      </div>

      {/* Night */}
      <div className="absolute inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-[#020812]" style={{ opacity: 0.42 }} />
        {PLANKTON.map(([left, top, size, secs], i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#aaf6ff] shadow-[0_0_10px_3px_rgba(110,235,255,0.55)] animate-[plankton_var(--s)_ease-in-out_infinite]"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, animationDelay: `${-i * 1.3}s`, "--s": `${secs}s` } as CSSProperties}
          />
        ))}
      </div>
    </LiveScene>
  );
}
