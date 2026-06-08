"use client";

import { useTheme, type ThemeMode } from "@/app/providers";
import { icons } from "@/lib/icons";
import type { IconName } from "@/types";

const MODE_ICON: Record<ThemeMode, IconName> = {
  auto: "auto",
  light: "sun",
  dark: "moon",
};

const MODE_LABEL: Record<ThemeMode, string> = {
  auto: "Auto (follows local time)",
  light: "Light",
  dark: "Dark",
};

export function ThemeToggle() {
  const { mode, cycleTheme } = useTheme();
  const Icon = icons[MODE_ICON[mode]];

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`Theme: ${MODE_LABEL[mode]}. Click to change.`}
      title={`Theme: ${MODE_LABEL[mode]}`}
      className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface/60 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:text-coral"
    >
      <Icon size={18} weight="fill" />
    </button>
  );
}
