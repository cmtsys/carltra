"use client";
import { useEffect, useState } from "react";


export function Clock () {
    const [clock, setClock] = useState("");
   
    useEffect(() => {
        const interval = setInterval(() => {
            setClock(new Date().toLocaleTimeString())
                }, 1000)

  return () => clearInterval(interval)
}, [])

    return <span>{clock}</span>
}


export function Day() {

  const day = new Date().toLocaleDateString("en-GB", { weekday: "long" })

  return <span>{day}</span>;
}

export function CurrentDate() {

  const date = new Date().toLocaleDateString("en-GB", { day:"numeric", month: "long", year: "numeric" })

  return <span>{date}</span>;
}

export function WindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    update(); // set on mount
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update); // cleanup
  }, []);

  return <span>{size.width} x {size.height}</span>;
}


export default function Footer () {
    return (
        <footer>
        <div>
            <Clock></Clock>
            <div style={{display: "flex", gap: "var(--space-xs)"}}>
                <Day></Day>
                <CurrentDate></CurrentDate>
                <div id="date"></div>
            </div>
        </div>

                 {/* <img className="cm" src="/img/cm.png" alt=""></img> */}
                
                <div style={{textAlign: "right"}}>
                {/* <p style={{fontSize: "10px"}}>window size</p> */}
                <section>window size</section>
                <WindowSize></WindowSize>
                </div>

                </footer>
                    )
                }