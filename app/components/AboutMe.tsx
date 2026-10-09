import PortraitTooltip from "./PortraitTooltip";
import Tooltip from "./Tooltip";

const tooltips = [
    "I look something like this",
    "Yep, that's me",
    "100% the real deal",
    "An exact replica",

    "Maybe not photorealistic, but pretty close",
    "Drawn on a productive afternoon",
    "Might have aged a bit since then",
    "But still pretty close",
    // "For a drawing",
    "Mom agrees",
    "Yep",

    "Ok now",
    "Right",
    "...",
    "*checks watch*",
    "...",

    "Still going, huh",
    "Hover all you want, I'm not going anywhere",
    "Please stop poking me",
    "I mean it",
    "...Fine",

    // "You know this loops, right?",
    "Why not check out some of my projects?",
    "The Artwork thing is pretty neat",
    "Or check out the GitHub repo",
    "If you want to see how I made this tooltip",
    "But for real now, this is the end",
    "Nothing more to see",
    "Time to move on",
    "It's over",
    "Finito",
    "Done",
    ".",
    "bye",
    ".",
    "Well now it starts again",
    "In 3",
    "2",
    "1",
    "0",
    "I look something like this",
    "PSYCH!",
    "Can't believe you fell for that",
    "Ok this is the real end, now it starts over",
];


export default function AboutMe() {

    return (
        <section className="about-card">

            <PortraitTooltip messages={tooltips}>
                <img
                    className="about-portrait"
                    src="/img/cm.png"
                    alt="Portrait illustration"
                />
            </PortraitTooltip>

            <section className="about-copy">
                <div className="about-intro">
                    <h1 className="heading-serif">Hi there!</h1>
                    <p className="body-l body-l--narrow">
                        My name is Carl, I am a product & interaction designer who does graphics and a touch of coding.
                        <br /><br />
                        I built this thing myself, have a look{" "}
                        <Tooltip message="github.com/cmtsys/carltra">
                            <a
                                className="weblink"
                                href="https://github.com/cmtsys/carltra"
                                target="_blank"
                            >
                                here
                            </a>
                        </Tooltip>{" "}
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