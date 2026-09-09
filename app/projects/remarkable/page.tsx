import Image from 'next/image'
import NextProject from '../../components/NextProject';
import MetaData from '../../components/MetaData';
import ProjectHero from '@/app/components/ProjectHero';

export const metadata = {
  title: "reMarkable Stacks | Carl Traberg",
  description: "Time as organization paradigm.",
};

export default function Remarkable() {
  return <div className="content">

    <ProjectHero
      label="Time as paradigm"
      title="reMarkable Stacks"
      imageSrc="/img/remarkable/0_main.JPG"
      imageAlt="reMarkable main image"
      imageWidth={2104}
      imageHeight={1600}
    />

    <MetaData
      year="2023"
      role="UX / Interaction designer"
      skills="Figma, user testing, wireframing"
      client="Oslo School of Architecture and Design"
    />

    <div className='project-blocks'>

      <section className='case-section'>
        <p className='body-xl'><i>Stacks</i> is an exploratory concept for the UX of the reMarkable 2 device, exploring a more visual and transparent approach to navigating files.
        </p></section>

      <section className='case-section'>
        <div className="prose">
          <p className="body-m">THE PROBLEM</p>
          <p className='body-l'>
            The existing UI had a traditional folder structure. This suits some, but it requires users to enter files and folders in order to see what is inside them. Users do not always remember where they wrote their last note.
          </p></div>

        <figure className="image-block image-block--small">
          <Image
            src="/img/remarkable/rigid.png"
            className="full-image"
            alt="The existing reMarkable folder interface"
            width={1600}
            height={1000}
            sizes="(max-width: 900px) 100vw, 640px"
          />
          <figcaption className="caption">A rigid interface</figcaption>
        </figure>
      </section>

      {/* Quick fix*/}

<section className='case-section'>
      <div className="prose">
        <p className="body-m">QUICK FIX</p>

        <p className="body-l">
          Many users complained about having to enter a file in order to view its content. As a quick fix for reMarkable, I prototyped a swiping gesture to preview the content of files.
        </p>
      </div>

       <figure className='image-block'>
        <Image
          src="/img/remarkable/quickfix.gif"
          className="full-image"
          alt="Swiping gesture to preview files"
          width={1600}
          height={1000}
          sizes="(max-width: 900px) 100vw, 1000px"
        />
        <figcaption className='caption'>Swipe to preview</figcaption>
        </figure>
      </section>


<section className='case-section'>
      <div className="split">

        <div className='prose'>
          <p className="body-m">EXPLORING TIME</p>
          <p className="body-l">
            The task from reMarkable was to explore <i>time</i> as an organisational paradigm for the UI.
          </p>
          <p className="body-l">
            I interpreted time as chronology, which lead me to the idea of a stack of paper: older drawings at the bottom, newer on top.
          </p>
        </div>


    <figure className="image-block image-block--small">
        <Image
          src="/img/remarkable/stacking.gif"
          className="split-image"
          alt="Stacking papers gif"
          width={1600}
          height={1000}
          sizes="(max-width: 900px) 100vw, 1000px"
        />
          <figcaption className="caption">Old → New</figcaption>
        </figure>
      </div>
      </section>

      {/* Core concept */}

    <section className='case-section'>
      <div className="split">
        <div className='prose'>
          {/* <p className="body-m">PREVIEWING CONTENT</p> */}
        <p className="body-l">
          The re-design makes it possible to preview the content of a file before entering it, avoiding the problem of menu diving.
        </p>
        </div>

        <figure className='image-block'>
        <Image
          src="/img/remarkable/preview-content.gif"
          className="full-image"
          alt="Previewing file content in reMarkable Stacks"
          width={1600}
          height={1000}
          sizes="(max-width: 900px) 100vw, 1000px"
        />
        <figcaption></figcaption>
        </figure>
      </div>
      </section>

      {/* Supporting features */}
<section className='case-section'>
      <div className='split'>

        <div className='prose'>
          {/* <p className="body-m">STACKS</p> */}
          <p className='body-l'>
            As an alternative to folders, Stacks has a tagging system making it possible to categorise a file into more than one category.

            It also enable users to work in a “space” rather than a folder.
          </p>
        </div>

         <figure className="image-block image-block--small">

        <Image
          src="/img/remarkable/stacks.gif"
          className="full-image"
          alt="reMarkable Stacks tagging system"
          width={1600}
          height={1000}
          sizes="(max-width: 900px) 100vw, 1000px"
        />

          <figcaption className="caption"></figcaption>
        </figure>

      </div>
</section>


{/* SIDE PANELS HERE */}
<section className="case-section">
  <div className="split">
    <figure className="image-block">
      <Image
        src="/img/remarkable/visible-sidepanels.png"
        className="full-image"
        alt="Visible sidepanels"
        width={1600}
        height={1000}
        sizes="(max-width: 900px) 100vw, 1000px"
        style={{ border: "1px solid #e6e6e6" }}
      />
      <figcaption className="caption">Visible sidepanels</figcaption>
    </figure>

    <figure className="image-block">
      <Image
        src="/img/remarkable/hidden-sidepanels.jpg"
        className="full-image"
        alt="Hidden sidepanels"
        width={1600}
        height={1000}
        sizes="(max-width: 900px) 100vw, 1000px"
        style={{ border: "1px solid #e6e6e6" }}
      />
      <figcaption className="caption">Hidden sidepanels</figcaption>
    </figure>
  </div>
</section>

      {/* Secondary features */}

      {/* Award*/}

      <section className='case-section'>
      <div className='prose'>
        <p className='body-l'>
          The project was nominated for the AHO WORKS AWARDS in the category Interaction Design.</p></div>
          </section>

    </div>

    <NextProject />

  </div>
}