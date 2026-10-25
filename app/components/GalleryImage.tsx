"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// Keep the previous frame painted until the replacement has decoded.
export default function GalleryImage({ src, alt, reducedMotion }: {
  src: string; alt: string; reducedMotion: boolean;
}) {
  const [frame, setFrame] = useState({ src, alt });
  useEffect(() => {
    let cancelled = false;
    const image = new window.Image();
    image.src = src;
    image.decode().then(() => {
      if (!cancelled) setFrame({ src, alt });
    }).catch(() => {
      // A failed replacement must not erase the current image.
    });
    return () => { cancelled = true; };
  }, [src, alt]);

  return <AnimatePresence initial={false}>
    <motion.div key={frame.src} className="archive-gallery-frame"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}>
      {/* The browser-decoded original is reused, including animated GIFs. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={frame.src} alt={frame.alt} draggable={false} />
    </motion.div>
  </AnimatePresence>;
}
