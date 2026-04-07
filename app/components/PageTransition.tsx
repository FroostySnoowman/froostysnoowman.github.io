"use client";

import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="min-h-full"
      style={{ viewTransitionName: "page-content" } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
