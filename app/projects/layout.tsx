import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Jacob Beal",
  description:
    "Explore all projects by Jacob Beal: full-stack apps, Discord platforms, mobile apps, and more.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
