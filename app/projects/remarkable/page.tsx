import Image from 'next/image'
import NextProject from '../../components/NextProject';
import MetaData from '../../components/MetaData';

export const metadata = {
  title: "Project Name | Carl Traberg",
  description: "Short specific description.",
};

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
          The project was nominated for the AHO WORKS AWARDS in the category Interaction Design.</p></div>

      <div className='prose'>
        <p className='body-m body-l--title'>The problem</p>
        <p className='body-l'>
  
          The existing interface uses a traditional folder structure. While familiar, it requires users to enter folders and files to understand what they contain.</p></div>

      <div className='prose'>
        <p className='body-l'>
          The project was nominated for the AHO WORKS AWARDS in the category Interaction Design.</p></div>


    </div>

    <NextProject />

  </div>
}