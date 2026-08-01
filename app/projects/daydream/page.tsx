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
    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />

      <div className="info">

        <div className="info-box">
          <dt className="label-s">Year</dt>
          <dd className="body-s">2026</dd>
        </div>

        <div className="info-box">
          <p className="info-title info-text">Role</p>
          <p className="info-text">UX Designer</p>
        </div>

        <div className="info-box">
          <p className="info-title info-text">Skills</p>
          <p className="info-text">Figma, Indesign, Research</p>
        </div>

        <div className="info-box">
          <p className="info-title info-text">Client</p>
          <p className="info-text">Oslo School of Architecture and Design</p>
        </div>

      </div>

    <div className="prose">


    </div>

  </div>
}