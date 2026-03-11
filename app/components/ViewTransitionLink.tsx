"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import type { ComponentProps } from "react";

type ViewTransitionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

function startViewTransitionIfSupported(
  callback: () => Promise<void> | void,
): void {
  const doc = document as Document & {
    startViewTransition?: (callback: () => Promise<void> | void) => { finished: Promise<void> };
  };
  if (typeof doc.startViewTransition === "function") {
    doc.startViewTransition(callback);
  } else {
    void (typeof callback === "function" ? callback() : Promise.resolve());
  }
}

export default function ViewTransitionLink({
  href,
  children,
  onClick,
  ...rest
}: ViewTransitionLinkProps) {
  const router = useRouter();
  const isSameOrigin =
    typeof href === "string" && href.startsWith("/") && !href.startsWith("//");

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isSameOrigin) return;
      const target = e.currentTarget;
      if (target.getAttribute("target") === "_blank") return;
      e.preventDefault();
      const run = () => {
        router.push(href);
        return new Promise<void>((resolve) => setTimeout(resolve, 80));
      };
      if (typeof document !== "undefined") {
        startViewTransitionIfSupported(run);
      } else {
        run();
      }
      onClick?.(e);
    },
    [href, isSameOrigin, router, onClick],
  );

  if (!isSameOrigin) {
    return (
      <Link href={href} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
