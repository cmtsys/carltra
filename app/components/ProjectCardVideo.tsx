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
  const [blocked, setBlocked] = useState(false);
  const [playing, setPlaying] = useState(false);
  // Server-render a real cover; don't download video until preferences are known.
  const reducedMotion = useSyncExternalStore(subscribeMotion, readMotion, () => true);
  const pageVisible = useSyncExternalStore(subscribeVisibility, readVisibility, () => false);
  const loadVideo = near && !reducedMotion && !blocked;

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
    if (visible && pageVisible && loadVideo) {
      element.muted = true;
      element.defaultMuted = true;
      element.play().catch((error: DOMException) => {
        // Scrolling out can abort an in-flight play request; that isn't a policy failure.
        if (!cancelled && error.name !== "AbortError") setBlocked(true);
      });
    } else {
      element.pause();
    }
    return () => { cancelled = true; element.pause(); };
  }, [loadVideo, visible, pageVisible]);

  return <div ref={root} className="project-card-preview">
    <Image src={poster} alt={title} fill sizes={sizes} />
    {loadVideo && <video ref={video} src={src} poster={poster} muted playsInline loop
      preload="metadata" aria-hidden="true" tabIndex={-1}
      className="project-card-preview-video" data-playing={playing}
      onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)}
      onError={() => setBlocked(true)} />}
  </div>;
}
