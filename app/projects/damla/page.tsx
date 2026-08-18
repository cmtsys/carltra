import Image from 'next/image'
import ProjectHero from '@/app/components/ProjectHero'
import MetaData from '@/app/components/MetaData'
import NextProject from '@/app/components/NextProject'

export const metadata = {
  title: "Artworkproduction for the government quarter | Carl Traberg",
  description: "Short specific description.",
};

export default function damla() {
  return <div className="content">

    <ProjectHero
      label="Bridging art and engineering"
      title="Artworkproduction for Damla Kilickiran"
      imageSrc="/img/huddly/huddly.png"
      imageAlt="3D"
      imageWidth={8640}
      imageHeight={4860}
    />

    <MetaData
      year="2023—25"
      role="Designer"
      skills="Blender, Keyshot, Autodesk Fusion"
      client="Damla Kilickiran"
    />

    <div className="project-blocks">
      <div className="prose">
        <p className="body-xl">
          Sites of a Breach, Delays in a Dream; A Surface Half Asleep is an artwork by artist Damla Killickiran, for the new government quarter in Oslo.
        </p>
      </div>


      <div className="prose">
        <p className="body-l">
          It consists of 10 figurative concrete plates, placed alongside the facade of the A-block building. <br /><br />
          My role was to translate 2D collages provided by the artist into 3D shapes for production as well as coordinating with Statsbygg, KORO, Team Urbis, Hent, and the manufacturing team for the realization of the project.
          <br /><br />
          The project is in the final stage of production and set to gradually be unveiled in 2025 and 2029.
          <br /><br />
          <a className='underline-link'
            href="https://koro.no/prosjekter/sites-of-a-breach-delays-in-a-dream-a-surface-half-asleep-arbeidstittel-a-blokk/"
            target="_blank"
            rel="noopener noreferrer"
          >

            Read more about the project here.

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

      <div className="prose">
        <p className="body-l">
          Closing text. Mention result, learning, nomination, launch, or what
          makes the project relevant.
        </p>
      </div>
    </div>



    <NextProject />
  </div>
}