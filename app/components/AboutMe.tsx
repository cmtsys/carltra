export default function AboutMe() {
    return (
        <section className="about-card">

            <img className="about-portrait" src="img/cm.png" alt="I look something like this" />

            <section className="about-copy">
                <div className="about-intro">
                    <h1 className="heading-serif">Hi there!</h1>
                    <p className="body-l body-l--narrow">
                        My name is Carl, I am a product & interaction designer who does graphics and a touch of coding.
                        <br /><br />
                        I built this thing myself*, have a look{" "}
                        <a className="weblink" href="https://github.com/cmtsys/carltra" target="_blank">here</a>{" "}
                        if you want proof.
                    </p>
                </div>

                <p className="about-note">
                    *ok, a lot of copy & pasting, but no vibe coding!
                </p>
            </section>
        </section>
    )
}