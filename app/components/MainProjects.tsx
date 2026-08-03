import projects from "@/lib/projects";
import ProjectCard from "./ProjectCard";

export default function MainProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="grid">
      {featured.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </section>
  );
}

// import projects from "../../lib/projects"
// import ProjectCard from "./ProjectCard"

// export default function MainProjects () {

//     const featured = projects.filter(p => p.featured)

//     return (
//         <section className="grid">

//         {featured.map( p =>
//             <ProjectCard 
//                 key={p.slug} 
//                 slug={p.slug}
//                 title={p.title} 
//                 tagline={p.tagline} 
//                 image={p.image}
//                 link={p.link} 
//                 comingSoon={p.comingSoon}
//                  />
//         )}
        
//         </section>
//     )
// }