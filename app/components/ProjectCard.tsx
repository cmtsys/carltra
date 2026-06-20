import Image from "next/image"
import type { Project } from "../../lib/projects"
import Link from "next/link";


export default function ProjectCard ({ slug, tagline, title, image }: Project) {

    return (
        <Link className="card" href={`/projects/${slug}`}>      

              {/* <div className="cardImage">
            <Image src={image} alt={title} fill />
            </div> */}

            <div className="cardImage">
              <Image 
                  src={image} 
                  alt={title} 
                  fill 
                  sizes="(max-width: 900px) 100vw, 50vw" 
              />
</div>
      <div>
        <span className="card-title">{title}</span>
        <span className="tagline">{tagline}</span>
      </div>
      </Link>
    )
  }