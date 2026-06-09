import { projects } from "@/data/projects";
import { hackathons } from "@/data/hackathons";
import type { HackathonProject, Project } from "@/types";

export type WorkKind = "project" | "hackathon";
export type WorkItem = (Project | HackathonProject) & { kind: WorkKind };

const projectItems: WorkItem[] = projects.map((project) => ({
  ...project,
  kind: "project" as const,
}));
const hackathonItems: WorkItem[] = hackathons.map((project) => ({
  ...project,
  kind: "hackathon" as const,
}));

const WORK_ORDER = ["beachlens", "caseforward-ai", "subscriptos", "ai-advisor"];

const rank = (slug: string): number => {
  const index = WORK_ORDER.indexOf(slug);
  return index === -1 ? WORK_ORDER.length : index;
};

export const allWork: WorkItem[] = [...projectItems, ...hackathonItems].sort(
  (a, b) => rank(a.slug) - rank(b.slug),
);

export function allWorkSlugs(): string[] {
  return allWork.map((item) => item.slug);
}

export function getWorkBySlug(slug: string): WorkItem | undefined {
  return allWork.find((item) => item.slug === slug);
}

export function isHackathon(
  item: WorkItem,
): item is HackathonProject & { kind: "hackathon" } {
  return item.kind === "hackathon";
}
