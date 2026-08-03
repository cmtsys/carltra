import Image from "next/image"
import type { Project } from "@/lib/projects";
import Link from "next/link";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {

  return (
    <Link className="card" href={`/projects/${project.slug}`}>

      <div className="cardImage">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      </div>
      <div>
        <span className="card-title">{project.title}</span>
        <span className="tagline">{project.tagline}</span>
      </div>
    </Link>
  )
}

// import Image from "next/image"
// import type { Project } from "../../lib/projects"
// import Link from "next/link"



// export default function ProjectCard({ slug, tagline, title, image, comingSoon }: Project) {
//   const cardContent = (
//     <>
//       <div className="cardImage">
//         <Image
//           src={image}
//           alt={title}
//           fill
//           sizes="(max-width: 900px) 100vw, 50vw"
//         />
//         {comingSoon && (
//           <div className="coming-soon-overlay">
//             <span className="label">Coming soon</span>
//           </div>
//         )}
//       </div>
//       <div>
//         <span className="card-title">{title}</span>
//         <span className="tagline">{tagline}</span>
//       </div>
//     </>
//   )

//   if (comingSoon) {
//     return <div className="card card--disabled">{cardContent}</div>
//   }

//   return (
//     <Link className="card" href={`/projects/${slug}`}>
//       {cardContent}
//     </Link>
//   )
// }