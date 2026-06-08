const BASE = "https://images.unsplash.com/photo-";

export function unsplash(id: string, width = 1200): string {
  return `${BASE}${id}?auto=format&fit=crop&w=${width}&q=80`;
}
