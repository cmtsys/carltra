// This is the new index.html
import Typewriter from "./components/Typewriter";
import MainProjects from "./components/MainProjects";
import AboutMe from "./components/AboutMe"

export default function Page() {
  return <>
    {/* <Typewriter></Typewriter> */}
    {/* <div style={{ padding: "var(--space-xxl) 0" }}> <AboutMe /> </div> */}
    <section className="about-page"><AboutMe /></section>
    <MainProjects />
  </>

}