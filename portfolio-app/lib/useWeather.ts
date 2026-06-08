"use client";

import { useEffect, useState } from "react";

export type WeatherCondition = "clear" | "clouds" | "rain";

export interface Weather {
  condition: WeatherCondition;
  isDay: boolean;
  /** 0 to 100. */
  cloudCover: number;
  temp: number | null;
}

// Cocoa Beach, FL. Change these to point the live sky elsewhere.
const LATITUDE = 28.32;
const LONGITUDE = -80.61;
const ENDPOINT = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,is_day,weather_code,cloud_cover,precipitation`;

const FALLBACK: Weather = {
  condition: "clear",
  isDay: true,
  cloudCover: 0,
  temp: null,
};

/** Maps WMO weather codes + cloud cover to a coarse scene condition. */
function classify(code: number, precipitation: number, cloud: number): WeatherCondition {
  if (precipitation > 0 || code >= 51) return "rain";
  if (cloud >= 50 || code >= 2) return "clouds";
  return "clear";
}

/** Fetches live conditions from Open-Meteo (no key). Falls back gracefully. */
export function useWeather(): Weather {
  const [weather, setWeather] = useState<Weather>(FALLBACK);

  useEffect(() => {
    let active = true;

    fetch(ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        if (!active) return;
        const current = data?.current;
        if (!current) return;
        setWeather({
          condition: classify(
            current.weather_code ?? 0,
            current.precipitation ?? 0,
            current.cloud_cover ?? 0,
          ),
          isDay: current.is_day === 1,
          cloudCover: current.cloud_cover ?? 0,
          temp: current.temperature_2m ?? null,
        });
      })
      .catch(() => {
        /* keep fallback */
      });

    return () => {
      active = false;
    };
  }, []);

  return weather;
}
