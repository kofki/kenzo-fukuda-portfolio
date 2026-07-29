import { renderOgImage, size, contentType } from "@/lib/ogImage";

// Next does not document an automatic twitter:image fallback from
// opengraph-image, so this route is declared explicitly off the same renderer.
export { size, contentType };
export const alt = "Kenzo Fukuda — Software Engineer";

export default function TwitterImage() {
  return renderOgImage();
}
