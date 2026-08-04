import Image from 'next/image'
import NextProject from '@/app/components/NextProject';

export const metadata = {
  title: "Project Name | Carl Traberg",
  description: "Short specific description.",
};

export default function kote() {
  return <div className="content">


    <NextProject />
  </div>
}