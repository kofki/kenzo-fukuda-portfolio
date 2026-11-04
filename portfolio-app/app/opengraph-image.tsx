import { renderOgImage, size, contentType } from "@/lib/ogImage";
import { profile } from "@/data/profile";

export { size, contentType };
export const alt = `${profile.name} — ${profile.headline}`;

export default function OpengraphImage() {
  return renderOgImage();
}
