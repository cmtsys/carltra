import Image from 'next/image'
import NextProject from '../../components/NextProject';
import MetaData from '../../components/MetaData';

export default function remarkable() {
  return <div className="content">

    <p className="label">Time as paradigm</p>
    <h1 className="heading-serif">reMarkable Stacks</h1>
    <img
      className='full-image'
      src="/img/remarkable/0_main.JPG"
      alt="reMarkable main image"
    />

    <MetaData
      year="2024"
      role="Student project"
      skills="Figma, wireframing, user research"
      client="Oslo School of Architecture and Design"
    />

    <div className='project-blocks'>

      <div className='prose'>

        <p className='body-xl'><i>Stacks</i> is a exploratory concept for the information architecture of the reMarkable 2 device, focused on making content and files more transparent and visible.
        </p></div>


      <div className='prose'>
        <p className='body-m'>
          The project was nominated for the AHO WORKS AWARDS in the category Interaction Design.</p></div>


    </div>

    <NextProject currentSlug="remarkable" />

  </div>
}