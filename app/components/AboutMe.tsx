export default function AboutMe() {
    return (
        <section className="about-card">

            <img className="about-portrait" src="img/cm.png" alt="I look something like this" />
    
            <section className="about-copy">
                <div className="about-intro">
                    <h1 className="heading-serif">Hi there!</h1>
                    <p className="body-l body-l--narrow">
                        My name is Carl, I do UX, interaction design, graphics, a touch of coding, and a lot more.
                        <br /><br />
                        I built this thing myself*, have a look{" "}
                        <a className="weblink" href="https://github.com/cmtsys/carltra" target="_blank">here</a>{" "}
                        if you want proof.
                    </p>
                </div>

                <p className="about-note">
                    *ok, I might have asked claude for help a few times, but no vibecode, I promise!
                </p>
            </section>
        </section>
    )
}