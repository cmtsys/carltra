import Image from 'next/image'
import ProjectHero from '@/app/components/ProjectHero'
import MetaData from '@/app/components/MetaData'
import NextProject from '@/app/components/NextProject'

export default function damla() {
  return <div className="content">

    <ProjectHero
      label="In-room experience"
      title="Artworkproduction for the government quarter"
      imageSrc="/img/huddly/huddly.png"
      imageAlt="3D"
      imageWidth={8640}
      imageHeight={4860}
    />

    <MetaData
      year="2025"
      role="UX Lead"
      skills="Research, UX, UI, Prototyping"
      client="Huddly"
    />
    
    <NextProject />
  </div>
}