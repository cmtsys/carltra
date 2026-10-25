"use client";

// USED IN FUN STUFF SECTION

import { useEffect, useRef, useState } from "react";

export default function GalleryVideo({ src, poster, title, reducedMotion, onRatio }: {
  src: string; poster?: string; title: string; reducedMotion: boolean;
  onRatio: (ratio: number) => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [needsPlay, setNeedsPlay] = useState(reducedMotion);
  useEffect(() => {
    const video = ref.current;
    if (!video || reducedMotion) return;
    let cancelled = false;
    // Set properties explicitly before requesting inline playback on iOS.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.play().catch(() => { if (!cancelled) setNeedsPlay(true); });
    return () => { cancelled = true; video.pause(); };
  }, [src, reducedMotion]);

  return <>
    <video ref={ref} src={src} poster={poster} preload="metadata" muted playsInline loop
      autoPlay={!reducedMotion} aria-label={title}
      onPlaying={() => setNeedsPlay(false)}
      onLoadedMetadata={(event) => {
        const video = event.currentTarget;
        if (video.videoHeight) onRatio(video.videoWidth / video.videoHeight);
      }} />
    {needsPlay && <button type="button" className="archive-video-play"
      aria-label={`Play ${title}`} onClick={(event) => {
        event.stopPropagation();
        ref.current?.play().catch(() => setNeedsPlay(true));
      }}>play</button>}
  </>;
}
