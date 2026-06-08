import { SkillChip } from "@/components/skills/SkillChip";
import { cn } from "@/lib/cn";
import { icons } from "@/lib/icons";
import type { SkillCategory as SkillCategoryType } from "@/types";

interface SkillCategoryProps {
  category: SkillCategoryType;
  accent: string;
  glow: string;
}

export function SkillCategory({ category, accent, glow }: SkillCategoryProps) {
  const Icon = icons[category.icon];

  return (
    <div className="glass relative h-full overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex size-11 items-center justify-center rounded-2xl",
            accent,
          )}
        >
          <Icon size={22} weight="duotone" />
        </span>
        <h3 className="font-display text-xl font-semibold text-ink">
          {category.title}
        </h3>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <SkillChip key={skill.label} skill={skill} glow={glow} />
        ))}
      </div>
    </div>
  );
}
