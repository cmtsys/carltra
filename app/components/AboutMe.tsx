export default function AboutMe() {

const tooltips = [
  "Text here",
  "Another text here",
  "A third text here",
  "A fourth text here",
];

    return (
        <section className="about-card">


        <div className="tooltip-wrapper">
              <span className="tooltip">
                I look something like this
            </span>
            <img className="about-portrait" src="/img/cm.png" alt="I look something like this" />
                </div>


            <section className="about-copy">
                <div className="about-intro">
                    <h1 className="heading-serif">Hi there!</h1>
                    <p className="body-l body-l--narrow">
                        My name is Carl, I am a product & interaction designer who does graphics and a touch of coding.
                        <br /><br />
                        I built this thing myself, have a look{" "}
                        <a className="weblink" href="https://github.com/cmtsys/carltra" target="_blank">here</a>{" "}
                        if you want to see.
                    </p>
                </div>
                {/* <p className="about-note">
                    *okay, a lot of copy & pasting, but no vibe code. I know how everything is connected. 
                </p> */}
            </section>
        </section>
    )
}