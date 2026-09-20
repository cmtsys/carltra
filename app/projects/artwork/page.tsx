import Image from 'next/image'
import ProjectHero from '@/app/components/ProjectHero'
import MetaData from '@/app/components/MetaData'
import NextProject from '@/app/components/NextProject'

import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Artwork production for the government quarter | Carl Traberg",
  description: "Bridging art and engineering",
};

export default function artwork() {
  return <div className="content">

    <ProjectHero
      label="Bridging art and engineering"
      title="Artwork production for Damla Kilickiran"
      imageSrc="/img/artwork/00.jpeg"
      imageAlt="3D"
      imageWidth={8640}
      imageHeight={4860}
    />

    <MetaData
      year="2023—25"
      role="3D Design & production development"
      skills="Blender, Keyshot, Autodesk Fusion"
      client="Damla Kilickiran"
    />

    <div className="project-blocks">
      <div className="prose">
        <p className="body-xl">
          <i>Sites of a Breach, Delays in a Dream; A Surface Half Asleep</i> is an artwork Damla Kilickiran, for the new government quarter in Oslo.
        </p>
      </div>

      <figure className="image-block">
        <Image
          src="/img/artwork/vinterclose.jpg"
          // src="/img/artwork/vinterclose.jpg"
          className="full-image"
          alt="Fra montering i vinter"
          width={900}
          height={1200}
          sizes="(max-width: 900px) 100vw, 1000px"
        />
        <figcaption className="caption">
          Fra monteringen av verket vinteren 2025. Foto: Trond Isaksen, KORO
        </figcaption>
      </figure>

      <div className="prose">
        <p className="body-l">
          The artwork consists of ten sculptural concrete panels integrated into the facade of the A-block building. I worked with Damla to translate her 2D collages into production-ready 3D files, working across design and fabrication.</p>

        {/* <p className="body-l">
          The project involved coordinating with Statsbygg, KORO, Team Urbis, HENT and the manufacturing team throughout the production process. 
          </p> */}

        <p className="body-l">
          The project was developed from 2023—2024, with the panels installed in 2025. The artwork will gradually be unveiled as the new Government Quarter is completed. </p>

        <p>
          Read more about the project on {" "}
          <a className='underline-link external-link'
            href="https://koro.no/prosjekter/sites-of-a-breach-delays-in-a-dream-a-surface-half-asleep-arbeidstittel-a-blokk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            koro.no <ExternalLink size={16} aria-hidden="true" />
          </a> and{" "}
          <a className='underline-link external-link'
            href="https://nordicarch.com/reads/stories/damla-kilickirans-art-for-the-new-government-quarter"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nordic Office of Architecture <ExternalLink size={16} aria-hidden="true" />
          </a>.
        </p>
      </div>

      <section className='case-section'>

        <figure className="image-block">
          <Image
            src="/img/artwork/04.jpg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <figcaption className="caption">Original compositions provided by Damla Kilickiran</figcaption>
        </figure>

        <div className="prose">
          <p className="body-l">Damla developed the compositions from a photographic archive of urban spaces, traces and disappearing structures, transforming them into abstract 2D collages. </p>
        </div>

        <figure className="image-block">
          <Image
            src="/img/artwork/03.png"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <figcaption className="caption">Reworking the collages in Blender</figcaption>
        </figure>

        <div className="prose">
          <p className="body-l">The main challenge was to give the images physical depth while keeping the character of Damla's original compositions within the constraints of large-scale fabrication.
           </p>
          <p className="body-l"> Working with the milling team in Sweden, I tested tool diameters to balance detail and production time. Smaller tool diameters was more truthful to the source material, but increased milling time exponentially, while larger were faster but diluted the character of the forms.</p>
             </div>

       <figure className="image-block">
          <Image
            src="/img/artwork/milling-sim.png"
            className="full-image"
            alt="Image of simulated milled surface"
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <figcaption className="caption">Simulation of milling diameters</figcaption>
        </figure>

<div className='prose'>
          <p className="body-l"> Working across Blender and Fusion, I developed the final surfaces around this balance and prepared the files used to mill the negative moulds for casting the concrete panels. </p></div>
     

        <figure className="image-block">
          <Image
            src="/img/artwork/01.jpg"
            className="full-image"
            alt="Hidden sidepanels"
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <figcaption className="caption">Finalized plate design render</figcaption>
        </figure>


        <figure className="image-block">
          <Image
            src="/img/artwork/negative.png"
            className="full-image"
            alt="Hidden sidepanels"
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <figcaption className="caption">Negative mould for production</figcaption>
        </figure>
        <figure className="split-figure">
          <div className="split">
            <Image
              src="/img/artwork/3.jpg"
              className="split-image"
              alt="Concrete relief installed on the A-block facade"
              width={1536}
              height={2048}
              sizes="(max-width: 600px) 100vw, 50vw"
            />
            <Image
              src="/img/artwork/4.jpg"
              className="split-image"
              alt="Close-up of the finished concrete relief"
              width={1536}
              height={2048}
              sizes="(max-width: 600px) 100vw, 50vw"
            />

          </div>
          <figcaption className="caption">
            Rendering of plate 3 and 4.
          </figcaption>
        </figure>


        <figure className="image-block">
          <Image
            src="/img/artwork/NiklasHart-KORO.jpg"
            className="full-image"
            alt="Close-up of plate 3 and 4"
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <figcaption className="caption">
          Foto: Niklas Hart, KORO
          </figcaption>
        </figure>
        <figure className="image-block">
          <Image
            src="/img/artwork/NiklasHart-KORO2.jpg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <figcaption className="caption">Foto: Niklas Hart, KORO
          </figcaption>
        </figure>

        <figure className="image-block">
          <Image
            src="/img/artwork/vinter.jpg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <figcaption className="caption">Foto: Trond Isaksen, KORO
          </figcaption>
        </figure>


      </section>
    </div>



    <NextProject />
  </div>
}