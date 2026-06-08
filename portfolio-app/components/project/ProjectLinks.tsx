import { cn } from "@/lib/cn";
import { icons } from "@/lib/icons";
import type { IconName, ProjectLinks as Links } from "@/types";

interface LinkMeta {
  key: keyof Links;
  label: string;
  icon: IconName;
  primary?: boolean;
}

const LINK_META: LinkMeta[] = [
  { key: "live", label: "Live", icon: "arrowUpRight", primary: true },
  { key: "appStore", label: "App Store", icon: "appStore", primary: true },
  { key: "devpost", label: "Devpost", icon: "external" },
  { key: "repo", label: "Code", icon: "github" },
  { key: "caseStudy", label: "Case study", icon: "external" },
];

export function ProjectLinks({ links }: { links: Links }) {
  const present = LINK_META.filter((meta) => links[meta.key]);
  if (present.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {present.map((meta) => {
        const Icon = icons[meta.icon];
        return (
          <a
            key={meta.key}
            href={links[meta.key]}
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-sm transition-all duration-300 hover:-translate-y-0.5",
              meta.primary
                ? "bg-coral text-sand"
                : "border border-border text-ink hover:border-ink",
            )}
          >
            <Icon size={16} weight="bold" />
            {meta.label}
          </a>
        );
      })}
    </div>
  );
}
