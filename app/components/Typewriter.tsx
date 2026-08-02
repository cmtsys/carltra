"use client";
import { useState, useEffect, useRef } from "react";

      const words = [
                "UX",
                "code",  
                "products",  
                "interaction",
                "systems",
                "AI",
                "prototypes",
                "visuals",
                "research & insight",
                "typography",
                "interfaces",
                "print",
                "3D",
                "flows",
                "javascript",
                "microinteractions",
                "post-it notes",
                ];

export default function Typewriter() {

  const [displayed, setDisplayed] = useState("");
  const i = useRef(0);
  const j = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    function type() {
      const currentWord = words[i.current];
      
      if (isDeleting.current) { j.current-- } else { j.current++ }
      
      setDisplayed(currentWord.substring(0, j.current))

      if (!isDeleting.current && j.current === currentWord.length) {
        isDeleting.current = true;
        setTimeout(type, 1200);
        return;
      }
      if (isDeleting.current && j.current === 0) {
        isDeleting.current = false;
        i.current = (i.current + 1) % words.length;
      }

      setTimeout(type, isDeleting.current ? 20 : 80);
      
    }

    type();
  }, [words])

  return (
    <h1 className="heading-md">
      <span className="intro-text">Digital designer 👾 exploring the </span>
      space between{" "}
      <span className="typewriter">{displayed}</span>
      <span className="cursor">_</span>
    </h1>
  )
}