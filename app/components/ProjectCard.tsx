import Image from "next/image"
import type { Project } from "../../lib/projects"
import Link from "next/link";


export default function ProjectCard ({ slug, tagline, title, image }: Project) {

    return (
        
        <Link href={`/projects/${slug}`}>
      <Image className="card" src={image} alt={title} fill/>
      <div className="card-text">
      <span className="card-title">{title}</span>
      <span className="tagline">{tagline}</span>
      </div>
      </Link>
    )
}
    