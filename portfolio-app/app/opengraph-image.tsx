import { renderOgImage, size, contentType } from "@/lib/ogImage";

export { size, contentType };
export const alt = "Kenzo Fukuda — Software Engineer";

export default function OpengraphImage() {
  return renderOgImage();
}
