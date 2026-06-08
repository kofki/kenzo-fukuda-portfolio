import Image from "next/image";
import { cn } from "@/lib/cn";
import type { GalleryImage } from "@/types";

/** Showcase grid for a project's screenshots; the first image spans wide. */
export function ProjectGallery({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((image, index) => (
        <figure
          key={image.url}
          className={cn(
            "group overflow-hidden rounded-2xl border border-border bg-surface",
            index === 0 && "sm:col-span-2",
          )}
        >
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, 900px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
  );
}
