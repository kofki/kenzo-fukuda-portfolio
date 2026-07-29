import Image from "next/image";
import type { LogbookEntry } from "@/types";

/**
 * A reverse-chronological journal feed. CSS multi-column gives real masonry, so
 * portrait and landscape shots sit side by side at their natural aspect ratio
 * with no cropping and no fixed row height — `break-inside-avoid` keeps an entry
 * from splitting across columns.
 *
 * Deliberately unframed: the Polaroid treatment belongs to the project cards.
 * Here the photo just sits on the page with its title, date and tags under it.
 */
export function LogbookFeed({ entries }: { entries: LogbookEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <ul className="list-none columns-1 gap-8 sm:columns-2 lg:columns-3">
      {entries.map((entry) => (
        <li key={entry.id} className="mb-10 break-inside-avoid">
          <figure>
            <Image
              src={entry.src}
              alt={entry.alt}
              width={800}
              height={800}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full"
            />
            <figcaption className="mt-3">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-base font-semibold text-ink">
                  {entry.title}
                </h2>
                <span className="shrink-0 font-mono text-xs text-muted">
                  {entry.date}
                </span>
              </div>
              {entry.description ? (
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {entry.description}
                </p>
              ) : null}
              {entry.tags && entry.tags.length > 0 ? (
                <p className="mt-2 flex flex-wrap gap-x-3 text-xs text-muted/80">
                  {entry.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </p>
              ) : null}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
