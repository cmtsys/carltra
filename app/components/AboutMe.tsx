
// import Image from "next/image";

export default function AboutMe() {
    return (
        <section className="aboutme">
            <img className="cm2" src="img/cm.png" alt="I look something like this" />
            <section className="about-text">
                <h1 className="heading-serif">Hi there!</h1>
                <p className="body-l">My name is Carl, I do UX, interaction design, graphics, a touch of coding, and a lot more. <br /> <br />
                    {/* <p className="heading-md">My name is Carl, I am a UX designer who codes. Currently developing AI experiences at Huddly<br /> <br /> */}
                    I built this thing myself*, have a look <a className="weblink" href="https://github.com/cmtsys/carltra" target="_blank">here</a> if you want proof. </p>
                <p className="small-text">*ok, I might have asked claude for help a few times, but no vibecode, I promise!</p>
            </section>
        </section>
    )
}