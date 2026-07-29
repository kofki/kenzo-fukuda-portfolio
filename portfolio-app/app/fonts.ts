import {
  Archivo,
  Caveat,
  Instrument_Sans,
  JetBrains_Mono,
} from "next/font/google";

// Display: Archivo's `wdth` axis (62-125) is what gives us "Archivo Expanded".
// There is no separate Expanded family on Google Fonts, so the width is applied
// in CSS via --display-wdth rather than being picked here.
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Body: deliberately calm so the wide display type can carry the personality.
export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

// Mono is for genuinely code-ish content only (tech names, versions). It is no
// longer the site's label/eyebrow voice.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Handwriting for the Polaroid ledges — captions on a photo print should look
// written on, not typeset. Variable weight so a title can be heavier than its
// caption without loading a second file.
export const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const fontVariables = `${archivo.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} ${caveat.variable}`;
