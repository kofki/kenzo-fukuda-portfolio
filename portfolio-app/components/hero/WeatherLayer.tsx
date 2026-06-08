"use client";

import { Cloud } from "@/components/world/sprites/Cloud";
import { RainDrop } from "@/components/world/sprites/RainDrop";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useWeather } from "@/lib/useWeather";

const CLOUD_SPOTS = [
  { top: "10%", left: "6%", size: 124, delay: "0s", dur: "8s" },
  { top: "20%", left: "28%", size: 100, delay: "1.5s", dur: "10s" },
  { top: "7%", left: "50%", size: 150, delay: "0.8s", dur: "9s" },
  { top: "26%", left: "72%", size: 118, delay: "2.2s", dur: "11s" },
  { top: "15%", left: "88%", size: 104, delay: "1.1s", dur: "9.5s" },
  { top: "32%", left: "16%", size: 110, delay: "0.5s", dur: "10.5s" },
  { top: "30%", left: "58%", size: 126, delay: "1.8s", dur: "8.5s" },
  { top: "5%", left: "36%", size: 92, delay: "2.6s", dur: "9.2s" },
];

const DROPS = Array.from({ length: 38 }, (_, i) => ({
  left: `${(i * 53 + 7) % 100}%`,
  delay: `${((i % 7) * 0.13).toFixed(2)}s`,
  dur: `${(0.5 + (i % 5) * 0.11).toFixed(2)}s`,
  size: 11 + (i % 3) * 3,
}));

export function WeatherLayer() {
  const { condition, cloudCover } = useWeather();
  const reduced = useReducedMotion();

  const stormy = condition === "rain";
  // Fuller skies: denser scaling for overcast, and the whole bank when it rains.
  const cloudCount = stormy
    ? CLOUD_SPOTS.length
    : Math.min(CLOUD_SPOTS.length, Math.round(cloudCover / 14));

  // Storm clouds read grey and solid; fair-weather clouds stay soft and white.
  const cloud = stormy
    ? { color: "color-mix(in oklab, var(--ink) 46%, white)", opacity: 0.95 }
    : { color: "white", opacity: 0.82 };

  // Darken/overcast the sky — heavier for rain, a lighter pall for clouds.
  const gloom = stormy
    ? "linear-gradient(180deg, color-mix(in oklab, var(--ink) 36%, transparent), color-mix(in oklab, var(--ink) 12%, transparent) 52%, transparent 82%)"
    : "linear-gradient(180deg, color-mix(in oklab, var(--ink) 18%, transparent), transparent 58%)";

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {condition !== "clear" ? (
        <div className="absolute inset-0" style={{ background: gloom }} />
      ) : null}

      {CLOUD_SPOTS.slice(0, cloudCount).map((spot) => (
        <span
          key={spot.left}
          className="absolute animate-float drop-shadow-md"
          style={{
            top: spot.top,
            left: spot.left,
            color: cloud.color,
            opacity: cloud.opacity,
            animationDelay: spot.delay,
            animationDuration: spot.dur,
          }}
        >
          <Cloud size={spot.size} />
        </span>
      ))}

      {stormy && !reduced
        ? DROPS.map((drop, index) => (
            <span
              key={index}
              className="absolute top-0 animate-fall text-sky-blue/85"
              style={{
                left: drop.left,
                animationDelay: drop.delay,
                animationDuration: drop.dur,
              }}
            >
              <RainDrop size={drop.size} />
            </span>
          ))
        : null}
    </div>
  );
}
