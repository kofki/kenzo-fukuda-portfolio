import Image from "next/image";
import { cn } from "@/lib/cn";
import type { GalleryImage } from "@/types";

export function ProjectGallery({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) return null;

  const wide = images.filter((image) => image.aspect !== "phone");
  const phones = images.filter((image) => image.aspect === "phone");

  return (
    <div className="space-y-4">
      {wide.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {wide.map((image, index) => (
            <figure
              key={image.url}
              className={cn(
                "group overflow-hidden rounded-2xl border border-border bg-surface",
                index === 0 && wide.length % 2 === 1 && "sm:col-span-2",
              )}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 900px"
                  className="object-cover object-[center_28%] transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              {image.caption ? (
                <figcaption className="p-3 font-mono text-xs text-muted">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      ) : null}

      {phones.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {phones.map((image) => (
            <figure
              key={image.url}
              className="group overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="relative aspect-[1242/2688] overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </figure>
          ))}
        </div>
      ) : null}
    </div>
  );
}
