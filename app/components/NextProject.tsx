"use client";

import projects from "@/lib/projects";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NextProject() {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").filter(Boolean).at(-1);

  const featured = projects.filter((project) => project.featured);
  const currentIndex = featured.findIndex(
    (project) => project.slug === currentSlug
  );

  if (currentIndex === -1) return null;

  const nextIndex = (currentIndex + 1) % featured.length;
  const prevIndex = (currentIndex - 1 + featured.length) % featured.length;

  const next = featured[nextIndex];
  const previous = featured[prevIndex];

  return (
    <div className="project-nav">
      <Link className="underline-link" href={previous.link ?? "#"}>
        <p>← Previous</p>
      </Link>

      <Link className="underline-link next" href={next.link ?? "#"}>
        <p>Next →</p>
      </Link>
    </div>
  );
}