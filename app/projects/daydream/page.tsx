import Image from 'next/image'
import One from "../../../public/img/daydream/scenario1/01.png";
import Two from "../../../public/img/daydream/scenario1/02.png";

export default function daydream() {
  return <div className="content">
    {/* <h1 className="heading-lg">Daydreams & Dommscroll</h1> */}
    <p className="label">Master thesis at aho</p>
    <h1 className="heading-serif">Daydreams & Dommscroll</h1>

    <Image
      src="/img/daydream2.png"
      className='full-image'
      alt="Main image"
      width={8640}
      height={4860}
      sizes="(max-width: 900px) 100vw, 1000px"
    />

    <dl className="info">

      <div className="info-box">
        <dt className="label-s">Year</dt>
        <dd className="body-s">2026</dd>
      </div>

      <div className="info-box">
        <dt className="label-s">Role</dt>
        <dd className="body-s">UX Designer</dd>
      </div>

      <div className="info-box">
        <dt className="label-s">Skills</dt>
        <dd className="body-s">Figma, Indesign, Research</dd>
      </div>

      <div className="info-box">
        <dt className="label-s">Client</dt>
        <dd className="body-s">Oslo School of Architecture and Design</dd>
      </div>

    </dl>

    <div className='project-blocks'>
      <div className='prose'>
        <p className='body-xl'>Digital introspection is an interaction design project looking at new ways of contextualizing screen usage, disconnecting, and preserve introspective mind-states.</p></div>


    <Image
      src={One}
      className="full-image"
      alt="Scenario 1 – My screen-time doesn't understand me"
      sizes="(max-width: 900px) 100vw, 1000px"
      />
      <div className='prose prose--narrow'>
        <p className='body-xl'>The project consists of three scenarios, each exploring a theme relating to digital wellbeing.</p></div>
    <Image
      src={Two}
      className="full-image"
      alt="Scenario 1 – My screen-time doesn't understand me"
      sizes="(max-width: 900px) 100vw, 1000px"
      />

      </div>
  </div>
}