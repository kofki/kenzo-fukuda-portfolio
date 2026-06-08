import { cn } from "@/lib/cn";
import { icons } from "@/lib/icons";
import type { IconName } from "@/types";

interface IconLinkProps {
  href: string;
  label: string;
  icon: IconName;
  className?: string;
}

export function IconLink({ href, label, icon, className }: IconLinkProps) {
  const Icon = icons[icon];
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface/60 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-coral hover:text-coral",
        className,
      )}
    >
      <Icon size={20} weight="regular" />
    </a>
  );
}
