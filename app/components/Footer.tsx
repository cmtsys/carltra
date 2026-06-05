"use client";
import Link from "next/link";
import { useEffect, useState } from "react";


export function Clock () {
    const [clock, setClock] = useState("");
   
    useEffect(() => {
        const interval = setInterval(() => {
            setClock(new Date().toLocaleTimeString())
                }, 1000)

  return () => clearInterval(interval)
}, [])

    return <p>{clock}</p>
}


export function Day () {
    return <p>dagen</p>
}



export default function Footer () {
    return (
         <footer>
                <div>
                    <Clock></Clock>
                    {/* <div id="clock"></div> */}
                    <div style={{display: "flex", gap: "var(--space-xs)"}}>
                        <Day></Day>
                        <div id="day"></div>
                        <div id="date"></div>
                    </div>
                </div>

                 <img className="cm" src="/img/cm.png" alt=""></img>
                
                <div style={{textAlign: "right"}}>
                <p style={{fontSize: "10px"}}>window size</p>
                <div id="window-size"></div>
                </div>

                </footer>
                    )
                }