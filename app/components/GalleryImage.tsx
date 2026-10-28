"use client";

// USED IN FUN STUFF SECTION

import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";

// Keep the previous frame painted until the replacement has decoded.
export default function GalleryImage({ src, sources, naturalPairs = false, alt, reducedMotion }: {
  src: string; sources?: string[]; naturalPairs?: boolean; alt: string; reducedMotion: boolean;
}) {
  const [frame, setFrame] = useState({ src, sources: sources ?? [src], alt, ratios: (sources ?? [src]).map(() => 1) });
  useEffect(() => {
    let cancelled = false;
    const images = sources ?? [src];
    Promise.all(images.map((url) => {
      const image = new window.Image();
      image.src = url;
      return image.decode().then(() => image.naturalWidth / image.naturalHeight);
    })).then((ratios) => {
      if (!cancelled) setFrame({ src, sources: images, alt, ratios });
    }).catch(() => {
      // A failed replacement must not erase the current image.
    });
    return () => { cancelled = true; };
  }, [src, sources, alt]);

  const stacked = naturalPairs && frame.ratios.every((ratio) => ratio > 1);
  const spreadRatio = stacked
    ? 1 / frame.ratios.reduce((sum, ratio) => sum + 1 / ratio, 0)
    : frame.ratios.reduce((sum, ratio) => sum + ratio, 0);

  return <AnimatePresence initial={false}>
    <motion.div key={frame.src} className="archive-gallery-frame"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}>
      {/* The browser-decoded original is reused, including animated GIFs. */}
      {frame.sources.length > 1 ? <div className={`archive-image-spread archive-image-spread-${frame.sources.length}${naturalPairs ? " archive-image-spread-natural" : ""}`}
        style={naturalPairs ? {
          "--spread-ratio": spreadRatio,
          gridTemplateColumns: stacked ? "1fr" : frame.ratios.map((ratio) => `${ratio}fr`).join(" "),
          gridTemplateRows: stacked ? frame.ratios.map((ratio) => `${1 / ratio}fr`).join(" ") : undefined,
        } as CSSProperties : undefined}>
        {frame.sources.map((url, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={url} src={url} alt={`${frame.alt}, panel ${index + 1}`} draggable={false} />
        ))}
      </div> : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={frame.src} alt={frame.alt} draggable={false} />
      )}
    </motion.div>
  </AnimatePresence>;
}
