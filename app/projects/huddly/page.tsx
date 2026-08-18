import Image from 'next/image'
import ProjectHero from '@/app/components/ProjectHero'
import MetaData from '@/app/components/MetaData'
import NextProject from '@/app/components/NextProject'

export const metadata = {
  title: "Project Name | Carl Traberg",
  description: "Short specific description.",
};

export default function huddly() {
  return <div className="content">

    <ProjectHero
      label="In-room experience"
      title="Teams-native touch panel app"
      imageSrc="/img/huddly/huddly.png"
      imageAlt="Daydreams & Doomscrolling hero image"
      imageWidth={8640}
      imageHeight={4860}
    />

    <MetaData
      year="2025"
      role="UX Lead"
      skills="Research, UX, UI, Prototyping"
      client="Huddly"
    />

    <div className="project-blocks">
      <div className="prose">
        <p className="body-xl">
          The Huddly Touch Panel app let users control their Huddly Crew cameras during meetings on Microsoft Teams devices. 
        </p>
      </div>

      <div className="prose">
        <p className="body-l">
          I was responsible for the interaction and UX of the app, working alongside a visual designer and a team of developers. 
        </p>
      </div>

      <div className="prose">
        <p className="body-l">
          The challenge was to make camera controls easy to understand and quick to use during a meeting, without interrupting the conversation. 
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

      {/* <div className="prose">
        <p className="body-l">
          The project gave me the opportunity to design across the boundaries of software, hardware, and the physical meeting room.
        </p>
      </div> */}
    </div>




  <NextProject />

  </div>
}