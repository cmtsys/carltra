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