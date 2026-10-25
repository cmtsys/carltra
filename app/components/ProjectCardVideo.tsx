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
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  // Server-render a real cover; don't download video until preferences are known.
  const reducedMotion = useSyncExternalStore(subscribeMotion, readMotion, () => true);
  const pageVisible = useSyncExternalStore(subscribeVisibility, readVisibility, () => false);
  const loadVideo = near && !reducedMotion && !failed;
  const shouldPlay = visible && pageVisible && !reducedMotion;

  useEffect(() => {
    const element = root.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const nearby = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: "240px" });
    const onscreen = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    nearby.observe(element);
    onscreen.observe(element);
    return () => { nearby.disconnect(); onscreen.disconnect(); };
  }, []);

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
      // Autoplay denial is recoverable. Keep the visible native poster and retry
      // when ready, on re-entry, or after a user gesture; don't unmount the video.
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

  return <div ref={root} className="project-card-preview">
    <Image src={poster} alt={title} fill sizes={sizes} />
    {loadVideo && <video ref={video} src={src} poster={poster} muted playsInline loop autoPlay={shouldPlay}
      preload="metadata" aria-hidden="true" tabIndex={-1}
      onError={() => setFailed(true)} />}
  </div>;
}
