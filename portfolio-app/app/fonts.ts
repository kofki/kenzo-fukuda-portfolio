import {
  Dela_Gothic_One,
  Gochi_Hand,
  JetBrains_Mono,
  Zen_Kaku_Gothic_New,
} from "next/font/google";

// Display: a chunky Japanese poster gothic for the name and section titles.
// Not a variable font, so the single weight has to be named.
export const dela = Dela_Gothic_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dela",
  display: "swap",
});

// Body: calm Japanese gothic that carries both Latin text and the UI.
export const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen",
  display: "swap",
});

// Handwriting for the marker notes ("hi, I'm", "that's me", eyebrows, dates).
export const gochi = Gochi_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gochi",
  display: "swap",
});

// Mono stays for genuinely code-ish content only.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontVariables = `${dela.variable} ${zenKaku.variable} ${gochi.variable} ${jetbrainsMono.variable}`;
