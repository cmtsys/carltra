// import { project } from "@/lib/projects";
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
      label="Editorial design"
      title="Art Direction for Kote"
      imageSrc="/img/kote/kote_14.jpg"
      imageAlt="Daydreams & Doomscrolling hero image"
      imageWidth={8640}
      imageHeight={4860}
    />

    <MetaData
      year="2020—21"
      role="Art Director"
      skills="Editorial Design, InDesign"
      client="+Kote"
    />

    <div className='project-blocks'>

      <div className='prose'>
        <p className='body-xl'>
          +KOTE is an independent student-led publication exploring our physical surroundings through architecture, urbanism, landscape and design.
        </p></div>

      <div className='prose'>
        <p className='body-l'>
          As Art Director, I developed the visual identity for three issues, translating each theme into a distinct visual language.
        </p></div>



    </div>

    <NextProject />
  </div>
}