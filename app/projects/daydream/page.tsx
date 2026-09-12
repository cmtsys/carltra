import Image from 'next/image'
import NextProject from '../../components/NextProject';
import MetaData from '../../components/MetaData';
import One from "../../../public/img/daydream/scenario1/01.png";
import Two from "../../../public/img/daydream/scenario1/02.png";
import ProjectHero from '@/app/components/ProjectHero';
import { ExternalLink } from "lucide-react";


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
        <p className='body-xl'><i>Digital introspection</i> is a project exploring new ways of contextualizing screen usage, disconnecting, and preserve introspective mind-states.</p>

{/*   
        <p className='body-xl'>Smartphones are designed to capture attention, but what happens to the moments when we aren’t trying to pay attention?</p>

        <p className='body-xl'>How do we hold onto mind-wandering and daydreaming in a world built around the smartphone? Digital Introspection explores new ways of contextualizing screen usage, disconnecting, and protecting these introspective mind-states.</p> */}
        
        </div>

      {/* CONTEXT  */}
      <section className='case-section'>
        <div className="prose">
          {/* <p className="body-m">QUICK FIX</p> */}

          <p className="body-l">
            Here I will write a paragraph about the context of the project, and why I decided to explore this theme.
          </p>
        </div>
      </section>


      {/* PROBLEM FRAMING  */}
      <section className='case-section'>
        <div className="prose">
          <p className="body-m">WHAT IS THE PROBLEM?</p>

          <p className="body-l">
            Here I will write a paragraph about the problem framing and my research question.
          </p>
        </div>
      </section>


      {/* RESERACH AND EXPLORATION  */}
      <section className='case-section'>
        <div className="prose">
          <p className="body-m">RESERACH & EXPLORATION</p>

          <p className="body-l">
            Here I will write what I found and what it meant for the process.
          </p>
        </div>
      </section>

      {/* RESERACH AND EXPLORATION  */}
      <section className='case-section'>
        <div className="prose">
          <p className="body-m">THE THREE SCENARIOS</p>

          <p className="body-l">
            Here I will write what I found and what it meant for the process.
          </p>
        </div>
      </section>

      {/* RESERACH AND EXPLORATION  */}
      <section className='case-section'>
        <div className="prose">
          <p className="body-m">WHAT I LEARNED & THE OUTCOME</p>

          <p className="body-l">
            Here I will write what a reflection. Would I do anything differently today? I would definitely test more. Also, did it change how I thought about digital wellbeing? I guess it did, now I no longer judge anyone for spening time on their phone - first off, it is rigged, but second, it can be highly meaningful time spent, and who am I to judge anyone for what they find meaning in.
          </p>
        </div>
      </section>


      {/* OUTCOME  */}
      <section className='case-section'>
        <div className="prose">
          <p className="body-m">WHAT I LEARNED & THE OUTCOME</p>

          <p className="body-l">
            Here I will write what a reflection. Would I do anything differently today? I would definitely test more. Also, did it change how I thought about digital wellbeing? I guess it did, now I no longer judge anyone for spening time on their phone - first off, it is rigged, but second, it can be highly meaningful time spent, and who am I to judge anyone for what they find meaning in.
          </p>
        </div>
      </section>

{/* IMAGES */}

<section>
      <Image
        src={One}
        className="full-image"
        alt="Scenario 1 – My screen-time doesn't understand me"
        loading="lazy"
        sizes="(max-width: 900px) 100vw, 1000px"
      />

      <Image
        src={Two}
        className="full-image"
        alt="Scenario 1 – My screen-time doesn't understand me"
        loading="lazy"
        sizes="(max-width: 900px) 100vw, 1000px"
      />

  <figure className="image-block">
    <Image
      src="/img/daydream/scenario2-taming/01.png"
      className="full-image"
      alt="Daydreams & Doomscrolling scenario 2 screen 1"
      width={8640}
      height={4860}
      sizes="(max-width: 900px) 100vw, 1000px"
    />
  </figure>

  <figure className="image-block">
    <Image
      src="/img/daydream/scenario2-taming/small/02.jpg"
      className="full-image"
      alt="Daydreams & Doomscrolling scenario 2 screen 2"
      width={2000}
      height={1125}
      sizes="(max-width: 900px) 100vw, 1000px"
    />
  </figure>

  <figure className="image-block">
    <Image
      src="/img/daydream/scenario2-taming/small/02-1.jpg"
      className="full-image"
      alt="Daydreams & Doomscrolling scenario 2 alternate screen"
      width={8640}
      height={4860}
      sizes="(max-width: 900px) 100vw, 1000px"
    />
  </figure>

  <figure className="image-block">
    <Image
      src="/img/daydream/scenario2-taming/small/03.jpg"
      className="full-image"
      alt="Daydreams & Doomscrolling scenario 2 screen 3"
      width={2000}
      height={1125}
      sizes="(max-width: 900px) 100vw, 1000px"
    />
  </figure>

  <figure className="image-block">
    <Image
      src="/img/daydream/scenario2-taming/small/04.jpg"
      className="full-image"
      alt="Daydreams & Doomscrolling scenario 2 screen 4"
      width={8640}
      height={4860}
      sizes="(max-width: 900px) 100vw, 1000px"
    />
  </figure>

  <figure className="image-block">
    <Image
      src="/img/daydream/scenario2-taming/small/05.jpg"
      className="full-image"
      alt="Daydreams & Doomscrolling scenario 2 screen 5"
      width={8640}
      height={4860}
      sizes="(max-width: 900px) 100vw, 1000px"
    />
  </figure>

  <figure className="image-block">
    <Image
      src="/img/daydream/scenario2-taming/small/06.jpg"
      className="full-image"
      alt="Daydreams & Doomscrolling scenario 2 screen 6"
      width={8640}
      height={4860}
      sizes="(max-width: 900px) 100vw, 1000px"
    />
  </figure>
  </section>
    

      <section className="case-section">
        <div className="prose">
          <p className="body-l">
            Digital Introspection won Best Design Diploma at the AHO Works Awards.
          </p>
          <p className="body-l">
            Curious about the full process?{" "}
            <a
              href="https://drive.google.com/file/d/1Tit96AjQl0OMm7Z1-i0DKRFWtrK9zpHK/view?usp=sharing"
              className="underline-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read it here <ExternalLink size={16} />
            </a>
            .
          </p>
        </div>
      </section>

    </div>

    <NextProject />
  </div>
}