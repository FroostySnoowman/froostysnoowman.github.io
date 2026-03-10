"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      className="min-h-full"
      style={{ viewTransitionName: "page-content" } as React.CSSProperties}
    >
      {children}
    </motion.div>
  );
}
