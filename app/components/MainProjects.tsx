import Link from "next/link";
import projects from "../../lib/projects"
import ProjectCard from "./ProjectCard"

export default function MainProjects () {

    const featured = projects.filter(p => p.featured)

    return (
        <section className="grid">

        {featured.map( p =>
            <ProjectCard key={p.slug} title={p.title} tagline={p.tagline} image={p.image} ></ProjectCard>
        )}
        
        </section>
    )
}