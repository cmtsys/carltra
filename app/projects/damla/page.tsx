import Image from 'next/image'
import ProjectHero from '@/app/components/ProjectHero'
import MetaData from '@/app/components/MetaData'
import NextProject from '@/app/components/NextProject'

import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Artworkproduction for the government quarter | Carl Traberg",
  description: "Short specific description.",
};

export default function damla() {
  return <div className="content">

    <ProjectHero
      label="Bridging art and engineering"
      title="Artworkproduction for Damla Kilickiran"
      imageSrc="/img/damla/montering-vinter-25.jpg"
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
         <i>Sites of a Breach, Delays in a Dream</i> is an artwork by artist Damla Killickiran, for the new government quarter in Oslo.
        </p>
      </div>

      <div className="prose">
        <p className="body-l">
         The artwork consists of 10 sculptural concrete panels integrated into the facade of the A-block building. <br /><br />

          My role was to translate 2D collages provided by the artist into 3D forms for production. Ialso coordinating the design and production process between Damla Kilickiran, Statsbygg, KORO, Team Urbis, Hent, and the manufacturing team.
          <br /><br />
          The project was developed from 2023—2024, with the panels installed in 2025. The artwork will gradually be unveiled as the new Government Quarter is completed.
          <br /><br />
          <a className='underline-link'
            href="https://koro.no/prosjekter/sites-of-a-breach-delays-in-a-dream-a-surface-half-asleep-arbeidstittel-a-blokk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more about the project here <ExternalLink size={16} />
          </a>
        </p>
      </div>

      <Image
        src="/img/project-folder/image-01.png"
        className="full-image"
        alt="Describe image 1"
        width={1600}
        height={1000}
        sizes="(max-width: 900px) 100vw, 1000px"
      />

      <Image
        src="/img/project-folder/image-02.png"
        className="full-image"
        alt="Describe image 2"
        width={1600}
        height={1000}
        sizes="(max-width: 900px) 100vw, 1000px"
      />

    </div>



    <NextProject />
  </div>
}