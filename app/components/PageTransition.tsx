"use client";

/// <reference types="react/canary" />

import { ViewTransition, type ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <ViewTransition key={pathname} name="page-content" share="page-fade" default="none">
      <main className="main">{children}</main>
    </ViewTransition>
  );
}
