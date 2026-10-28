"use client";

// USED IN FUN STUFF SECTION

import { useEffect, useState, type CSSProperties } from "react";

// Keep the previous frame painted until the replacement has decoded.
export default function GalleryImage({ src, sources, previewSources, naturalPairs = false, alt }: {
  src: string; sources?: string[]; previewSources?: string[]; naturalPairs?: boolean; alt: string;
}) {
  const [frame, setFrame] = useState(() => ({ src: previewSources?.join("|") ?? src, sources: previewSources ?? sources ?? [src], alt, ratios: (previewSources ?? sources ?? [src]).map(() => 1) }));
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

  return <div className="archive-gallery-frame">
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
    </div>;
}
