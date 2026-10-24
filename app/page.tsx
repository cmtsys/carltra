// import Typewriter from "./components/Typewriter";
import MainProjects from "./components/MainProjects";
import AboutMe from "./components/AboutMe"

export default function Page() {
  return <>
    {/* <Typewriter></Typewriter> */}
    <section className="about-section"><AboutMe /></section>
    <MainProjects />
    
  </>

}