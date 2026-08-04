import Image from 'next/image'
import NextProject from '../../components/NextProject';
import MetaData from '../../components/MetaData';
import One from "../../../public/img/daydream/scenario1/01.png";
import Two from "../../../public/img/daydream/scenario1/02.png";
import ProjectHero from '@/app/components/ProjectHero';


export const metadata = {
  title: "Daydreams & Doomscrolling | Carl Traberg",
  description: "Interaction design project exploring digital wellbeing.",
};

export default function daydream() {
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


      <Image
        src={One}
        className="full-image"
        alt="Scenario 1 – My screen-time doesn't understand me"
        loading="lazy"
        sizes="(max-width: 900px) 100vw, 1000px"
      />
      <div className='prose prose'>
        <p className='body-xl'>The project consists of three scenarios, each exploring a theme relating to digital wellbeing.</p></div>

      <Image
        src={Two}
        className="full-image"
        alt="Scenario 1 – My screen-time doesn't understand me"
        loading="lazy"
        sizes="(max-width: 900px) 100vw, 1000px"
      />

    </div>

    {/* <NextProject currentSlug="daydream" /> */}
    <NextProject />

  </div>
}