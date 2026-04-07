"use client";

import Image from "next/image";
import { IconExternalLink } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { fontInter } from "@/lib/font";
import type { PortfolioProject } from "@/lang/data-projects-en";
import {
  PROJECT_OUTBOUND_LINK_LABEL,
  projectOutboundLinkKind,
} from "@/lang/data-projects-en";
import githubBadge from "../../public/img/social_media/github-badge.svg";

type Props = {
  project: PortfolioProject;
  className?: string;
};

export default function ProjectOutboundLink({ project, className }: Props) {
  const { link } = project;
  if (!link || link === "#") return null;

  const kind = projectOutboundLinkKind(project);
  const label = PROJECT_OUTBOUND_LINK_LABEL[kind];

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "mt-4 inline-flex items-center gap-2 rounded-lg border border-blue-6/60 bg-blue-8/50 px-4 py-2.5 text-sm font-medium text-white-1 transition-colors hover:border-blue-5 hover:bg-blue-7/70",
        fontInter.className,
        className,
      )}
    >
      {kind === "github" ? (
        <Image
          src={githubBadge}
          alt=""
          width={20}
          height={20}
          className="shrink-0"
        />
      ) : (
        <IconExternalLink
          className="size-5 shrink-0 text-blue-3"
          stroke={1.75}
          aria-hidden
        />
      )}
      {label}
    </a>
  );
}
