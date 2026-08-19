import Image from 'next/image'
import NextProject from '../../components/NextProject';
import MetaData from '../../components/MetaData';
import quickfix from "@/public/img/remarkabkle/quickfix.gif"

export const metadata = {
  title: "reMarkable Stacks | Carl Traberg",
  description: "Time as organization paradigm.",
};

export default function Remarkable() {
  return <div className="content">

    <p className="label">Time as paradigm</p>
    <h1 className="heading-serif">reMarkable Stacks</h1>
    <img
      className='full-image'
      src="/img/remarkable/0_main.JPG"
      alt="reMarkable main image"
    />

    <MetaData
      year="2023"
      role="UX / Interaction designer"
      skills="Figma, user testing, wireframing"
      client="Oslo School of Architecture and Design"
    />

    <div className='project-blocks'>

      <div className='prose'>

        <p className='body-xl'><i>Stacks</i> is an exploratory concept for the UX of the reMarkable 2 device, exploring a more visual and transparent approach to navigating files.
        </p></div>

      <div className='prose'>

        <p className='body-l'>
          The existing UI had a traditional folder structure. This suits some, but it requires users to enter files and folders in order to see what is inside them. Users do not always remember where they wrote their last note.
        </p></div>

              <Image
        src="/img/remarkable/rigid.png"
        className="small-image"
        alt="rigid papers gif"
        width={1600}
        height={1000}
        sizes="(max-width: 900px) 100vw, 1000px"
      />

      <div className="prose">

        <p className="body-l">
          The task from reMarkable was to explore <i>time</i> as an organizational paradigm for the UI.
        </p>
      </div>

      <div className="split">
  <p className="body-l">
    I interpreted time as chronology. Leading me to the idea of a stack of paper: older drawings at the bottom, newer on top.
  </p>

    <Image
        src="/img/remarkable/stacking.gif"
        className="split-image"
        alt="Stacking papers gif"
        width={1600}
        height={1000}
        sizes="(max-width: 900px) 100vw, 1000px"
      />
</div>


      {/* Core concept */}

      {/* Supporting features */}

      {/* Secondary features */}

      {/* Quick fix*/}
           <div className="prose">
        <p className="body-m">QUICK FIX</p>

        <p className="body-l">
          Many users complained about having to enter a file in order to view its content.
        </p>

        <p className="body-l ">
          As a quick fix for reMarkable, I prototyped a swiping gesture to preview the content of files.
        </p>
      </div>
      <Image
        src="/img/remarkable/quickfix.gif"
        className="full-image"
        alt="Swiping gesture to preview files"
        width={1600}
        height={1000}
        sizes="(max-width: 900px) 100vw, 1000px"
      />

      {/* Award*/}
      <div className='prose'>
        <p className='body-l'>
          The project was nominated for the AHO WORKS AWARDS in the category Interaction Design.</p></div>

      <div className='prose'>
        <p className='body-l'>
          As an alternative to folders, Stacks has a tagging system making it possible to categorise a file into more than one category.

          It also enable users to work in a “space” rather than a folder.</p></div>

      <Image
        src="/img/remarkable/image-02.png"
        className="full-image"
        alt="reMarkable Stacks tagging system"
        width={1600}
        height={1000}
        sizes="(max-width: 900px) 100vw, 1000px"
      />

      <div className="prose">
        <p className="body-l">
          The re-design makes it possible to preview the content of a file before entering it, avoiding the problem of menu diving.
        </p>
      </div>

      <Image
        src="/img/remarkable/image-03.png"
        className="full-image"
        alt="Previewing file content in reMarkable Stacks"
        width={1600}
        height={1000}
        sizes="(max-width: 900px) 100vw, 1000px"
      />



      <Image
        src="/img/remarkable/image-04.png"
        className="full-image"
        alt="Existing reMarkable folder interface"
        width={1600}
        height={1000}
        sizes="(max-width: 900px) 100vw, 1000px"
      />

      <Image
        src="/img/remarkable/image-05.png"
        className="full-image"
        alt="Stack of paper interaction concept"
        width={1600}
        height={1000}
        sizes="(max-width: 900px) 100vw, 1000px"
      />

      <div className="prose">
        <p className="body-m">Visible sidepanels</p>
      </div>

      <Image
        src="/img/remarkable/image-06.png"
        className="full-image"
        alt="Visible sidepanels"
        width={1600}
        height={1000}
        sizes="(max-width: 900px) 100vw, 1000px"
      />

      <div className="prose">
        <p className="body-m">Hidden sidepanels</p>
      </div>

      <Image
        src="/img/remarkable/image-07.png"
        className="full-image"
        alt="Hidden sidepanels"
        width={1600}
        height={1000}
        sizes="(max-width: 900px) 100vw, 1000px"
      />


    </div>

    <NextProject />

  </div>
}