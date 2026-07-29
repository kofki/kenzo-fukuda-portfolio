import type { Experience } from "@/types";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// US academic calendar: Jan-Apr spring, May-Aug summer, Sep-Dec fall.
const SEASONS = ["Spring", "Summer", "Fall"] as const;

function termIndex(season: string, year: number): number {
  return year * 3 + SEASONS.indexOf(season as (typeof SEASONS)[number]);
}

function seasonOf(month: string): (typeof SEASONS)[number] {
  const i = MONTHS.indexOf(month);
  return i <= 3 ? "Spring" : i <= 7 ? "Summer" : "Fall";
}

function parseDate(value: string): { season: string; year: number } | null {
  const [month, year] = value.split(" ");
  if (!MONTHS.includes(month) || !year) return null;
  return { season: seasonOf(month), year: Number(year) };
}

/** "Fall 2025" for a "Sep 2025" start. */
export function termLabel(start: string): string {
  const parsed = parseDate(start);
  return parsed ? `${parsed.season} ${parsed.year}` : start;
}

export interface TimelineBar {
  role: Experience;
  /** Where the bar begins, in card slots from the left edge of its column. */
  startSlot: number;
  /**
   * Bar length in card slots. Slots rather than terms because columns differ in
   * width — a term holding two roles is two cards wide — so a bar covering N
   * slots is `N * cardWidth + (N - 1) * gap` whatever columns it crosses.
   */
  slots: number;
  /**
   * Slot the connector drops from, in the same column-relative coordinates. This
   * is the bar's left end for a normal role, but its right end for a role whose
   * card is pinned ahead of where its bar starts.
   */
  connectorSlot: number;
  /** Lane for the bar, so concurrent bars don't draw on top of each other. */
  lane: number;
}

export interface TimelineColumn {
  key: string;
  label: string;
  /** True for the trailing "Now" column, which is styled as the accent. */
  isNow: boolean;
  /** Cards to render side by side in this term. */
  cards: Experience[];
  /** Bars that begin in this term (may extend well past it). */
  bars: TimelineBar[];
  /** Card slots wide; at least 1 so an empty term still holds its place. */
  width: number;
}

/**
 * Turns the role list into the columns of the timeline.
 *
 * The axis is the time scale, not the roles: every term between the earliest and
 * latest date gets a column, so a term with nothing in it still shows a tick.
 * Cards align under the term the role began in — except a role carrying an
 * explicit `term`, whose card is pinned to a trailing column while its bar still
 * starts at the term it really began in.
 */
export function buildTimeline(experiences: Experience[]): TimelineColumn[] {
  const columns: TimelineColumn[] = [];

  // Every start and end date contributes a term, so a bar can never run off the
  // end of the axis.
  const marks: number[] = [];
  for (const role of experiences) {
    for (const value of [role.start, role.end]) {
      const p = parseDate(value);
      if (p) marks.push(termIndex(p.season, p.year));
    }
  }

  if (marks.length > 0) {
    for (let i = Math.min(...marks); i <= Math.max(...marks); i += 1) {
      const label = `${SEASONS[i % 3]} ${Math.floor(i / 3)}`;
      columns.push({
        key: label,
        label,
        isNow: false,
        cards: [],
        bars: [],
        width: 1,
      });
    }
  }

  for (const role of experiences) {
    if (!role.term) continue;
    if (!columns.some((c) => c.key === role.term && c.isNow)) {
      columns.push({
        key: role.term,
        label: role.term,
        isNow: true,
        cards: [],
        bars: [],
        width: 1,
      });
    }
  }

  const columnOf = (label: string) => columns.findIndex((c) => c.key === label);
  const lastIndex = columns.length - 1;

  // Pass 1: place cards, and work out each bar's column range.
  const planned: {
    role: Experience;
    cardColumn: number;
    cardOffset: number;
    barStart: number;
    barEnd: number;
  }[] = [];

  for (const role of experiences) {
    const startTerm = columnOf(termLabel(role.start));
    const cardColumn = role.term ? columnOf(role.term) : startTerm;
    if (cardColumn === -1) continue;

    const barStart = startTerm === -1 ? cardColumn : startTerm;

    const parsedEnd = parseDate(role.end);
    let barEnd = barStart;
    if (role.end === "Present") barEnd = lastIndex;
    else if (parsedEnd) {
      const found = columnOf(`${parsedEnd.season} ${parsedEnd.year}`);
      if (found !== -1) barEnd = found;
    }
    // A pinned card sits at or beyond its bar's natural end.
    barEnd = Math.max(barEnd, cardColumn, barStart);

    const cardOffset = columns[cardColumn].cards.length;
    columns[cardColumn].cards.push(role);
    planned.push({ role, cardColumn, cardOffset, barStart, barEnd });
  }

  // Pass 2: widths are known only once every card is placed.
  for (const column of columns) column.width = Math.max(1, column.cards.length);

  // Absolute slot index of each column's left edge, for lane packing.
  const columnSlot: number[] = [];
  let running = 0;
  for (const column of columns) {
    columnSlot.push(running);
    running += column.width;
  }

  // Pass 3: size each bar and locate its connector.
  const sized = planned.map(
    ({ role, cardColumn, cardOffset, barStart, barEnd }) => {
      const sameColumn = barStart === cardColumn;

      // Starting in its own column, a bar begins at its own card and counts that
      // card as exactly one slot — otherwise a single-term role would draw
      // across a column-mate's card. Starting earlier, it begins at the column
      // edge and covers every slot it crosses.
      const startSlot = sameColumn ? cardOffset : 0;
      let slots = sameColumn ? 1 : columns[barStart].width;
      for (let i = barStart + 1; i <= barEnd; i += 1) slots += columns[i].width;

      // The connector must land on the card, which for a pinned role is at the
      // far end of the bar.
      const connectorSlot = sameColumn
        ? cardOffset
        : columnSlot[cardColumn] - columnSlot[barStart] + cardOffset;

      return { role, barStart, startSlot, slots, connectorSlot };
    },
  );

  // Pass 4: pack bars into lanes over absolute slot ranges, greedily by start.
  const laneEnds: number[] = [];
  const ordered = [...sized].sort(
    (a, b) =>
      columnSlot[a.barStart] + a.startSlot -
      (columnSlot[b.barStart] + b.startSlot),
  );
  const lanes = new Map<string, number>();
  for (const bar of ordered) {
    const from = columnSlot[bar.barStart] + bar.startSlot;
    const to = from + bar.slots - 1;
    let lane = laneEnds.findIndex((end) => end < from);
    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(to);
    } else {
      laneEnds[lane] = to;
    }
    lanes.set(bar.role.id, lane);
  }

  for (const bar of sized) {
    columns[bar.barStart].bars.push({
      role: bar.role,
      startSlot: bar.startSlot,
      slots: bar.slots,
      connectorSlot: bar.connectorSlot,
      lane: lanes.get(bar.role.id) ?? 0,
    });
  }

  return columns;
}
