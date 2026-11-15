"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { Experience } from "@/types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function sortKey(date: string): number {
  const [mon, year] = date.split(" ");
  return Number(year) * 12 + Math.max(0, MONTHS.indexOf(mon));
}

function yearOf(date: string): string {
  return date.split(" ")[1] ?? date;
}

function dates(role: Experience): string {
  const end = role.end === "Present" ? "now" : role.end;
  // "Sep 2025 – Dec 2025" reads better as "Sep – Dec 2025".
  if (yearOf(role.start) === yearOf(role.end)) {
    return `${role.start.split(" ")[0]} – ${end}`;
  }
  return `${role.start} – ${end}`;
}

function RoleRow({ role }: { role: Experience }) {
  const current = role.current || role.end === "Present";
  return (
    <li className="flex gap-3.5 border-b border-cream/15 py-3.5 sm:gap-4">
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
        {role.logo ? (
          <Image src={role.logo} alt="" width={30} height={30} className="size-[30px] object-contain" />
        ) : (
          <span className="text-xs font-bold text-indigo">{role.company.slice(0, 2)}</span>
        )}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-x-3 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-[15px]">
            <span className="font-bold">{role.role}</span>
            <span className="text-cream/75"> · {role.company}</span>
          </p>
          <p className={cn("shrink-0 text-xs font-medium", current ? "text-coral-soft" : "text-cream/70")}>
            {dates(role)}
          </p>
        </div>
        <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-cream/80">{role.summary}</p>
      </div>
    </li>
  );
}

/**
 * Every role visible in one list, newest first and grouped by the year it
 * started. Roles with no engineering discipline (mentoring, chapter work)
 * fold into "earlier roles". (The discipline filter lives on Projects.)
 */
export function ExperienceList({ experiences }: { experiences: Experience[] }) {
  const [showEarlier, setShowEarlier] = useState(false);

  const sorted = useMemo(
    () => [...experiences].sort((a, b) => sortKey(b.start) - sortKey(a.start)),
    [experiences],
  );
  const main = sorted.filter((role) => role.domains?.length);
  const earlier = sorted.filter((role) => !role.domains?.length);
  const rows = showEarlier ? [...main, ...earlier] : main;

  const years: { year: string; roles: Experience[] }[] = [];
  for (const role of rows) {
    const year = yearOf(role.start);
    const group = years.find((g) => g.year === year);
    if (group) group.roles.push(role);
    else years.push({ year, roles: [role] });
  }

  return (
    <div>
      <div className="mt-6 max-w-2xl">
        {years.map((group) => (
          <div key={group.year}>
            <p className="mt-5 flex items-center gap-2 font-display text-sm text-coral-soft">
              <span aria-hidden className="h-0.5 w-4 bg-coral-soft" />
              {group.year}
            </p>
            <ul>
              {group.roles.map((role) => (
                <RoleRow key={role.id} role={role} />
              ))}
            </ul>
          </div>
        ))}
        {earlier.length ? (
          <button
            type="button"
            onClick={() => setShowEarlier((open) => !open)}
            className="mt-3 min-h-11 text-[13px] text-cream/75 hover:text-cream"
          >
            {showEarlier ? "Hide earlier roles" : `+ ${earlier.length} earlier roles in mentoring and chapter work`}
            <span aria-hidden className="ml-1.5">→</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
