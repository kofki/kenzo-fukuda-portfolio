import { renderOgImage, size, contentType } from "@/lib/ogImage";
import { profile } from "@/data/profile";

// Next does not document an automatic twitter:image fallback from
// opengraph-image, so this route is declared explicitly off the same renderer.
export { size, contentType };
export const alt = `${profile.name} — ${profile.headline}`;

export default function TwitterImage() {
  return renderOgImage();
}
