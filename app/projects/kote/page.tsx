import { project } from "@/lib/projects";
import Image from 'next/image'
import NextProject from '@/app/components/NextProject';
import MetaData from '@/app/components/MetaData';
import ProjectHero from '@/app/components/ProjectHero';

export const metadata = {
  title: "Project Name | Carl Traberg",
  description: "Short specific description.",
};

export default function kote() {
  return <div className="content">


    <ProjectHero
      label="Master's thesis at AHO"
      title="Daydreams & Doomscrolling"
      imageSrc="/img/daydream/daydream2.png"
      imageAlt="Daydreams & Doomscrolling hero image"
      imageWidth={8640}
      imageHeight={4860}
    />

    <MetaData
      year="2023"
      role="Student project"
      skills="Research, UX, UI, Prototyping"
      client="Oslo School of Architecture and Design"
    />

    <div className='project-blocks'>

      <div className='prose'>

        <p className='body-xl'><i>Digital introspection</i> is a design project exploring new ways of contextualizing screen usage, disconnecting, and preserve introspective mind-states.</p></div>


    </div>

    <NextProject />
  </div>
}