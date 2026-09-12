import Image from 'next/image'
import ProjectHero from '@/app/components/ProjectHero'
import MetaData from '@/app/components/MetaData'
import NextProject from '@/app/components/NextProject'

import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Artworkproduction for the government quarter | Carl Traberg",
  description: "Short specific description.",
};

export default function artwork() {
  return <div className="content">

    <ProjectHero
      label="Bridging art and engineering"
      title="Artworkproduction for Damla Kilickiran"
      imageSrc="/img/artwork/vinter.jpg"
      imageAlt="3D"
      imageWidth={8640}
      imageHeight={4860}
    />

    <MetaData
      year="2023—25"
      role="3D Design & production"
      skills="Blender, Keyshot, Autodesk Fusion"
      client="Damla Kilickiran"
    />

    <div className="project-blocks">
      <div className="prose">
        <p className="body-xl">
          <i>Sites of a Breach, Delays in a Dream; A Surface Half Asleep</i> is an artwork by artist Damla Killickiran, for the new government quarter in Oslo.
        </p>
      </div>

      <figure className="image-block">
        <Image
          src="/img/artwork/vinterclose.jpg"
          className="full-image"
          alt="Fra montering i vinter"
          width={900}
          height={1200}
          sizes="(max-width: 900px) 100vw, 1000px"
        />
        <figcaption className="caption">
          Fra monteringen av verket vinteren 2025. Foto: Trond Isaksen, Koro
</figcaption>
      </figure>

      <div className="prose">
        <p className="body-l">
          The artwork consists of 10 sculptural concrete panels integrated into the facade of the A-block building.  </p>

        <p className="body-l">
          I worked with Damla to translate her 2D collages into 3D files files ready for production, working across design and fabrication. The project involved coordinating with Statsbygg, KORO, Team Urbis, HENT and the manufacturing team throughout the production process. </p>

        <p className="body-l">
          The project was developed from 2023—2024, with the panels installed in 2025. The artwork will gradually be unveiled as the new Government Quarter is completed. </p>

        <p>
          Read more about the project on   <a className='underline-link'
            href="https://koro.no/prosjekter/sites-of-a-breach-delays-in-a-dream-a-surface-half-asleep-arbeidstittel-a-blokk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Koro.no
          </a>, or see the feature on
          <a className='underline-link'
            href="https://nordicarch.com/reads/stories/damla-kilickirans-art-for-the-new-government-quarter"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nordic Office of Architecture
          </a>.
        </p>
      </div>

<section className='case-section'>
        <figure className="image-block">
        <Image
          src="/img/artwork/01.jpg"
          className="full-image"
          alt="Hidden sidepanels"
          width={900}
          height={1200}
          sizes="(max-width: 900px) 100vw, 1000px"
        />
        <figcaption className="caption">Rendering of plate 5</figcaption>
        </figure>

        <figure className="image-block">
        <Image
          src="/img/artwork/03.png"
          className="full-image"
          alt=""
          width={900}
          height={1200}
          sizes="(max-width: 900px) 100vw, 1000px"
        />
        <figcaption className="caption"> </figcaption>
      </figure>
        <figure className="image-block">
        <Image
          src="/img/artwork/04.jpg"
          className="full-image"
          alt=""
          width={900}
          height={1200}
          sizes="(max-width: 900px) 100vw, 1000px"
        />
        <figcaption className="caption">Original drawings provided by Damla Kilickiran</figcaption>
      </figure>
</section>
    </div>



    <NextProject />
  </div>
}