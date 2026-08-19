import Image from 'next/image'
import ProjectHero from '@/app/components/ProjectHero'
import MetaData from '@/app/components/MetaData'
import NextProject from '@/app/components/NextProject'

export const metadata = {
  title: "Huddly Room Control App | Carl Traberg",
  description: "UX and interaction design for Huddly's Teams-native room control app.",
};

export default function Huddly() {
  return <div className="content">

    <ProjectHero
      label="In-room experience"
      title="Teams-native touch panel app"
      imageSrc="/img/huddly/huddly.png"
      imageAlt="Huddly Touch Panel App"
      imageWidth={2104}
      imageHeight={1600}
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
          The Huddly Room Control App lets users control their Huddly cameras during meetings on Microsoft Teams devices.
        </p>
      </div>

      <div className="prose">
        <p className="body-l">
          I led the UX work on the project, from research through implementation alongside a visual designer and a team of developers.
          </p>
      <p className="body-l">
          A key part of my role was aligning design, product management and engineering teams around user needs, product requirements and technical constraints.
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

      <div className="prose">
        <p className="body-l">
          The challenge was to make camera controls easy to understand and quick to use during a meeting, without interrupting the conversation.
        </p>
      </div>

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
          The app shipped in 2025.
        </p>
      </div>

      <div className="prose">
        <p className="body-m">
          <i>Some parts of the design process are omitted due to confidentiality.</i>
        </p>
      </div>

    </div>

    <NextProject />

  </div>
}