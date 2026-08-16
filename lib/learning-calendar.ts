import type { PathLocale, SevenDayPathItem } from "@/lib/seven-day-path";

const SITE_ORIGIN = "https://www.aulafy.net";

export type LearningCalendarEvent = SevenDayPathItem & {
  startsAt: Date;
  endsAt: Date;
};

export function createLocalStart(date: string, time: string): Date | null {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(time);
  if (!dateMatch || !timeMatch) return null;
  const [, year, month, day] = dateMatch.map(Number);
  const [, hour, minute] = timeMatch.map(Number);
  if (month < 1 || month > 12 || hour > 23 || minute > 59) return null;
  const result = new Date(year, month - 1, day, hour, minute, 0, 0);
  if (result.getFullYear() !== year || result.getMonth() !== month - 1 || result.getDate() !== day) return null;
  return result;
}

export function createLearningSchedule(start: Date, items: SevenDayPathItem[]): LearningCalendarEvent[] {
  if (Number.isNaN(start.getTime())) return [];
  return items.map((item, index) => {
    const startsAt = new Date(start);
    startsAt.setDate(startsAt.getDate() + index);
    const endsAt = new Date(startsAt.getTime() + item.minutes * 60_000);
    return { ...item, startsAt, endsAt };
  });
}

function utcStamp(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
}

function foldLine(line: string) {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let part = "";
  let limit = 75;
  for (const character of line) {
    if (encoder.encode(part + character).length > limit) {
      parts.push(part);
      part = character;
      limit = 74;
    } else {
      part += character;
    }
  }
  parts.push(part);
  return parts.join("\r\n ");
}

export function createLearningCalendar(
  schedule: LearningCalendarEvent[],
  locale: PathLocale,
  generatedAt = new Date(),
) {
  const calendarName = locale === "en" ? "Aulafy 7-day AI path" : "Ruta de IA de 7 días de Aulafy";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Aulafy//7-day AI path//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(calendarName)}`,
    ...schedule.flatMap((event) => {
      const url = `${SITE_ORIGIN}${event.href}`;
      const dayLabel = locale === "en" ? `Day ${event.day}` : `Día ${event.day}`;
      const description = `${event.result}\n${event.minutes} min\n${url}`;
      return [
        "BEGIN:VEVENT",
        `UID:aulafy-7-day-${locale}-${event.day}-${utcStamp(event.startsAt)}@aulafy.net`,
        `DTSTAMP:${utcStamp(generatedAt)}`,
        `DTSTART:${utcStamp(event.startsAt)}`,
        `DTEND:${utcStamp(event.endsAt)}`,
        `SUMMARY:${escapeText(`${dayLabel}: ${event.title}`)}`,
        `DESCRIPTION:${escapeText(description)}`,
        `URL:${url}`,
        "TRANSP:OPAQUE",
        "END:VEVENT",
      ];
    }),
    "END:VCALENDAR",
  ];
  return `${lines.map(foldLine).join("\r\n")}\r\n`;
}
