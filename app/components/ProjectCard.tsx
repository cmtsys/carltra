import Image from "next/image"
import type { Project } from "@/lib/projects";
import Link from "next/link";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const isVideo = project.image.endsWith(".mp4") || project.image.endsWith(".mov");


return (
    <Link className="card" href={`/projects/${project.slug}`}>
      <div className="cardImage">
        {isVideo ? (
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
            sizes="(max-width: 900px) 100vw, 50vw"
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
