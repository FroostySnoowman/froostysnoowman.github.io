import type { StaticImageData } from "next/image";

import mbp1 from "../public/img/projects/mbp/mbp1.png";
import mbp2 from "../public/img/projects/mbp/mbp2.png";
import mbp3 from "../public/img/projects/mbp/mbp3.png";
import mbp4 from "../public/img/projects/mbp/mbp4.png";
import mbp5 from "../public/img/projects/mbp/mbp5.png";

import servicesx1 from "../public/img/projects/servicesx/servicesx1.png";
import servicesx2 from "../public/img/projects/servicesx/servicesx2.png";
import servicesx3 from "../public/img/projects/servicesx/servicesx3.png";
import servicesx4 from "../public/img/projects/servicesx/servicesx4.png";
import servicesx5 from "../public/img/projects/servicesx/servicesx5.png";
import servicesx6 from "../public/img/projects/servicesx/servicesx6.png";
import servicesx7 from "../public/img/projects/servicesx/servicesx7.png";

import ticketsx1 from "../public/img/projects/ticketsx/ticketsx1.png";
import ticketsx2 from "../public/img/projects/ticketsx/ticketsx2.png";
import ticketsx3 from "../public/img/projects/ticketsx/ticketsx3.png";
import ticketsx4 from "../public/img/projects/ticketsx/ticketsx4.png";
import ticketsx5 from "../public/img/projects/ticketsx/ticketsx5.png";
import ticketsx6 from "../public/img/projects/ticketsx/ticketsx6.png";
import ticketsx7 from "../public/img/projects/ticketsx/ticketsx7.png";
import ticketsx8 from "../public/img/projects/ticketsx/ticketsx8.png";
import ticketsx9 from "../public/img/projects/ticketsx/ticketsx9.png";
import ticketsx10 from "../public/img/projects/ticketsx/ticketsx10.png";
import ticketsx11 from "../public/img/projects/ticketsx/ticketsx11.png";
import ticketsx12 from "../public/img/projects/ticketsx/ticketsx12.png";
import ticketsx13 from "../public/img/projects/ticketsx/ticketsx13.png";
import ticketsx14 from "../public/img/projects/ticketsx/ticketsx14.png";
import ticketsx15 from "../public/img/projects/ticketsx/ticketsx15.png";
import ticketsx16 from "../public/img/projects/ticketsx/ticketsx16.png";
import ticketsx17 from "../public/img/projects/ticketsx/ticketsx17.png";
import ticketsx18 from "../public/img/projects/ticketsx/ticketsx18.png";

import craftdownunderImg from "../public/img/projects/craftdownunder.png";

import portfolio1 from "../public/img/projects/portfolio/portfolio1.png";
import portfolio2 from "../public/img/projects/portfolio/portfolio2.png";
import portfolio3 from "../public/img/projects/portfolio/portfolio3.png";
import portfolio4 from "../public/img/projects/portfolio/portfolio4.png";

import b2bImg from "../public/img/projects/b2b.png";

export const PROJECT_CATEGORIES = [
  "Web Development",
  "App Development",
  "Bot Development",
  "Plugin Development",
  "Configuration & Setups",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type ProjectLinkKind = "live" | "github";

export type PortfolioProject = {
  id: number;
  title: string;
  description: string;
  images: StaticImageData[];
  link: string;
  color: string;
  categories: ProjectCategory[];
  linkKind?: ProjectLinkKind;
};

export function projectCoverImage(
  project: PortfolioProject,
): StaticImageData | undefined {
  return project.images[0];
}

export function projectOutboundLinkKind(
  project: PortfolioProject,
): ProjectLinkKind {
  return project.linkKind ?? "live";
}

export const PROJECT_OUTBOUND_LINK_LABEL: Record<ProjectLinkKind, string> = {
  live: "View live",
  github: "View on GitHub",
};

const projects: PortfolioProject[] = [
  {
    id: 1,
    title: "MyBreakPoint",
    description: "MyBreakPoint is a cross-platform tennis app (Expo/React Native for iOS, Android, and web). Users stream matches from their device, manage match and tournament calendars, and get Live Activity and push reminders; spectators can watch streams and follow live scorecards. Backend: Cloudflare Workers + D1. Payments via Stripe subscriptions and Google/Apple in-app purchases; sign-in with Google and Apple.",
    images: [mbp1, mbp2, mbp3, mbp4, mbp5],
    link: "https://mybreakpoint.net",
    linkKind: "live",
    color: "#5b21b6",
    categories: ["App Development", "Web Development"],
  },
  {
    id: 2,
    title: "ServicesX",
    description: "ServicesX is a full-stack platform that connects clients with freelancers for Discord services (bot development, server management, community support). It includes auth, applications, commissions, messaging, and an admin panel, built with React/TypeScript, Quart (Python), PostgreSQL, and an optional Discord bot, all run via Docker Compose.",
    images: [servicesx1, servicesx2, servicesx3, servicesx4, servicesx5, servicesx6, servicesx7],
    link: "https://servicesx.net",
    linkKind: "live",
    color: "#0d9488",
    categories: ["Web Development", "Bot Development"],
  },
  {
    id: 3,
    title: "TicketsX",
    description: "TicketsX is a full-stack Discord ticketing platform that lets server admins run support via private channels or threads and manage everything from a web dashboard. The backend is Python (discord.py and Quart) with MySQL, and the dashboard is a React/TypeScript app built with Vite, Radix UI, and Tailwind. It supports real-time ticket handling, transcripts, analytics, and optional premium features via Stripe.",
    images: [ticketsx1, ticketsx2, ticketsx3, ticketsx4, ticketsx5, ticketsx6, ticketsx7, ticketsx8, ticketsx9, ticketsx10, ticketsx11, ticketsx12, ticketsx13, ticketsx14, ticketsx15, ticketsx16, ticketsx17, ticketsx18],
    link: "https://ticketsx.xyz",
    linkKind: "live",
    color: "#4f46e5",
    categories: ["Web Development", "Bot Development", "Plugin Development"],
  },
  {
    id: 4,
    title: "CraftDownUnder",
    description: "Designed and maintained Craft Down Under's backend services, including Redis (pub/sub, caching, and command dispatch), relational and other databases, and REST APIs that serve 300k+ player records for lookups, bans, economy, and awards. I built and maintained integrations between Redis, databases, and game servers via Redis pub/sub, and implemented pipelines, reconnection logic, and cross-service flows so the Discord bot, APIs, and game servers stayed reliable at scale.",
    images: [craftdownunderImg],
    link: "https://www.craftdownunder.co",
    linkKind: "live",
    color: "#b45309",
    categories: [
      "Web Development",
      "Bot Development",
      "Configuration & Setups",
    ],
  },
  {
    id: 5,
    title: "Portfolio",
    description: "This portfolio site. Next.js, Tailwind, parallax backgrounds, and responsive design. Deployed on GitHub Pages.",
    images: [portfolio1, portfolio2, portfolio3, portfolio4],
    link: "https://github.com/FroostySnoowman/froostysnoowman.github.io",
    linkKind: "github",
    color: "#0e7490",
    categories: ["Web Development"],
  },
  {
    id: 6,
    title: "B2B Lead Management",
    description: "This is a Campaign Manager / Lead Management app: a React frontend on Cloudflare Pages, a Cloudflare Workers API, and Cloudflare D1 (SQLite) for storage. It supports JWT auth, campaigns, leads, admin management, and optional domain verification with automatic custom-domain setup on Pages. One remote D1 database is used for both dev and production.",
    images: [b2bImg],
    link: "#",
    linkKind: "live",
    color: "#6d28d9",
    categories: ["Web Development", "Configuration & Setups"],
  },
];

export default projects;
