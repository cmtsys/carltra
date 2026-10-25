"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (callback: () => void) => {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const readMotion = () => window.matchMedia(motionQuery).matches;
const subscribeVisibility = (callback: () => void) => {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
};
const readVisibility = () => !document.hidden;

export default function ProjectCardVideo({ src, poster, title, sizes }: {
  src: string; poster: string; title: string; sizes: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  // Server-render a real cover; don't download video until preferences are known.
  const reducedMotion = useSyncExternalStore(subscribeMotion, readMotion, () => true);
  const pageVisible = useSyncExternalStore(subscribeVisibility, readVisibility, () => false);
  const loadVideo = !reducedMotion && !failed;
  const shouldPlay = pageVisible && !reducedMotion;

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    let cancelled = false;
    if (!shouldPlay) {
      element.pause();
      return;
    }
    const play = () => {
      if (cancelled) return;
      element.muted = true;
      element.defaultMuted = true;
      element.playsInline = true;
      // Keep the cover on autoplay denial; retry when ready or after a gesture.
      void element.play().catch(() => {});
    };
    element.addEventListener("canplay", play);
    document.addEventListener("pointerdown", play, { passive: true });
    document.addEventListener("keydown", play);
    play();
    return () => {
      cancelled = true;
      element.removeEventListener("canplay", play);
      document.removeEventListener("pointerdown", play);
      document.removeEventListener("keydown", play);
      element.pause();
    };
  }, [loadVideo, shouldPlay]);

  return <div className="project-card-preview">
    <Image src={poster} alt={title} fill sizes={sizes}
      className="project-card-preview-cover" data-playing={loadVideo && playing} />
    {loadVideo && <video ref={video} src={src} poster={poster} muted playsInline loop autoPlay={shouldPlay}
      preload="auto" aria-hidden="true" tabIndex={-1}
      onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)}
      onEmptied={() => setPlaying(false)}
      onError={() => setFailed(true)} />}
  </div>;
}
