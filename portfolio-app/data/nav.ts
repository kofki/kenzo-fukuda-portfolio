import type { NavItem } from "@/types";

// Order matches the page. Each sectionId must match the id on its <section>.
// Logbook is the writing: one section and one link for everything Kenzo writes.
export const navItems: NavItem[] = [
  { label: "Projects", sectionId: "projects" },
  { label: "About", sectionId: "about" },
  { label: "Experience", sectionId: "experience" },
  { label: "Logbook", sectionId: "logbook" },
];
