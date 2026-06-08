"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type ThemeMode = "auto" | "light" | "dark";
type Effective = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
  effective: Effective;
}

interface ThemeContextValue extends ThemeState {
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const EVENT = "themechange";
const STORAGE_KEY = "theme-mode";
const ORDER: ThemeMode[] = ["auto", "light", "dark"];

function effectiveForMode(mode: ThemeMode): Effective {
  if (mode === "light" || mode === "dark") return mode;
  const hour = new Date().getHours();
  return hour >= 7 && hour < 19 ? "light" : "dark";
}

function readMode(): ThemeMode {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "light" || value === "dark" || value === "auto") return value;
  } catch {
    return "auto";
  }
  return "auto";
}

function applyEffective(effective: Effective) {
  document.documentElement.classList.toggle("dark", effective === "dark");
}

let cached: ThemeState = { mode: "auto", effective: "light" };
const SERVER_STATE: ThemeState = { mode: "auto", effective: "light" };

function getSnapshot(): ThemeState {
  const mode = readMode();
  const effective: Effective = document.documentElement.classList.contains(
    "dark",
  )
    ? "dark"
    : "light";
  if (cached.mode !== mode || cached.effective !== effective) {
    cached = { mode, effective };
  }
  return cached;
}

function getServerSnapshot(): ThemeState {
  return SERVER_STATE;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(EVENT, callback);
  const interval = window.setInterval(() => {
    if (readMode() !== "auto") return;
    const next = effectiveForMode("auto");
    const current = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    if (next !== current) {
      applyEffective(next);
      callback();
    }
  }, 60_000);

  return () => {
    window.removeEventListener(EVENT, callback);
    window.clearInterval(interval);
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const cycleTheme = useCallback(() => {
    const next = ORDER[(ORDER.indexOf(readMode()) + 1) % ORDER.length];
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore unavailable storage
    }
    applyEffective(effectiveForMode(next));
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return (
    <ThemeContext.Provider value={{ ...state, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
