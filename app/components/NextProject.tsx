import projects from "@/lib/projects"
import Link from "next/link";

type NextProjectProps = {
  currentSlug: string
}

export default function NextProject({ currentSlug }: NextProjectProps) {
  const featured = projects.filter((project) => project.featured)
  const currentIndex = featured.findIndex((project) => project.slug === currentSlug)

  const nextIndex = (currentIndex + 1) % featured.length
  const prevIndex = (currentIndex - 1 + featured.length) % featured.length

  const next = featured[nextIndex]
  const previous = featured[prevIndex]

  return (
    <div className="project-nav">
      <Link className="logo-link" href={previous.link ?? "#"}>
        <p>← Previous</p>
      </Link>

      <Link className="logo-link next" href={next.link ?? "#"}>
        <p>Next →</p>
      </Link>
    </div>
  )
}