import mybreakpointImg from "../public/img/projects/mybreakpoint.png";
import servicesxImg from "../public/img/projects/servicesx.png";
import ticketsxImg from "../public/img/projects/ticketsx.png";

const projects = [
  {
    id: 1,
    title: "MyBreakPoint",
    description: "MyBreakPoint is a cross-platform tennis app (Expo/React Native for iOS, Android, and web). Users stream matches from their device, manage match and tournament calendars, and get Live Activity and push reminders; spectators can watch streams and follow live scorecards. Backend: Cloudflare Workers + D1. Payments via Stripe subscriptions and Google/Apple in-app purchases; sign-in with Google and Apple.",
    image_path: mybreakpointImg,
    link: "https://mybreakpoint.net",
    color: "#5b21b6",
  },
  {
    id: 2,
    title: "ServicesX",
    description: "ServicesX is a full-stack platform that connects clients with freelancers for Discord services (bot development, server management, community support). It includes auth, applications, commissions, messaging, and an admin panel, built with React/TypeScript, Quart (Python), PostgreSQL, and an optional Discord bot, all run via Docker Compose.",
    image_path: servicesxImg,
    link: "https://servicesx.net",
    color: "#0d9488",
  },
  {
    id: 3,
    title: "TicketsX",
    description: "TicketsX is a full-stack Discord ticketing platform that lets server admins run support via private channels or threads and manage everything from a web dashboard. The backend is Python (discord.py and Quart) with MySQL, and the dashboard is a React/TypeScript app built with Vite, Radix UI, and Tailwind. It supports real-time ticket handling, transcripts, analytics, and optional premium features via Stripe.",
    image_path: ticketsxImg,
    link: "https://ticketsx.xyz",
    color: "#4f46e5",
  },
];

export default projects;
