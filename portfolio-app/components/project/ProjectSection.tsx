import { icons } from "@/lib/icons";
import type { IconName } from "@/types";

interface ProjectSectionProps {
  icon: IconName;
  title: string;
  paragraphs?: string[];
  items?: string[];
}

// Guard so a project whose copy isn't written yet renders nothing here rather
// than a heading with an empty body.
export function ProjectSection({
  icon,
  title,
  paragraphs,
  items,
}: ProjectSectionProps) {
  if (!paragraphs?.length && !items?.length) return null;

  const Icon = icons[icon];
  const Caret = icons.caretRight;

  return (
    <section className="max-w-3xl">
      <h2 className="flex items-center gap-2.5 font-display text-2xl font-semibold text-ink">
        <Icon size={22} weight="duotone" className="text-teal-ink" />
        {title}
      </h2>

      {paragraphs ? (
        <div className="mt-4 space-y-4">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {items ? (
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-muted">
              <Caret
                size={18}
                weight="bold"
                className="mt-1 shrink-0 text-coral-ink"
              />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
