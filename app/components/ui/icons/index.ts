import { createLucideIcon } from "lucide-react";

/**
 * Original site icons, drawn on the same 24px grid and 1.75 stroke as Lucide so
 * they sit next to it. Each one is a Lucide-compatible component (size,
 * className and color via props / currentColor).
 */

/** Academic honors: a laurel pair around a star. */
export const HonorsIcon = createLucideIcon("Honors", [
  ["path", { d: "M7.5 19.5C4.2 17.6 2.9 13.6 4 9.5", key: "l" }],
  ["path", { d: "M16.5 19.5c3.3-1.9 4.6-5.9 3.5-10", key: "r" }],
  ["path", { d: "m12 6.5 1.7 3.4 3.8.5-2.8 2.6.7 3.8-3.4-1.8-3.4 1.8.7-3.8-2.8-2.6 3.8-.5L12 6.5Z", key: "s" }],
]);

/** Leadership & service: a flag planted at the top of a path. */
export const LeadershipIcon = createLucideIcon("Leadership", [
  ["path", { d: "M6 21V3.5", key: "pole" }],
  ["path", { d: "M6 4h11.5l-2.8 4 2.8 4H6", key: "flag" }],
  ["path", { d: "M3.5 21h5", key: "base" }],
]);

/** Competitions: a three-step podium with a star on top. */
export const CompetitionIcon = createLucideIcon("Competition", [
  ["path", { d: "M3 21h18", key: "ground" }],
  ["path", { d: "M4 21v-5h4.5v5", key: "second" }],
  ["path", { d: "M9.5 21V11h5v10", key: "first" }],
  ["path", { d: "M15.5 21v-7H20v7", key: "third" }],
  ["path", { d: "m12 3 1 2 2.2.3-1.6 1.5.4 2.2L12 8l-2 1 .4-2.2L8.8 5.3 11 5l1-2Z", key: "star" }],
]);

/** Certifications: a seal with a check and two ribbon tails. */
export const CertificationIcon = createLucideIcon("Certification", [
  ["circle", { cx: "12", cy: "9", r: "6", key: "seal" }],
  ["path", { d: "m9.3 9.2 1.9 1.9 3.5-3.7", key: "check" }],
  ["path", { d: "M8.4 14 7 21l5-2.6 5 2.6-1.4-7", key: "ribbon" }],
]);

/** Events & support: a calendar with a spark on the day. */
export const EventsIcon = createLucideIcon("Events", [
  ["path", { d: "M7.5 3v3M16.5 3v3", key: "rings" }],
  ["rect", { x: "3.5", y: "5", width: "17", height: "15.5", rx: "2.5", key: "page" }],
  ["path", { d: "M3.5 10h17", key: "rule" }],
  ["path", { d: "m12 12.5.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3.9-1.9Z", key: "spark" }],
]);
