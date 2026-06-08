"use client";

import { Cloud } from "@/components/world/sprites/Cloud";
import { RainDrop } from "@/components/world/sprites/RainDrop";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useWeather } from "@/lib/useWeather";

const CLOUD_SPOTS = [
  { top: "14%", left: "8%", size: 100, delay: "0s", dur: "8s" },
  { top: "22%", left: "66%", size: 130, delay: "1.5s", dur: "10s" },
  { top: "10%", left: "40%", size: 84, delay: "0.8s", dur: "9s" },
  { top: "30%", left: "82%", size: 108, delay: "2.2s", dur: "11s" },
  { top: "34%", left: "24%", size: 90, delay: "1.1s", dur: "9.5s" },
];

const DROPS = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 7 + 4) % 100}%`,
  delay: `${(i % 5) * 0.22}s`,
  dur: `${0.9 + (i % 4) * 0.18}s`,
}));

export function WeatherLayer() {
  const { condition, cloudCover } = useWeather();
  const reduced = useReducedMotion();

  const cloudCount =
    condition === "rain"
      ? CLOUD_SPOTS.length
      : Math.min(CLOUD_SPOTS.length, Math.round(cloudCover / 22));

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {condition === "rain" ? (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--ink) 18%, transparent), transparent 60%)",
          }}
        />
      ) : null}

      {CLOUD_SPOTS.slice(0, cloudCount).map((cloud) => (
        <span
          key={cloud.left}
          className="absolute animate-float text-white/75 drop-shadow"
          style={{
            top: cloud.top,
            left: cloud.left,
            animationDelay: cloud.delay,
            animationDuration: cloud.dur,
          }}
        >
          <Cloud size={cloud.size} />
        </span>
      ))}

      {condition === "rain" && !reduced
        ? DROPS.map((drop, index) => (
            <span
              key={index}
              className="absolute top-0 animate-fall text-sky-blue/60"
              style={{
                left: drop.left,
                animationDelay: drop.delay,
                animationDuration: drop.dur,
              }}
            >
              <RainDrop size={13} />
            </span>
          ))
        : null}
    </div>
  );
}
