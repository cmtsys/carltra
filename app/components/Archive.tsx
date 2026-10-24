"use client";

// Reset measured geometry and Motion values together when editing this scene.
// @refresh reset

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { archiveProjects } from "../../lib/archive";
import { AnimatePresence, motion, useAnimationFrame, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const captionFade = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const PHOTO_COUNT = archiveProjects.length;
const photos = archiveProjects.map((project, index) => {
  const y = 1 - 2 * (index + 0.5) / PHOTO_COUNT;
  const ring = Math.sqrt(1 - y * y);
  const angle = index * GOLDEN_ANGLE;
  const x = Math.cos(angle) * ring;
  const z = Math.sin(angle) * ring;
  return { ...project, src: project.images[0], x, y, z,
    yaw: Math.atan2(x, z) * 180 / Math.PI, pitch: Math.asin(y) * 180 / Math.PI };
});

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  startYaw: number;
  startPitch: number;
  moved: boolean;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function Archive({ mode = "sphere" }: { mode?: "sphere" | "waterfall" }) {
  const isWaterfall = mode === "waterfall";
  const trackRef = useRef<HTMLDivElement>(null);
  const stream = useMotionValue(0);
  const smoothStream = useSpring(stream, { stiffness: 110, damping: 28 });
  const streamStep = 240;
  const introStreamOpacity = useTransform(smoothStream, [0, 180], [1, 0]);
  const introStreamY = useTransform(smoothStream, [0, 240], [0, -56]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const focusTarget = useRef<{ index: number; yaw: number; pitch: number; fromYaw: number; fromPitch: number; elapsed: number } | null>(null);
  const [radius, setRadius] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [origin, setOrigin] = useState({ left: 0, top: 0, width: 100, height: 100 });
  const [imageRatios, setImageRatios] = useState<Record<string, number>>({});
  const [hovered, setHovered] = useState<number | null>(null);
  const hoveredPhoto = useRef<number | null>(null);
  const hoverTitleRef = useRef<HTMLSpanElement>(null);
  const hoverLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedRef = useRef<number | null>(null);
  const stageRef = useRef<HTMLElement>(null);
  const photoRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const zoom = useMotionValue(1);
  const smoothZoom = useSpring(zoom, { stiffness: 180, damping: 30 });
  const introZoomOpacity = useTransform(smoothZoom, [1, 1.12], [1, 0]);
  const wheelActiveUntil = useRef(0);
  const yaw = useMotionValue(-20);
  const pitch = useMotionValue(-8);
  const smoothYaw = useSpring(yaw, { stiffness: 115, damping: 24 });
  const smoothPitch = useSpring(pitch, { stiffness: 115, damping: 24 });
  const sphereTransform = useMotionTemplate`scale(${smoothZoom}) rotateX(${smoothPitch}deg) rotateY(${smoothYaw}deg)`;
  const drag = useRef<DragState | null>(null);
  const ignoreClick = useRef(false);

  useEffect(() => () => {
    if (hoverLeaveTimer.current) clearTimeout(hoverLeaveTimer.current);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const resize = () => {
      const { width, height } = stage.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      setStageSize({ width, height });
      setRadius(clamp(Math.min(width * 0.40, height * 0.43), 70, 500));
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isWaterfall) return;
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const distance = track.scrollTop;
      stream.set(distance);
      if (reduceMotion) smoothStream.jump(distance);
      hoveredPhoto.current = null;
      const focused = photoRefs.current.findIndex((card) => card === document.activeElement);
      setHovered(focused >= 0 ? focused : null);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    return () => track.removeEventListener("scroll", update);
  }, [isWaterfall, stream, smoothStream, reduceMotion]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement;
      // Keep native scrolling in the thumbnail strip and text, and native video controls.
      if (target.closest(".archive-feature-gallery, .archive-sphere-caption, video")) return;
      if (isWaterfall && !event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      wheelActiveUntil.current = performance.now() + 250;
      if (hoverLeaveTimer.current) clearTimeout(hoverLeaveTimer.current);
      hoveredPhoto.current = null;
      setHovered(null);
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? stage.clientHeight : 1;
      if (event.ctrlKey || event.metaKey) {
        const value = clamp(zoom.get() * Math.exp(-event.deltaY * unit * 0.008), 0.65, 1.6);
        zoom.set(value);
        if (reduceMotion) smoothZoom.jump(value);
      } else {
        focusTarget.current = null;
        // Wheel deltas already include the OS scroll-direction preference.
        // Move the sphere like page content: opposite the signed scroll offset.
        const nextYaw = yaw.get() - event.deltaX * unit * 0.18;
        const nextPitch = pitch.get() + event.deltaY * unit * 0.18;
        yaw.set(nextYaw); pitch.set(nextPitch);
        if (reduceMotion) { smoothYaw.jump(nextYaw); smoothPitch.jump(nextPitch); }
      }
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [pitch, yaw, zoom, smoothPitch, smoothYaw, smoothZoom, reduceMotion, isWaterfall]);

  useAnimationFrame((time, delta) => {
    if (isWaterfall) {
      const offset = smoothStream.get();
      photos.forEach((photo, index) => {
        const card = photoRefs.current[index];
        if (!card) return;
        const depth = [80, -140, 20, -220][index % 4];
        const y = index * streamStep - offset + stageSize.height * 0.05;
        const x = Math.sin(index * 2.1 - 0.8) * Math.min(stageSize.width * 0.28, 260);
        const float = reduceMotion ? 0 : Math.sin(time / 2200 + index * 1.7) * 8;
        const tilt = reduceMotion ? 0 : Math.sin(index * 1.9) * 12;
        card.style.transform = `translate3d(${x}px, ${y + float}px, ${depth}px) rotateY(${tilt}deg) rotateZ(${tilt * 0.3}deg)`;
        const opacity = clamp((stageSize.height * 0.7 - Math.abs(y)) / 120, 0, 1);
        card.style.opacity = String(opacity * (depth < -100 ? 0.78 : 1));
        card.style.pointerEvents = opacity > 0.15 ? "auto" : "none";
      });
      // Project the hovered card into screen space; labels keep a constant size
      // and stay upright independently of perspective, tilt, and zoom.
      const label = hoverTitleRef.current;
      const card = hovered === null ? null : photoRefs.current[hovered];
      const stage = stageRef.current;
      if (label && card && stage) {
        const bounds = card.getBoundingClientRect();
        const frame = stage.getBoundingClientRect();
        const alignRight = bounds.left + bounds.width / 2 > frame.left + frame.width / 2;
        const room = alignRight ? bounds.left - frame.left - 32 : frame.right - bounds.right - 32;
        label.style.maxWidth = `${Math.max(80, Math.min(260, room))}px`;
        const left = alignRight ? bounds.left - frame.left - label.offsetWidth - 20 : bounds.right - frame.left + 20;
        label.style.left = `${clamp(left, 12, Math.max(12, frame.width - label.offsetWidth - 12))}px`;
        label.style.top = `${Math.max(12, bounds.top - frame.top + 12)}px`;
        label.style.visibility = "visible";
      }
      return;
    }
    const target = focusTarget.current;
    if (target) {
      target.elapsed += delta;
      const progress = reduceMotion ? 1 : Math.min(target.elapsed / 400, 1);
      const ease = 1 - (1 - progress) ** 3;
      const nextYaw = target.fromYaw + (target.yaw - target.fromYaw) * ease;
      const nextPitch = target.fromPitch + (target.pitch - target.fromPitch) * ease;
      yaw.jump(nextYaw); smoothYaw.jump(nextYaw);
      pitch.jump(nextPitch); smoothPitch.jump(nextPitch);
      if (progress === 1) focusTarget.current = null;
    } else if (performance.now() > wheelActiveUntil.current && !drag.current && (selectedRef.current !== null || hoveredPhoto.current === null) && !reduceMotion) {
      yaw.set(yaw.get() + Math.min(delta, 40) * 0.0008);
    }
    // Depth shading follows the displayed rotation, including while dragging.
    const ry = smoothYaw.get() * Math.PI / 180;
    const rx = smoothPitch.get() * Math.PI / 180;
    photos.forEach((photo, index) => {
      const surface = photoRefs.current[index]?.firstElementChild as HTMLElement | null;
      if (!surface) return;
      const depth = -photo.y * Math.sin(rx) + (-photo.x * Math.sin(ry) + photo.z * Math.cos(ry)) * Math.cos(rx);
      surface.style.opacity = String(0.6 + 0.4 * clamp((depth + 0.3) / 0.6, 0, 1));
    });
  });

  const clearSelection = () => {
    freezeRotation();
    focusTarget.current = null;
    selectedRef.current = null;
    setSelected(null);
    stageRef.current?.focus({ preventScroll: true });
  };

  const freezeRotation = () => {
    const currentYaw = smoothYaw.get();
    const currentPitch = smoothPitch.get();
    yaw.jump(currentYaw);
    pitch.jump(currentPitch);
    smoothYaw.jump(currentYaw);
    smoothPitch.jump(currentPitch);
  };

  const focusPhoto = (index: number) => {
    if (ignoreClick.current) return;
    if (selected === index) {
      clearSelection();
      return;
    }

    setHovered(null);
    hoveredPhoto.current = null;
    selectedRef.current = index;
    freezeRotation();
    const bounds = photoRefs.current[index]?.getBoundingClientRect();
    const stage = stageRef.current?.getBoundingClientRect();
    if (bounds && stage) setOrigin({ left: bounds.left - stage.left, top: bounds.top - stage.top, width: bounds.width, height: bounds.height });
    setGalleryIndex(0);
    const photo = photos[index];
    if (isWaterfall) {
      setSelected(index);
      return;
    }
    focusTarget.current = { index, yaw: -photo.yaw + 360 * Math.round((yaw.get() + photo.yaw) / 360),
      pitch: -photo.pitch + 360 * Math.round((pitch.get() + photo.pitch) / 360), fromYaw: yaw.get(), fromPitch: pitch.get(), elapsed: 0 };
    setSelected(index);
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    freezeRotation();
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startYaw: yaw.get(),
      startPitch: pitch.get(),
      moved: false,
    };
  };

  const browsePhoto = (direction: number) => {
    const index = selectedRef.current ?? 0;
    const next = (index + direction + PHOTO_COUNT) % PHOTO_COUNT;
    if (isWaterfall && trackRef.current) {
      trackRef.current.scrollTo({ top: next * streamStep, behavior: reduceMotion ? "instant" : "smooth" });
    }
    focusPhoto(next);
    stageRef.current?.focus({ preventScroll: true });
  };

  const browseImage = (direction: number) => {
    if (selected === null) return;
    const count = photos[selected].images.length;
    setGalleryIndex((index) => (index + direction + count) % count);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;

    const dx = event.clientX - current.startX;
    const dy = event.clientY - current.startY;
    if (!current.moved && Math.hypot(dx, dy) > 5) {
      current.moved = true;
      freezeRotation();
      current.startYaw = yaw.get();
      current.startPitch = pitch.get();
      clearSelection();
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (!current.moved) return;

    if (isWaterfall) {
      trackRef.current?.scrollBy(0, -dy);
      current.startY = event.clientY;
      return;
    }
    yaw.set(current.startYaw + dx * 0.28);
    pitch.set(current.startPitch - dy * 0.28);
  };

  const resetTilt = (card: HTMLButtonElement) => {
    card.classList.remove("is-hover");
    card.querySelector(".t-tilt-card")?.classList.remove("is-tilting");
    card.style.setProperty("--tilt-rx", "0deg");
    card.style.setProperty("--tilt-ry", "0deg");
  };

  const handleCardTilt = (event: PointerEvent<HTMLButtonElement>) => {
    if (!isWaterfall || reduceMotion || event.pointerType !== "mouse" || event.buttons !== 0) return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
    const y = clamp((event.clientY - bounds.top) / bounds.height, 0, 1);
    card.style.setProperty("--tilt-rx", `${(0.5 - y) * 16}deg`);
    card.style.setProperty("--tilt-ry", `${(x - 0.5) * 16}deg`);
    card.style.setProperty("--tilt-gx", `${x * 100}%`);
    card.style.setProperty("--tilt-gy", `${y * 100}%`);
    card.classList.add("is-hover");
    card.querySelector(".t-tilt-card")?.classList.add("is-tilting");
  };

  const handlePointerEnd = (event: PointerEvent<HTMLElement>) => {
    if (drag.current?.pointerId !== event.pointerId) return;
    if (drag.current.moved) {
      ignoreClick.current = true;
      window.setTimeout(() => { ignoreClick.current = false; }, 0);
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    drag.current = null;
  };

  const compact = stageSize.width < 700;
  const selectedSrc = selected === null ? "" : photos[selected].images[galleryIndex];
  const galleryHeight = selected !== null && photos[selected].images.length > 1 ? 72 : 0;
  const selectedRatio = imageRatios[selectedSrc] ?? 1;
  const maxWidth = compact ? stageSize.width * 0.82 : Math.min(600, stageSize.width * 0.48);
  const maxHeight = compact ? stageSize.height * 0.38 : Math.max(100, stageSize.height - galleryHeight - 64);
  const mediaWidth = Math.min(maxWidth, maxHeight * selectedRatio);
  const mediaHeight = mediaWidth / selectedRatio;
  const textWidth = compact ? Math.min(300, stageSize.width - 48) : Math.min(310, stageSize.width * 0.28);
  const gap = compact ? 24 : 48;
  const featureLeft = compact ? (stageSize.width - mediaWidth) / 2 : (stageSize.width - mediaWidth - gap - textWidth) / 2;
  const featureTop = compact ? 56 : (stageSize.height - mediaHeight - galleryHeight) / 2;
  const featureBounds = { left: featureLeft, top: featureTop, width: mediaWidth, height: mediaHeight };
  const captionPosition = { left: compact ? (stageSize.width - textWidth) / 2 : featureLeft + mediaWidth + gap,
    top: compact ? featureTop + mediaHeight + galleryHeight + gap + 24 : featureTop,
    width: textWidth };

  const cardWidth = isWaterfall ? clamp(stageSize.width * 0.24, 110, 245) : clamp(radius * 0.35, 36, 150);

  return (
    <>
    <motion.div className="archive-intro"
      animate={{ opacity: selected !== null ? 0 : 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
      aria-hidden={selected !== null ? true : undefined}
      style={isWaterfall ? { y: introStreamY } : undefined}>
      <motion.p className="body-l" style={{ opacity: isWaterfall ? introStreamOpacity : introZoomOpacity }}>As any designer, I have a bunch of wierd and/or unfinished projects. I have bundled them together here for anyone who might be interested. </motion.p>
    </motion.div>
    <div ref={trackRef} className={isWaterfall ? "archive-waterfall-track" : "archive-sphere-track"}>
    <section
      ref={stageRef}
      className={`archive-sphere-screen${isWaterfall ? " archive-waterfall-screen" : ""}`}
      aria-label={isWaterfall ? "Floating project stream. Scroll or drag to explore. Select an image to read about it. Escape closes details." : "Photo sphere. Drag, scroll with two fingers, or use arrow keys to rotate. Pinch to zoom. Select a photo to read about it. Press Escape to return."}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onLostPointerCapture={handlePointerEnd}
      onPointerLeave={() => { if (drag.current && !drag.current.moved) drag.current = null; }}
      onClick={() => { if (!ignoreClick.current) clearSelection(); }}
      onKeyDown={(event) => {
        if (event.key === "Escape") clearSelection();
        if (isWaterfall && ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(event.key)) {
          event.preventDefault();
          const top = event.key === "Home" ? 0 : event.key === "End" ? (PHOTO_COUNT - 1) * streamStep
            : stream.get() + (["ArrowUp", "PageUp"].includes(event.key) ? -1 : 1) * streamStep;
          trackRef.current?.scrollTo({ top, behavior: reduceMotion ? "instant" : "smooth" });
          return;
        }
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          if (selectedRef.current !== null) {
            browsePhoto(event.key === "ArrowLeft" ? -1 : 1);
            return;
          }
          clearSelection();
          yaw.set(yaw.get() + (event.key === "ArrowLeft" ? -18 : 18));
        }
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          event.preventDefault();
          clearSelection();
          pitch.set(pitch.get() + (event.key === "ArrowUp" ? 18 : -18));
        }
      }}
    >
      <div className="archive-sphere-scene">
        <motion.div
          className="archive-sphere"
          style={isWaterfall ? { scale: smoothZoom } : { transform: sphereTransform }}
        >
          {radius > 0 && photos.map((photo, index) => {
            const ratio = imageRatios[photo.src] ?? 1;
            const width = Math.min(cardWidth * 1.35, cardWidth * 1.4 * ratio);
            const height = width / ratio;

            return (
              <button
                key={photo.src}
                ref={(element) => { photoRefs.current[index] = element; }}
                className={`archive-sphere-photo${isWaterfall ? " t-tilt" : ""}`}
                type="button"
                aria-label={`View ${photo.title}`}
                aria-pressed={selected === index}
                aria-describedby={selected === index ? "archive-photo-details" : undefined}
                onFocus={() => {
                  if (isWaterfall) setHovered(index);
                  if (isWaterfall && trackRef.current) {
                    const top = index * streamStep;
                    if (Math.abs(stream.get() - index * streamStep) > stageSize.height * 0.4) trackRef.current.scrollTo({ top, behavior: reduceMotion ? "instant" : "smooth" });
                  }
                }}
                onBlur={() => { if (isWaterfall) setHovered(null); }}
                onPointerMove={handleCardTilt}
                onPointerDown={(event) => { if (isWaterfall) resetTilt(event.currentTarget); }}
                onPointerCancel={(event) => { if (isWaterfall) resetTilt(event.currentTarget); }}
                onPointerEnter={(event) => {
                  handleCardTilt(event);
                  if (event.pointerType === "mouse") {
                    if (hoverLeaveTimer.current) clearTimeout(hoverLeaveTimer.current);
                    hoverLeaveTimer.current = null;
                    if (selectedRef.current === null && !focusTarget.current && !drag.current?.moved) freezeRotation();
                    hoveredPhoto.current = index;
                    setHovered(index);
                  }
                }}
                onPointerLeave={(event) => {
                  if (isWaterfall) resetTilt(event.currentTarget);
                  if (hoveredPhoto.current === index) {
                    if (hoverLeaveTimer.current) clearTimeout(hoverLeaveTimer.current);
                    hoverLeaveTimer.current = setTimeout(() => {
                      if (hoveredPhoto.current === index) {
                        hoveredPhoto.current = null;
                        setHovered(null);
                      }
                      hoverLeaveTimer.current = null;
                    }, 140);
                  }
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  focusPhoto(index);
                }}
                style={{
                  visibility: selected === index ? "hidden" : "visible",
                  width,
                  height,
                  marginLeft: -width / 2,
                  marginTop: -height / 2,
                  transform: `translate3d(${photo.x * radius}px, ${-photo.y * radius}px, ${photo.z * radius}px) rotateY(${photo.yaw}deg) rotateX(${photo.pitch}deg)`,
                }}
              >
                <motion.span
                  className="archive-sphere-photo-inner"
                  animate={{ scale: !isWaterfall && hovered === index && !reduceMotion ? 1.045 : 1 }}
                  transition={isWaterfall ? { type: "spring", stiffness: 130, damping: 22, duration: reduceMotion ? 0 : undefined } : { duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={isWaterfall ? "t-tilt-card" : "archive-photo-media"}>
                  {photo.src.endsWith(".mp4") ? (
                    <video src={photo.src} muted playsInline loop autoPlay={!reduceMotion} preload="metadata"
                      onLoadedMetadata={(event) => { const video = event.currentTarget; setImageRatios((current) => ({ ...current, [photo.src]: video.videoWidth / video.videoHeight })); }} />
                  ) : (
                    <Image src={photo.src} alt="" width={600} height={600 / (imageRatios[photo.src] ?? 1)}
                      onLoad={(event) => { const image = event.currentTarget; const ratio = image.naturalWidth / image.naturalHeight;
                        if (ratio > 0) setImageRatios((current) => current[photo.src] === ratio ? current : { ...current, [photo.src]: ratio }); }}
                      loading="eager" unoptimized draggable={false} />
                  )}
                  {isWaterfall && <span className="t-tilt-glare" aria-hidden="true" />}
                  </span>
                </motion.span>

              </button>
            );
          })}
        </motion.div>
      </div>
      {isWaterfall && (
        <motion.span ref={hoverTitleRef} className="archive-waterfall-title body-m" aria-hidden="true"
          initial={false} animate={{ opacity: hovered !== null && selected === null ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}>
          {hovered !== null ? photos[hovered].title : ""}
        </motion.span>
      )}
      <AnimatePresence>
        {selected !== null && (
          <motion.div key={selected} className="archive-feature" exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <motion.div className="archive-feature-media" initial={reduceMotion ? false : origin}
              animate={featureBounds} transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              onPointerDown={(event) => event.stopPropagation()} onClick={(event) => event.stopPropagation()}>
              {selectedSrc.endsWith(".mp4") ? (
                <video src={selectedSrc} muted playsInline loop autoPlay={!reduceMotion} controls aria-label={photos[selected].title} />
              ) : (
                <Image src={selectedSrc} alt={`${photos[selected].title}, image ${galleryIndex + 1}`} width={1000} height={1000 / selectedRatio} unoptimized
                  onLoad={(event) => {
                    const image = event.currentTarget;
                    const ratio = image.naturalWidth / image.naturalHeight;
                    if (ratio > 0) setImageRatios((current) => current[selectedSrc] === ratio ? current : { ...current, [selectedSrc]: ratio });
                  }} />
              )}
              {!selectedSrc.endsWith(".mp4") && photos[selected].images.length > 1 && (
                <div className="archive-image-navigation" onKeyDown={(event) => {
                  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                    event.preventDefault(); event.stopPropagation();
                    browseImage(event.key === "ArrowLeft" ? -1 : 1);
                  }
                }}>
                  <button type="button" className="archive-image-previous" aria-label="Previous image" onClick={() => browseImage(-1)}><span aria-hidden="true">←</span></button>
                  <button type="button" className="archive-image-next" aria-label="Next image" onClick={() => browseImage(1)}><span aria-hidden="true">→</span></button>
                </div>
              )}
            </motion.div>
            {photos[selected].images.length > 1 && (
              <motion.div className="archive-feature-gallery" role="group" aria-label="Project gallery"
                style={{ left: featureLeft, top: featureTop + mediaHeight + 16, width: mediaWidth }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduceMotion ? 0 : 0.3 }}
                onPointerDown={(event) => event.stopPropagation()} onClick={(event) => event.stopPropagation()}>
                {photos[selected].images.map((src, index) => (
                  <button key={src} type="button" aria-label={`Show image ${index + 1} of ${photos[selected].images.length}`}
                    aria-pressed={galleryIndex === index} onClick={() => setGalleryIndex(index)}>
                    <Image src={src} alt="" width={64} height={48} unoptimized
                      onLoad={(event) => {
                        const image = event.currentTarget;
                        const ratio = image.naturalWidth / image.naturalHeight;
                        if (ratio > 0) setImageRatios((current) => current[src] === ratio ? current : { ...current, [src]: ratio });
                      }} />
                  </button>
                ))}
              </motion.div>
            )}
            <motion.aside id="archive-photo-details" className="archive-sphere-caption" style={captionPosition}
              initial="hidden" animate="visible" exit="hidden"
              onPointerDown={(event) => event.stopPropagation()} onClick={(event) => event.stopPropagation()}>
              <motion.div className="archive-sphere-caption-backdrop" aria-hidden="true" variants={captionFade} transition={{ duration: 0.25 }} />
              <motion.div variants={captionFade} transition={{ duration: reduceMotion ? 0 : 0.25, delay: reduceMotion ? 0 : 0.15 }}>
                <div className="archive-sphere-caption-meta smallcase">
                  <button type="button" onClick={clearSelection} aria-label="Close project details">close ×</button>
                </div>
                <h2 className="body-l">{photos[selected].title}</h2>
                <p className="body-m">{photos[selected].description}</p>
                {photos[selected].year && <p className="archive-project-year smallcase">{photos[selected].year}</p>}
                {photos[selected].link && <a className="archive-project-link body-m" href={photos[selected].link} target="_blank" rel="noreferrer">visit website</a>}
                <div className="archive-sphere-caption-nav body-m">
                  <button type="button" className="underline-link" onClick={() => browsePhoto(-1)} aria-label="Previous project">previous</button>
                  <button type="button" className="underline-link" onClick={() => browsePhoto(1)} aria-label="Next project">next</button>
                </div>
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    {isWaterfall && <div aria-hidden="true" style={{ height: (PHOTO_COUNT - 1) * streamStep }} />}
    </div>
    </>
  );
}
