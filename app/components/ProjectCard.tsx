import Image from "next/image"
import type { Project } from "@/lib/projects";
import Link from "next/link";
import ProjectCardVideo from "./ProjectCardVideo";

// Match the one-column mobile grid and the desktop grid's 840px maximum.
const cardSizes = "(max-width: 600px) calc(100vw - 32px), (max-width: 856px) calc((100vw - 80px) / 2), 388px";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const isVideo = project.image.endsWith(".mp4") || project.image.endsWith(".mov");


return (
    <Link className="card" href={`/projects/${project.slug}`}>
      <div className="cardImage">
        {project.cardPreview ? (
          <ProjectCardVideo {...project.cardPreview} title={project.title} sizes={cardSizes} />
        ) : isVideo ? (
          <video
            src={project.image}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            unoptimized={project.image.toLowerCase().endsWith(".gif")}
            fill
            sizes={cardSizes}
          />
        )}
      </div>

      <div>
        <span className="card-title">{project.title}</span>
        <span className="tagline">{project.tagline}</span>
      </div>
    </Link>
  )
}
