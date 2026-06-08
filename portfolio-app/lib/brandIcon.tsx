import {
  siC,
  siCplusplus,
  siDjango,
  siDocker,
  siElasticsearch,
  siFastapi,
  siFlask,
  siFlux,
  siGit,
  siHtml5,
  siJavascript,
  siKubernetes,
  siLinux,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siOpenjdk,
  siPandas,
  siPostgresql,
  siPython,
  siR,
  siRabbitmq,
  siReact,
  siSpringboot,
  siSupabase,
  siSwift,
  siTerraform,
  siTypescript,
} from "simple-icons";

interface Brand {
  path: string;
  hex: string;
  title: string;
}

// Curated, tree-shaken brand marks. Keys are the `brand` slugs used in data.
export const BRANDS: Record<string, Brand> = {
  python: siPython,
  typescript: siTypescript,
  javascript: siJavascript,
  c: siC,
  cpp: siCplusplus,
  java: siOpenjdk,
  swift: siSwift,
  r: siR,
  html: siHtml5,
  react: siReact,
  next: siNextdotjs,
  node: siNodedotjs,
  fastapi: siFastapi,
  django: siDjango,
  spring: siSpringboot,
  flask: siFlask,
  pandas: siPandas,
  numpy: siNumpy,
  docker: siDocker,
  kubernetes: siKubernetes,
  terraform: siTerraform,
  flux: siFlux,
  rabbitmq: siRabbitmq,
  elasticsearch: siElasticsearch,
  postgresql: siPostgresql,
  supabase: siSupabase,
  git: siGit,
  linux: siLinux,
};

interface BrandIconProps {
  slug: string;
  size?: number;
  className?: string;
}

/** Renders a Simple Icons brand mark by slug. Returns null if unknown. */
export function BrandIcon({ slug, size = 16, className }: BrandIconProps) {
  const brand = BRANDS[slug];
  if (!brand) return null;
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d={brand.path} />
    </svg>
  );
}
