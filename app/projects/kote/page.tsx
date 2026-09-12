// import { project } from "@/lib/projects";
import Image from 'next/image'
import NextProject from '@/app/components/NextProject';
import MetaData from '@/app/components/MetaData';
import ProjectHero from '@/app/components/ProjectHero';
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Art Direction for Kote | Carl Traberg",
  description: "Editorial design",
};

export default function kote() {
  return <div className="content">

    <ProjectHero
      label="Editorial design"
      title="Art Direction for Kote"
      imageSrc="/img/kote/kote_14.jpg"
      imageAlt="Kote No 14"
      imageWidth={8640}
      imageHeight={4860}
    />

    <MetaData
      year="2020—21"
      role="Art Director & editorial design"
      skills="InDesign & print"
      client="+Kote"
    />

    <div className='project-blocks'>
      <div className='prose'>
        <p className='body-xl'>
          +KOTE is an independent student-led publication exploring our physical surroundings through architecture, urbanism, landscape and design.
        </p></div>


      <div className='prose'>
        <p className='body-l'>
          As Art Director, I developed the visual identity and art direction for three issues, translating each theme into a visual language.
        </p></div>

      {/* KOTE NO 12 */}
      <section className="case-section">
        <div className='prose'>
          <p className="body-l">
            Kote No 12 — <i>Inkludering / Ekskludering</i>, explored inclusion and exclusion in urban settings. I created a simple, flexible typography system as the baseline for future editions.
          </p>
          <p className='body-s'>
            <a className='underline-link'
              href="https://fontsinuse.com/uses/56216/kote-no-12-inkludering-ekskludering"
              target="_blank"
              rel="noopener noreferrer"
            >
              Featured on Fonts In Use <ExternalLink size={8} />
            </a>
          </p>

          </div>

          <Image
            src="/img/kote/kote12/kote12-0.jpeg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
            <Image
              src="/img/kote/kote12/kote12-01.jpeg"
              className="full-image"
              alt=""
              width={900}
              height={1200}
              sizes="(max-width: 900px) 100vw, 1000px"
            />
          <Image
            src="/img/kote/kote12/kote12-02.jpeg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <Image
            src="/img/kote/kote12/kote12-03.jpeg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <Image
            src="/img/kote/kote12/kote12-04.jpeg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <Image
            src="/img/kote/kote12/kote12-05.jpeg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <Image
            src="/img/kote/kote12/kote12-06.jpeg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
      

      </section>
      {/* KOTE NO 13 */}
      <section className="case-section">
        <div className='prose'>
          <p className="body-l">
            The 13th issue, <i>Tomrom</i>, dwells on topics such as death, identity, drug abuse and alienation.
            The expression was built around dark, gritty surfaces, gloomy photography and sharp grotesque typography, with words appearing through negative space.
          </p>
          <p className='body-s'>
            <a className='underline-link'
              href="https://fontsinuse.com/uses/43918/kote-no-13-tomrom"
              target="_blank"
              rel="noopener noreferrer"
            >
              Featured on Fonts In Use <ExternalLink size={8} />
            </a>
          </p>
          </div>

          <Image
            src="/img/kote/kote13/kote13-0.jpeg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <Image
            src="/img/kote/kote13/kote13-00.jpeg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <Image
            src="/img/kote/kote13/kote13-01.jpeg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <Image
            src="/img/kote/kote13/kote13-02.jpeg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <Image
            src="/img/kote/kote13/kote13-03.jpeg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <Image
            src="/img/kote/kote13/kote13-04.jpeg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <Image
            src="/img/kote/kote13/kote13-05.jpeg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <Image
            src="/img/kote/kote13/kote13-06.jpeg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <Image
            src="/img/kote/kote13/kote13-07.jpeg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <Image
            src="/img/kote/kote13/kote13-08.jpeg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
          <Image
            src="/img/kote/kote13/kote13-09.jpeg"
            className="full-image"
            alt=""
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 1000px"
          />
      </section>

      {/* KOTE NO 14 */}
      <section className="case-section">
        <div className='prose'>
          <p className="body-l">
            Kote No 14 — <i>Allemannsgreie</i> explored the role of objects in public space. The visual identity became more playful, using squiggly typography and red as a reference to the egalitarian character of Norwegian society.
          </p>
          <p className='body-l'>
            The cover was wrapped in red foil, turning the publication itself into an object.
          </p>
          <p className='body-s'>
            <a className='underline-link'
              href="https://fontsinuse.com/uses/56217/kote-no-14-allemannsgreie"
              target="_blank"
              rel="noopener noreferrer"
            >
              Featured on Fonts In Use <ExternalLink size={8} />
            </a>
          </p>

        </div>

        <Image
          src="/img/kote/kote14/kote14-0.jpg"
          className="full-image"
          alt=""
          width={900}
          height={1200}
          sizes="(max-width: 900px) 100vw, 1000px"
        />

        <Image
          src="/img/kote/kote14/kote14-01.jpg"
          className="full-image"
          alt=""
          width={900}
          height={1200}
          sizes="(max-width: 900px) 100vw, 1000px"
        />
        <Image
          src="/img/kote/kote14/kote14-02.jpg"
          className="full-image"
          alt=""
          width={900}
          height={1200}
          sizes="(max-width: 900px) 100vw, 1000px"
        />
        <Image
          src="/img/kote/kote14/kote14-03.jpg"
          className="full-image"
          alt=""
          width={900}
          height={1200}
          sizes="(max-width: 900px) 100vw, 1000px"
        />
        <Image
          src="/img/kote/kote14/kote14-04.jpg"
          className="full-image"
          alt=""
          width={900}
          height={1200}
          sizes="(max-width: 900px) 100vw, 1000px"
        />
        <Image
          src="/img/kote/kote14/kote14-05.jpg"
          className="full-image"
          alt=""
          width={900}
          height={1200}
          sizes="(max-width: 900px) 100vw, 1000px"
        />
        <Image
          src="/img/kote/kote14/kote14-06.jpg"
          className="full-image"
          alt=""
          width={900}
          height={1200}
          sizes="(max-width: 900px) 100vw, 1000px"
        />
        <Image
          src="/img/kote/kote14/kote14-07.jpg"
          className="full-image"
          alt=""
          width={900}
          height={1200}
          sizes="(max-width: 900px) 100vw, 1000px"
        />
        <Image
          src="/img/kote/kote14/kote14-08.jpg"
          className="full-image"
          alt=""
          width={900}
          height={1200}
          sizes="(max-width: 900px) 100vw, 1000px"
        />
      </section>
    </div>

    <NextProject />
  </div>
}