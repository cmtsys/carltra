import Image from 'next/image'
import NextProject from '../../components/NextProject';
import MetaData from '../../components/MetaData';
import One from "../../../public/img/daydream/scenario1/01.png";
import Two from "../../../public/img/daydream/scenario1/02.png";


export const metadata = {
  title: "Daydreams & Doomscrolling | Carl Traberg",
  description: "Interaction design project exploring digital wellbeing.",
};

export default function daydream() {
  return <div className="content">

    <p className="label">Master&apos;s thesis at aho</p>
    <h1 className="heading-serif">Daydreams & Dommscroll</h1>

    <Image
      src="/img/daydream/daydream2.png"
      className='full-image'
      alt="Main image"
      width={8640}
      height={4860}
      sizes="(max-width: 900px) 100vw, 1000px"
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

    <NextProject currentSlug="daydream" />

  </div>
}