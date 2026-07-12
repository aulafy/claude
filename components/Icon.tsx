import type { HTMLAttributes } from "react";

export const iconMap = {
  aulafy: "fa-graduation-cap",
  advanced: "fa-bolt",
  audio: "fa-volume-high",
  automation: "fa-gears",
  book: "fa-book-open",
  box: "fa-box-open",
  brain: "fa-brain",
  briefcase: "fa-briefcase",
  building: "fa-building",
  calendar: "fa-calendar-days",
  capsule: "fa-cubes-stacked",
  chart: "fa-chart-line",
  chat: "fa-comments",
  check: "fa-check",
  chevronRight: "fa-chevron-right",
  circleQuestion: "fa-circle-question",
  clipboard: "fa-clipboard",
  close: "fa-xmark",
  code: "fa-code",
  command: "fa-keyboard",
  compare: "fa-code-compare",
  cookie: "fa-cookie",
  copy: "fa-copy",
  cube: "fa-cube",
  database: "fa-database",
  desktop: "fa-desktop",
  document: "fa-file-lines",
  download: "fa-download",
  email: "fa-envelope",
  experiment: "fa-flask-vial",
  external: "fa-arrow-up-right-from-square",
  filePdf: "fa-file-pdf",
  fileContract: "fa-file-contract",
  folder: "fa-folder-tree",
  gear: "fa-gear",
  globe: "fa-globe",
  grid: "fa-table-cells-large",
  hammer: "fa-hammer",
  home: "fa-house",
  hook: "fa-anchor",
  idea: "fa-lightbulb",
  image: "fa-image",
  install: "fa-download",
  lab: "fa-flask",
  landing: "fa-window-maximize",
  laptopCode: "fa-laptop-code",
  legal: "fa-scale-balanced",
  linkedin: "fa-linkedin-in",
  link: "fa-link",
  listCheck: "fa-list-check",
  lock: "fa-lock",
  magic: "fa-wand-magic-sparkles",
  menu: "fa-bars",
  microphone: "fa-microphone-lines",
  mobile: "fa-mobile-screen-button",
  moon: "fa-moon",
  network: "fa-network-wired",
  palette: "fa-palette",
  paperPlane: "fa-paper-plane",
  pdf: "fa-file-pdf",
  plug: "fa-plug",
  prompt: "fa-bullseye",
  printer: "fa-print",
  python: "fa-code",
  quote: "fa-quote-left",
  recipe: "fa-kitchen-set",
  recycle: "fa-rotate",
  refresh: "fa-arrows-rotate",
  robot: "fa-robot",
  rocket: "fa-rocket",
  route: "fa-route",
  save: "fa-floppy-disk",
  search: "fa-magnifying-glass",
  seed: "fa-seedling",
  server: "fa-server",
  shield: "fa-shield-halved",
  sparkle: "fa-star",
  spreadsheet: "fa-table",
  star: "fa-star",
  sun: "fa-sun",
  terminal: "fa-terminal",
  testTube: "fa-vial",
  tools: "fa-screwdriver-wrench",
  userGraduate: "fa-user-graduate",
  users: "fa-users-gear",
  userShield: "fa-user-shield",
  upload: "fa-upload",
  video: "fa-video",
  warning: "fa-triangle-exclamation",
  wordpress: "fa-brush",
  xTwitter: "fa-x-twitter",
} as const;

export type IconName = keyof typeof iconMap;

type IconProps = HTMLAttributes<HTMLElement> & {
  name: IconName;
  family?: "solid" | "brands" | "regular";
  fixedWidth?: boolean;
};

export default function Icon({
  name,
  family = "solid",
  fixedWidth = true,
  className = "",
  ...props
}: IconProps) {
  const prefix = family === "brands" ? "fa-brands" : family === "regular" ? "fa-regular" : "fa-solid";
  return (
    <i
      aria-hidden="true"
      className={`${prefix} ${iconMap[name]}${fixedWidth ? " fa-fw" : ""}${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
