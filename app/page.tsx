// This is the new index.html
import Header from "./components/Header";
import Typewriter from "./components/Typewriter";
import MainProjects from "./components/MainProjects";
import AboutMe from "./components/AboutMe"

export default function Page() {
  return <>
    {/* <Typewriter></Typewriter> */}
    <div style={{ padding: "var(--space-xxl) 0" }}> <AboutMe /> </div>
    <MainProjects />
  </>
  
}