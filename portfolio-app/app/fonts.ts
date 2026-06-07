import { Fraunces, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";

/**
 * Display serif — warm, editorial, sun-bleached. `opsz` enables optical
 * sizing so large headings read softer than small ones.
 */
export const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

/** Body grotesk — humanist, clean, professional. */
export const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

/** Monospace — technical micro-labels, dates, tech badges. */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

/** Combined CSS-variable classes for the root <html> element. */
export const fontVariables = `${fraunces.variable} ${hanken.variable} ${jetbrainsMono.variable}`;
