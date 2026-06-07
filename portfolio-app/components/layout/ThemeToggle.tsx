"use client";

import { useTheme } from "@/app/providers";
import { icons } from "@/lib/icons";

/** Sun ↔ moon switch — toggles golden hour and night ocean. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const Sun = icons.sun;
  const Moon = icons.moon;
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface/60 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:text-coral"
    >
      {isDark ? <Moon size={18} weight="fill" /> : <Sun size={18} weight="fill" />}
    </button>
  );
}
