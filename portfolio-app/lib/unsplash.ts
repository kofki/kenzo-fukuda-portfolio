const BASE = "https://images.unsplash.com/photo-";

/**
 * Builds a cropped, auto-formatted Unsplash URL - temporary stock imagery.
 * Replace these with real photos by dropping files in /public and swapping
 * the `imageUrl` in the data files.
 */
export function unsplash(id: string, width = 1200): string {
  return `${BASE}${id}?auto=format&fit=crop&w=${width}&q=80`;
}
