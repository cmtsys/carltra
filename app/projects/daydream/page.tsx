import Image from 'next/image'

export default function daydream() {
  return <div className="content">
    {/* <h1 className="heading-lg">Daydreams & Dommscroll</h1> */}
    <p className="label">Master thesis at aho</p>
    <h1 className="heading-serif">Daydreams & Dommscroll</h1>

    <Image
      src="/img/daydream2.png"
      className='title-image'
      alt="Main image"
      width={8640}
      height={4860}
      sizes="(max-width: 900px) 100vw, 1000px"
    />

    <div className="info">

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

    </div>

    <div className='project-blocks'>
      <div className='prose'>
        <p className='body-xl'>Digital introspection is an interaction design project looking at new ways of contextualizing screen usage, disconnecting, and preserve introspective mind-states.</p></div>

      <div className='prose--narrow'>
        <p className='body-l'>The project consists of three scenarios, each exploring a theme relating to digital wellbeing, displaying a breadth of possibilities and new opportunities for how we define our relationship to our devices.</p></div>

    </div></div>
}