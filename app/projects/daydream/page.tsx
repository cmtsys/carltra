import Image from 'next/image'
import NextProject from '../../components/NextProject';
import MetaData from '../../components/MetaData';
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

        <p className='body-xl'><i>Digital introspection</i> is my diploma project at AHO, exploring new ways of contextualizing screen usage and preserve introspective mind-states.</p>

        {/* <p className="body-l">
            Most digital wellbeing tools focus on reducing screen time, maintaining focus or improving productivity. What other values we could support?
          </p> */}

        <p className='body-l'>The project won Best Design Diploma at the AHO WORKS AWARDS.</p>

          
        <p className='body-l'>Many people struggle to balance their screen use. Most digital wellbeing tools focus on reducing screen time, maintaining focus, or improving productivity.

But is productivity the only thing we lose through excessive screen use? What other values could we design for, and what does “healthy use” actually mean?</p>



      </div>

      <figure className="image-block">
        <Image
          src="/img/daydream/overview.jpg"
          className="full-image"
          alt="Daydreams & Doomscrolling scenario 2 screen 1"
          width={8640}
          height={4860}
          sizes="(max-width: 900px) 100vw, 1000px"
        />
      </figure>

      {/* CONTEXT  */}
      <section className='case-section'>
        <div className="prose">
          <p className="body-m">CONTEXT</p>
          <p className='body-l'></p>

        </div>
      </section>


      {/* PROBLEM FRAMING  */}
      <section className='case-section'>
        <div className="prose">
          <p className="body-m">WHAT IS THE PROBLEM?</p>

          <p className="body-l">
            How do we hold onto mind-wandering and daydreaming in a world built around the smartphone?
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

      {/* WHY DAYDREAMING?  */}
      <section className='case-section'>
        <div className="prose">
          <p className="body-m">BUT WHY DAYDREAMING?</p>

          <p className="body-l">
            I found that daydreaming worked as a more tangible way of communicating ideas from psychology and neuroscience around introspection and the brain’s default mode network.  </p>
        </div>
      </section>

      {/* RESERACH AND EXPLORATION  */}
      <section className='case-section'>
        <div className="prose">
          <p className="body-m">RESEARCH & EXPLORATION</p>

          <p className="body-l">
            Research stuff here
          </p>
        </div>
      </section>


      {/* OUTCOME  */}
      <section className='case-section'>
        <div className="prose">
          <p className="body-m">WHAT I LEARNED & THE OUTCOME</p>

          <p className="body-l">
            Outcome?
          </p>
        </div>
      </section>

      {/* IMAGES */}

      <section>

        {/* SCENARIO 1 */}
        <figure className="image-block">
          <Image
            src="/img/daydream/scenario1/01.png"
            className="full-image"
            alt="Daydreams & Doomscrolling scenario 2 screen 1"
            width={8640}
            height={4860}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
        </figure>

        <figure className="image-block">
          <Image
            src="/img/daydream/scenario1/02.png"
            className="full-image"
            alt="Daydreams & Doomscrolling scenario 2 screen 1"
            width={8640}
            height={4860}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
        </figure>

        <figure className="image-block">
          <Image
            src="/img/daydream/scenario1/03.png"
            className="full-image"
            alt="Daydreams & Doomscrolling scenario 2 screen 1"
            width={8640}
            height={4860}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
        </figure>
        <figure className="image-block">
          <Image
            src="/img/daydream/scenario1/04.png"
            className="full-image"
            alt="Daydreams & Doomscrolling scenario 2 screen 1"
            width={8640}
            height={4860}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
        </figure>
        <figure className="image-block">
          <Image
            src="/img/daydream/scenario1/05.png"
            className="full-image"
            alt="Daydreams & Doomscrolling scenario 2 screen 1"
            width={8640}
            height={4860}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
        </figure>


        {/* SCENARIO 2 */}

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
            alt="Daydreams & Doomscrolling scenario 2 alternate screen"
            width={8640}
            height={4860}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
        </figure>

        <figure className="image-block">
          <Image
            src="/img/daydream/scenario2-taming/small/02-1.jpg"
            className="full-image"
            alt="Daydreams & Doomscrolling scenario 2 screen 2"
            width={2000}
            height={1125}
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

        {/* SCENARIO 3 */}

        <figure className="image-block">
          <Image
            src="/img/daydream/scenario3-quantified/01.png"
            className="full-image"
            alt="Daydreams & Doomscrolling scenario 2 screen 1"
            width={8640}
            height={4860}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
        </figure>

        <figure className="image-block">
          <Image
            src="/img/daydream/scenario3-quantified/02.1.png"
            className="full-image"
            alt="Daydreams & Doomscrolling scenario 2 screen 1"
            width={8640}
            height={4860}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
        </figure>

        <figure className="image-block">
          <Image
            src="/img/daydream/scenario3-quantified/3-03.png"
            className="full-image"
            alt="Daydreams & Doomscrolling scenario 2 screen 1"
            width={8640}
            height={4860}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
        </figure>

        <figure className="image-block">
          <Image
            src="/img/daydream/scenario3-quantified/04.png"
            className="full-image"
            alt="Daydreams & Doomscrolling scenario 2 screen 1"
            width={8640}
            height={4860}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
        </figure>

        <figure className="image-block">
          <Image
            src="/img/daydream/scenario3-quantified/05-w.png"
            className="full-image"
            alt="Daydreams & Doomscrolling scenario 2 screen 1"
            width={8640}
            height={4860}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
        </figure>

        <figure className="image-block">
          <Image
            src="/img/daydream/scenario3-quantified/06-s.png"
            className="full-image"
            alt="Daydreams & Doomscrolling scenario 2 screen 1"
            width={8640}
            height={4860}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
        </figure>

      </section>


      <section className="case-section">
        <div className="prose">
          <p className="body-l">
            Curious about the full process?{" "}
            <a
              href="https://drive.google.com/file/d/1Tit96AjQl0OMm7Z1-i0DKRFWtrK9zpHK/view?usp=sharing"
              className="underline-link external-link"
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