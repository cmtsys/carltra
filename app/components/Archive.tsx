"use client";

// Yeah, this is all vibecoded – i dont know what is going on here. 

// Reset measured geometry and Motion values together when editing this scene.
// @refresh reset

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import GalleryImage from "./GalleryImage";
import GalleryVideo from "./GalleryVideo";
import { archiveProjects } from "../../lib/archive";
import previewData from "../../lib/archive-previews.json";
import { AnimatePresence, motion, useAnimationFrame, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const captionFade = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const PHOTO_COUNT = archiveProjects.length;
const previews: Record<string, { src: string; width: number; height: number; poster?: string }> = previewData;
const photos = archiveProjects.map((project, index) => {
  const y = 1 - 2 * (index + 0.5) / PHOTO_COUNT;
  const ring = Math.sqrt(1 - y * y);
  const angle = index * GOLDEN_ANGLE;
  const x = Math.cos(angle) * ring;
  const z = Math.sin(angle) * ring;
  const gallery = project.galleryGroups?.map((group) => group.map((index) => project.images[index])) ?? project.images.map((src) => [src]);
  return { ...project, gallery, src: project.images[0], x, y, z,
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

// Three portrait posters presented as one composition, including the gutters.
const POSTER_ROW_RATIO = 2.35;
const imageCount = (photo: typeof photos[number]) => photo.mediaLayout === "row" ? 1 : photo.gallery.length;
const galleryRatio = (photo: typeof photos[number], images: string[], measured: Record<string, number>) => {
  if (photo.mediaLayout === "row") return POSTER_ROW_RATIO;
  if (images.length === 1) return measured[images[0]] ?? 1;
  if (!photo.naturalPairs) return images.length === 2 ? 2 : 1;
  const ratios = images.map((src) => measured[src] ?? 1);
  return ratios.every((ratio) => ratio > 1)
    ? 1 / ratios.reduce((sum, ratio) => sum + 1 / ratio, 0)
    : ratios.reduce((sum, ratio) => sum + ratio, 0);
};
function PosterRow({ images, title, preview = false }: { images: string[]; title: string; preview?: boolean }) {
  return <span className="archive-poster-row">{images.map((src, index) => (
    <Image key={src} src={preview ? previews[src]?.src ?? src : src} alt={`${title}, poster ${index + 1}`} width={1181} height={1575} unoptimized draggable={false} />
  ))}</span>;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const resetTilt = (card: HTMLButtonElement) => {
    card.classList.remove("is-hover");
    card.querySelector(".t-tilt-card")?.classList.remove("is-tilting");
    card.style.setProperty("--tilt-rx", "0deg");
    card.style.setProperty("--tilt-ry", "0deg");
  };

export default function Archive({ mode = "sphere" }: { mode?: "sphere" | "fun-stuff" }) {
  const isFunStuff = mode === "fun-stuff";
  const trackRef = useRef<HTMLDivElement>(null);
  const stream = useMotionValue(0);
  const streamStep = 240;
  const [atStreamEnd, setAtStreamEnd] = useState(false);
  const [streamIndex, setStreamIndex] = useState(0);
  const offscreenCards = useRef(new Set<number>());
  const endRef = useRef<HTMLDivElement>(null);
  const introStreamOpacity = useTransform(stream, [0, 180], [1, 0]);
  const introStreamY = useTransform(stream, [0, 240], [0, -56]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [rememberedViews, setRememberedViews] = useState<Record<number, number>>({});
  const focusTarget = useRef<{ index: number; yaw: number; pitch: number; fromYaw: number; fromPitch: number; elapsed: number } | null>(null);
  const [radius, setRadius] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [returning, setReturning] = useState<number | null>(null);
  const returnFlight = useRef<{ index: number; element: HTMLElement; from: DOMRect; contentWidth: number; contentHeight: number; started: number } | null>(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  // Stop earlier on mobile so the final card and closing copy share the viewport.
  const streamEnd = PHOTO_COUNT * streamStep - (stageSize.width < 700 ? clamp(stageSize.height * 0.16, 72, 140) : 0);
  const [origin, setOrigin] = useState({ left: 0, top: 0, width: 100, height: 100 });
  const [imageRatios, setImageRatios] = useState<Record<string, number>>(() =>
    Object.fromEntries(Object.entries(previews).map(([src, media]) => [src, media.width / media.height])));
  const [hovered, setHovered] = useState<number | null>(null);
  const hoveredPhoto = useRef<number | null>(null);
  const scrollTitle = useRef<number | null>(null);
  const mousePosition = useRef<{ x: number; y: number } | null>(null);
  const hoverTitleRefs = useRef<(HTMLSpanElement | null)[]>([]);
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
  const streamTouch = useRef<{ x: number; y: number } | null>(null);
  const gallerySwipe = useRef<{ x: number; y: number } | null>(null);
  const suppressGalleryClick = useRef(false);
  const ignoreClick = useRef(false);

  const clearSelection = useCallback(() => {
    const index = selectedRef.current;
    if (index === null) return;
    setRememberedViews((current) => ({ ...current, [index]: galleryIndex }));
    const card = photoRefs.current[index]?.getBoundingClientRect();
    const element = stageRef.current?.querySelector<HTMLElement>(".archive-feature-media");
    const media = element?.getBoundingClientRect();
    if (card && element && media && media.width && media.height && !reduceMotion) {
      const frame = Array.from(element.querySelectorAll<HTMLElement>(".archive-gallery-frame"))
        .sort((a, b) => Number(getComputedStyle(b).opacity) - Number(getComputedStyle(a).opacity))[0];
      const image = frame?.querySelector<HTMLImageElement>("img");
      const video = element.querySelector<HTMLVideoElement>("video");
      const spread = (frame?.querySelector<HTMLElement>(".archive-image-spread") ?? element.querySelector<HTMLElement>(".archive-poster-row"))?.getBoundingClientRect();
      const ratio = image?.naturalWidth && image.naturalHeight ? image.naturalWidth / image.naturalHeight
        : video?.videoWidth && video.videoHeight ? video.videoWidth / video.videoHeight : media.width / media.height;
      const contentWidth = spread?.width ?? Math.min(media.width, media.height * ratio);
      const contentHeight = spread?.height ?? contentWidth / ratio;
      returnFlight.current = { index, element, from: media, contentWidth, contentHeight, started: performance.now() };
      setReturning(index);
    }
    focusTarget.current = null;
    selectedRef.current = null;
    setSelected(null);
    stageRef.current?.focus({ preventScroll: true });
  }, [reduceMotion, galleryIndex]);

  useEffect(() => {
    if (selected === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      clearSelection();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, clearSelection]);

  useEffect(() => () => {
    if (hoverLeaveTimer.current) clearTimeout(hoverLeaveTimer.current);
  }, []);

  // Warm adjacent images and measure them before their frames animate into view.
  useEffect(() => {
    if (selected === null) return;
    let cancelled = false;
    const images = photos[selected].gallery;
    const adjacent = [galleryIndex, galleryIndex - 1, galleryIndex + 1]
      .map((index) => images[(index + images.length) % images.length])
      .flat()
      .filter((src) => !src.endsWith(".mp4"));
    adjacent.forEach((src) => {
      const image = new window.Image();
      image.onload = () => {
        if (cancelled) return;
        const ratio = image.naturalWidth / image.naturalHeight;
        if (ratio > 0) setImageRatios((current) => current[src] === ratio ? current : { ...current, [src]: ratio });
      };
      image.src = src;
    });
    return () => { cancelled = true; };
  }, [selected, galleryIndex]);

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
    if (!isFunStuff) return;
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const distance = track.scrollTop;
      stream.set(distance);
      setStreamIndex(Math.round(distance / streamStep));
      setAtStreamEnd(distance >= streamEnd - 80);
      scrollTitle.current = distance > 40 && distance < streamEnd - 80
        ? clamp(Math.round(distance / streamStep), 0, PHOTO_COUNT - 1) : null;
      hoveredPhoto.current = null;
      const focused = photoRefs.current.findIndex((card) => card === document.activeElement);
      setHovered(scrollTitle.current ?? (focused >= 0 ? focused : null));
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    return () => track.removeEventListener("scroll", update);
  }, [isFunStuff, stream, streamEnd]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement;
      if (isFunStuff && stage.clientWidth >= 700) mousePosition.current = { x: event.clientX, y: event.clientY };
      if (isFunStuff && !event.ctrlKey && !event.metaKey) {
        if (selectedRef.current !== null && (event.deltaX !== 0 || event.deltaY !== 0)) {
          event.preventDefault();
          clearSelection();
          setHovered(null);
          hoveredPhoto.current = null;
          const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? stage.clientHeight : 1;
          trackRef.current?.scrollBy({ top: event.deltaY * unit, behavior: "instant" });
          stage.focus({ preventScroll: true });
        }
        return;
      }
      // Sphere controls leave text, gallery scrolling, and videos alone.
      // Fun stuff must dismiss first, regardless of which project element is under the pointer.
      if (target.closest(".archive-feature-gallery, .archive-sphere-caption, video")) return;
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
  }, [pitch, yaw, zoom, smoothPitch, smoothYaw, smoothZoom, reduceMotion, isFunStuff, clearSelection]);

  const updateReturnFlight = () => {
    const flight = returnFlight.current;
    if (!flight) return;
    const card = photoRefs.current[flight.index];
    const destination = card?.getBoundingClientRect();
    if (!destination || !card) return;
    const progress = clamp((performance.now() - flight.started) / 400, 0, 1);
    const ease = 1 - (1 - progress) ** 3;
    // Use the scene's actual projection, rather than estimating rotated bounds.
    // Both elements then share identical corners at the handoff, even while scrolling.
    const scene = stageRef.current?.querySelector<HTMLElement>(".archive-sphere-scene");
    if (!scene) return;
    const sceneBounds = scene.getBoundingClientRect();
    const perspective = parseFloat(getComputedStyle(scene).perspective);
    const projection = new DOMMatrix();
    projection.m34 = -1 / perspective;
    const destinationMatrix = new DOMMatrix()
      .translate(sceneBounds.left + sceneBounds.width / 2 - flight.from.left - flight.from.width / 2,
        sceneBounds.top + sceneBounds.height / 2 - flight.from.top - flight.from.height / 2)
      .multiply(projection)
      .multiply(isFunStuff ? new DOMMatrix().scale(smoothZoom.get())
        : new DOMMatrix(getComputedStyle(card.parentElement!).transform))
      .multiply(new DOMMatrix(getComputedStyle(card).transform))
      .scale(parseFloat(getComputedStyle(card).width) / flight.contentWidth, parseFloat(getComputedStyle(card).height) / flight.contentHeight);
    const identity = new DOMMatrix().toFloat64Array();
    const target = destinationMatrix.toFloat64Array();
    const transform = Array.from(target, (value, index) => identity[index] + (value - identity[index]) * ease);
    flight.element.style.transformOrigin = "50% 50%";
    flight.element.style.translate = "none";
    flight.element.style.scale = "none";
    flight.element.style.transform = `matrix3d(${transform.join(",")})`;
    // Keep one image visible, instead of crossfading two translucent copies.
    // Hold the completed projection until AnimatePresence removes the overlay.
    const destinationOpacity = Number(card.style.opacity);
    flight.element.style.opacity = String(1 + (destinationOpacity - 1) * ease);
    card.style.visibility = "hidden";
    card.style.pointerEvents = "none";
  };

  useAnimationFrame((time, delta) => {
    if (document.hidden) return;
    if (isFunStuff) {
      const offset = stream.get();
      photos.forEach((photo, index) => {
        const card = photoRefs.current[index];
        if (!card) return;
        const depth = [80, -140, 20, -220][index % 4];
        const y = index * streamStep - offset + stageSize.height * 0.05;
        // Keep geometry available for entry/exit, but don't animate distant cards.
        if (Math.abs(y) > stageSize.height * 0.9 + 480 && index !== selectedRef.current && index !== returning) {
          if (!offscreenCards.current.has(index)) {
            card.style.opacity = "0";
            card.style.pointerEvents = "none";
            offscreenCards.current.add(index);
          }
          return;
        }
        offscreenCards.current.delete(index);
        const x = Math.sin(index * 2.1 - 0.8) * Math.min(stageSize.width * (stageSize.width < 700 ? 0.13 : 0.28), 260);
        const float = reduceMotion ? 0 : Math.sin(time / 2200 + index * 1.7) * 8;
        const tilt = reduceMotion ? 0 : Math.sin(index * 1.9) * 12;
        card.style.transform = `translate3d(${x}px, ${y + float}px, ${depth}px) rotateY(${tilt}deg) rotateZ(${tilt * 0.3}deg)`;
        const opacity = clamp((stageSize.height * 0.7 - Math.abs(y)) / 120, 0, 1);
        card.style.opacity = String(opacity * (depth < -100 ? 0.78 : 1));
        card.style.pointerEvents = opacity > 0.15 ? "auto" : "none";
      });
      updateReturnFlight();
      // Re-hit-test after moving the cards: scrolling need not move the mouse.
      const pointer = mousePosition.current;
      if (stageSize.width >= 700 && selectedRef.current === null && !returnFlight.current && !drag.current) {
        const hit = pointer ? document.elementFromPoint(pointer.x, pointer.y)?.closest(".archive-sphere-photo") : null;
        const index = photoRefs.current.findIndex((card) => card === hit);
        const focused = photoRefs.current.findIndex((card) => card === document.activeElement);
        const next = index >= 0 ? index : focused >= 0 ? focused : scrollTitle.current;
        if (next !== hovered) {
          if (hoverLeaveTimer.current) clearTimeout(hoverLeaveTimer.current);
          hoverLeaveTimer.current = null;
          hoveredPhoto.current = next;
          setHovered(next);
        }
      }
      // Project the hovered card into screen space; labels keep a constant size
      // and stay upright independently of perspective, tilt, and zoom.
      const stage = stageRef.current;
      if (stage) {
        const frame = stage.getBoundingClientRect();
        const mobile = frame.width < 700;
        const ending = endRef.current;
        if (ending) {
          const lastCard = photoRefs.current[PHOTO_COUNT - 1]?.getBoundingClientRect();
          if (mobile && lastCard && offset > (PHOTO_COUNT - 4) * streamStep) {
            ending.style.top = `${lastCard.bottom - frame.top + 40}px`;
          } else {
            ending.style.removeProperty("top");
          }
        }
        hoverTitleRefs.current.forEach((label, index) => {
          const card = photoRefs.current[index];
          // Keep outgoing labels attached throughout their fade, too.
          if (!label || !card || (index !== hovered && Number(label.style.opacity) <= 0)) return;
          const bounds = card.getBoundingClientRect();
          const alignRight = bounds.left + bounds.width / 2 > frame.left + frame.width / 2;
          const room = alignRight ? bounds.left - frame.left - 32 : frame.right - bounds.right - 32;
          label.style.maxWidth = `${mobile ? Math.min(bounds.width, frame.width - 24) : Math.max(80, Math.min(260, room))}px`;
          const left = mobile ? bounds.left - frame.left : alignRight ? bounds.left - frame.left - label.offsetWidth - 20 : bounds.right - frame.left + 20;
          label.style.left = `${clamp(left, 12, Math.max(12, frame.width - label.offsetWidth - 12))}px`;
          const top = bounds.top - frame.top + (mobile ? -label.offsetHeight - 12 : 12);
          label.style.top = `${mobile ? top : Math.max(12, top)}px`;
          label.style.visibility = "visible";
        });
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
    updateReturnFlight();
  });


  const freezeRotation = () => {
    const currentYaw = smoothYaw.get();
    const currentPitch = smoothPitch.get();
    yaw.jump(currentYaw);
    pitch.jump(currentPitch);
    smoothYaw.jump(currentYaw);
    smoothPitch.jump(currentPitch);
  };

  const focusPhoto = (index: number, imageIndex = rememberedViews[index] ?? 0) => {
    if (ignoreClick.current) return;
    if (selected === index) {
      clearSelection();
      return;
    }

    if (selectedRef.current !== null) {
      const previous = selectedRef.current;
      setRememberedViews((current) => ({ ...current, [previous]: galleryIndex }));
    }
    const openingCard = photoRefs.current[index];
    if (openingCard) resetTilt(openingCard);
    setHovered(null);
    setReturning(null);
    returnFlight.current = null;
    hoveredPhoto.current = null;
    selectedRef.current = index;
    freezeRotation();
    const bounds = photoRefs.current[index]?.getBoundingClientRect();
    const stage = stageRef.current?.getBoundingClientRect();
    if (bounds && stage) setOrigin({ left: bounds.left - stage.left, top: bounds.top - stage.top, width: bounds.width, height: bounds.height });
    setGalleryIndex(imageIndex);
    const photo = photos[index];
    if (isFunStuff) {
      setSelected(index);
      return;
    }
    focusTarget.current = { index, yaw: -photo.yaw + 360 * Math.round((yaw.get() + photo.yaw) / 360),
      pitch: -photo.pitch + 360 * Math.round((pitch.get() + photo.pitch) / 360), fromYaw: yaw.get(), fromPitch: pitch.get(), elapsed: 0 };
    setSelected(index);
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (isFunStuff && event.pointerType === "touch") return;
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

  const browsePhoto = (direction: number, enterAtLastImage = false) => {
    const index = selectedRef.current;
    // With no project open, select the current stream item before advancing.
    const next = index === null
      ? (isFunStuff ? clamp(Math.round(stream.get() / streamStep), 0, PHOTO_COUNT - 1) : 0)
      : (index + direction + PHOTO_COUNT) % PHOTO_COUNT;
    if (isFunStuff && trackRef.current) {
      trackRef.current.scrollTo({ top: next * streamStep, behavior: reduceMotion ? "instant" : "smooth" });
    }
    focusPhoto(next, index === null ? undefined : enterAtLastImage ? imageCount(photos[next]) - 1 : 0);
    stageRef.current?.focus({ preventScroll: true });
  };

  const browseSequence = (direction: number) => {
    const project = selectedRef.current;
    if (project === null) {
      browsePhoto(direction);
      return;
    }
    const nextImage = galleryIndex + direction;
    if (nextImage >= 0 && nextImage < imageCount(photos[project])) {
      setGalleryIndex(nextImage);
    } else {
      browsePhoto(direction, direction < 0);
    }
  };

  useEffect(() => {
    if (!isFunStuff) return;
    const navigate = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
      const target = event.target as HTMLElement;
      if (target.closest("input, textarea, select, [contenteditable='true'], video, a, .hamburger")) return;
      event.preventDefault();
      const direction = event.key === "ArrowUp" || event.key === "ArrowLeft" ? -1 : 1;
      if (target.closest(".archive-image-navigation")) {
        stageRef.current?.focus({ preventScroll: true });
      }
      browseSequence(direction);
    };
    window.addEventListener("keydown", navigate);
    return () => window.removeEventListener("keydown", navigate);
  });

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

    if (isFunStuff) {
      trackRef.current?.scrollBy(0, -dy);
      current.startY = event.clientY;
      return;
    }
    yaw.set(current.startYaw + dx * 0.28);
    pitch.set(current.startPitch - dy * 0.28);
  };



  const handleCardTilt = (event: PointerEvent<HTMLButtonElement>) => {
    if (!isFunStuff || returnFlight.current || selectedRef.current !== null || reduceMotion || event.pointerType !== "mouse" || event.buttons !== 0) return;
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
  const selectedImages = selected === null ? [] : photos[selected].gallery[galleryIndex];
  const selectedSrc = selectedImages[0] ?? "";
  const selectedRow = selected !== null && photos[selected].mediaLayout === "row";
  const showThumbnails = !isFunStuff && selected !== null && imageCount(photos[selected]) > 1;
  const showGalleryDots = isFunStuff && selected !== null && imageCount(photos[selected]) > 1;
  const galleryHeight = showThumbnails ? 72 : 0;
  const selectedRatio = selected === null ? 1 : galleryRatio(photos[selected], selectedImages, imageRatios);
  const maxWidth = compact ? stageSize.width - 32 : Math.min(600, stageSize.width * 0.48);
  const maxHeight = compact ? (isFunStuff ? Math.max(120, Math.min(370, stageSize.height * 0.46, stageSize.height - 280)) : stageSize.height * 0.38) : Math.max(100, stageSize.height - galleryHeight - 64);
  // The gallery keeps one frame; individual media contain their natural proportions.
  const mediaWidth = maxWidth;
  const mediaHeight = maxHeight;
  const fittedWidth = Math.min(mediaWidth, mediaHeight * selectedRatio);
  const fittedHeight = fittedWidth / selectedRatio;
  const openingScale = origin.width / fittedWidth;
  const textWidth = compact ? Math.min(300, stageSize.width - 48) : Math.min(310, stageSize.width * 0.28);
  const gap = compact ? 24 : 48;
  const slotLeft = compact ? (stageSize.width - maxWidth) / 2 : (stageSize.width - maxWidth - gap - textWidth) / 2;
  const featureLeft = slotLeft + (maxWidth - mediaWidth) / 2;
  const slotTop = compact ? (isFunStuff ? 24 : 56) : (stageSize.height - maxHeight - galleryHeight) / 2;
  const featureTop = compact && isFunStuff ? slotTop : slotTop + (maxHeight - mediaHeight) / 2;
  const featureBounds = { left: featureLeft, top: featureTop, width: mediaWidth, height: mediaHeight };
  const captionPosition = { left: compact ? (stageSize.width - textWidth) / 2 : slotLeft + maxWidth + gap,
    top: compact ? (isFunStuff ? featureTop + mediaHeight + galleryHeight + 48 : slotTop + maxHeight + galleryHeight + gap + 24) : slotTop + maxHeight / 2,
    width: textWidth };

  const cardWidth = isFunStuff ? (compact ? clamp(stageSize.width * 0.50, 142, 208) : clamp(stageSize.width * 0.24, 110, 245)) : clamp(radius * 0.35, 36, 150);

  return (
    <>
    <motion.div className="archive-intro"
      animate={{ opacity: selected !== null ? 0 : 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
      aria-hidden={selected !== null ? true : undefined}
      style={isFunStuff ? { y: introStreamY } : undefined}>
      <motion.p className="body-l" style={{ opacity: isFunStuff ? introStreamOpacity : introZoomOpacity }}>Like any designer, I have a bunch of fun, weird, old and unfinished projects. I have bundled them together here for anyone who might be interested. </motion.p>
      {isFunStuff && !compact && <motion.p className="archive-keyboard-hint body-s" style={{ opacity: introStreamOpacity }}><span>scroll or use arrows to navigate</span></motion.p>}
    </motion.div>
    <div ref={trackRef} className={isFunStuff ? "archive-fun-stuff-track" : "archive-sphere-track"}>
    <section
      ref={stageRef}
      className={`archive-sphere-screen${isFunStuff ? " archive-fun-stuff-screen" : ""}`}
      aria-label={isFunStuff ? "Floating project stream. Scroll to explore. Select an image to read about it. Escape closes details." : "Photo sphere. Drag, scroll with two fingers, or use arrow keys to rotate. Pinch to zoom. Select a photo to read about it. Press Escape to return."}
      tabIndex={0}
      onTouchStartCapture={(event) => {
        if (isFunStuff && compact && event.touches.length === 1) {
          streamTouch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }
      }}
      onTouchMoveCapture={(event) => {
        const start = streamTouch.current;
        if (!start || event.touches.length !== 1) return;
        const dx = event.touches[0].clientX - start.x;
        const dy = event.touches[0].clientY - start.y;
        if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx) * 1.2) {
          // Let the same native scroll gesture continue through the stream.
          clearSelection();
          gallerySwipe.current = null;
          streamTouch.current = null;
        }
      }}
      onTouchEndCapture={() => { streamTouch.current = null; }}
      onTouchCancelCapture={() => { streamTouch.current = null; }}
      onPointerDown={handlePointerDown}
      onPointerMoveCapture={(event) => {
        if (event.pointerType === "mouse") mousePosition.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onLostPointerCapture={handlePointerEnd}
      onPointerLeave={() => { mousePosition.current = null; if (drag.current && !drag.current.moved) drag.current = null; }}
      onClick={() => { if (!ignoreClick.current) clearSelection(); }}
      onKeyDown={(event) => {
        if (event.key === "Escape") clearSelection();
        // The window handler also works before the user focuses the stream.
        if (isFunStuff && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
        if (isFunStuff && ["PageUp", "PageDown", "Home", "End"].includes(event.key)) {
          event.preventDefault();
          if (selectedRef.current !== null) clearSelection();
          const top = event.key === "Home" ? 0 : event.key === "End" ? streamEnd
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
          style={isFunStuff ? { scale: smoothZoom } : { transform: sphereTransform }}
        >
          {radius > 0 && photos.map((photo, index) => {
            const visited = selected === index || rememberedViews[index] !== undefined;
            const viewIndex = selected === index ? galleryIndex : rememberedViews[index] ?? 0;
            const cardImages = photo.gallery[viewIndex];
            const source = visited ? cardImages[0] : photo.src;
            const grouped = visited && cardImages.length > 1 && photo.mediaLayout !== "row";
            const preview = previews[source];
            const nearViewport = !isFunStuff || Math.abs(index - streamIndex) <= Math.ceil(stageSize.height * 0.75 / streamStep) + 1;
            const showMedia = nearViewport || selected === index || returning === index;
            const animated = /\.(gif|mp4)$/i.test(source);
            const cardSrc = source === photo.src && compact && photo.mobilePreview
              ? (reduceMotion ? photo.videoPoster! : photo.mobilePreview)
              : reduceMotion && preview?.poster ? preview.poster : visited && !animated ? source : preview?.src ?? source;
            const ratio = galleryRatio(photo, grouped ? cardImages : [source], imageRatios);
            const width = Math.min(cardWidth * 1.35, cardWidth * 1.4 * ratio);
            const height = width / ratio;

            return (
              <button
                key={photo.src}
                ref={(element) => { photoRefs.current[index] = element; }}
                className={`archive-sphere-photo${isFunStuff ? " t-tilt" : ""}${returning === index ? " is-returning" : ""}`}
                type="button"
                aria-label={`View ${photo.title}`}
                aria-pressed={selected === index}
                aria-describedby={selected === index ? "archive-photo-details" : undefined}
                onFocus={() => {
                  if (isFunStuff) { setHovered(index); }
                  if (isFunStuff && trackRef.current) {
                    const top = index * streamStep;
                    if (Math.abs(stream.get() - index * streamStep) > stageSize.height * 0.4) trackRef.current.scrollTo({ top, behavior: reduceMotion ? "instant" : "smooth" });
                  }
                }}
                onBlur={() => { if (isFunStuff) setHovered(null); }}
                onPointerMove={handleCardTilt}
                onPointerDown={(event) => { if (isFunStuff) resetTilt(event.currentTarget); }}
                onPointerCancel={(event) => { if (isFunStuff) resetTilt(event.currentTarget); }}
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
                  if (isFunStuff) resetTilt(event.currentTarget);
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
                  visibility: selected === index || returning === index ? "hidden" : "visible",
                  width,
                  height,
                  marginLeft: -width / 2,
                  marginTop: -height / 2,
                  transform: `translate3d(${photo.x * radius}px, ${-photo.y * radius}px, ${photo.z * radius}px) rotateY(${photo.yaw}deg) rotateX(${photo.pitch}deg)`,
                }}
              >
                {isFunStuff && compact && (
                  <motion.span className="archive-mobile-card-title" aria-hidden="true"
                    initial={false} animate={{ opacity: hovered === index && selected === null ? 1 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
                    style={{ transform: reduceMotion ? "none" : `rotateZ(${-Math.sin(index * 1.9) * 3.6}deg) rotateY(${-Math.sin(index * 1.9) * 12}deg)` }}>
                    {photo.title}
                  </motion.span>
                )}
                <motion.span
                  className="archive-sphere-photo-inner"
                  animate={{ scale: !isFunStuff && hovered === index && !reduceMotion ? 1.045 : 1 }}
                  transition={isFunStuff ? { type: "spring", stiffness: 130, damping: 22, duration: reduceMotion ? 0 : undefined } : { duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={isFunStuff ? "t-tilt-card" : "archive-photo-media"}>
                  {showMedia && (photo.mediaLayout === "row" ? <PosterRow images={photo.images} title={photo.title} preview /> : grouped ? (
                    <GalleryImage src={source} sources={cardImages} naturalPairs={photo.naturalPairs} alt="" reducedMotion={!!reduceMotion} />
                  ) : cardSrc.endsWith(".mp4") ? (
                    <video poster={preview?.poster ?? photo.videoPoster} src={cardSrc} muted playsInline loop autoPlay={!reduceMotion} preload="metadata"
                      onLoadedMetadata={(event) => { const video = event.currentTarget; setImageRatios((current) => ({ ...current, [source]: video.videoWidth / video.videoHeight })); }} />
                  ) : (
                    <Image src={cardSrc} alt="" width={600} height={600 / (imageRatios[source] ?? 1)}
                      onLoad={(event) => { const image = event.currentTarget; const ratio = image.naturalWidth / image.naturalHeight;
                        if (ratio > 0) setImageRatios((current) => current[source] === ratio ? current : { ...current, [source]: ratio }); }}
                      loading="eager" unoptimized draggable={false} />
                  ))}
                  {isFunStuff && <span className="t-tilt-glare" aria-hidden="true" />}
                  </span>
                </motion.span>

              </button>
            );
          })}
        </motion.div>
      </div>
      {isFunStuff && !compact && photos.map((photo, index) => (
        <motion.span key={photo.src} ref={(element) => { hoverTitleRefs.current[index] = element; }}
          className="archive-fun-stuff-title body-m" aria-hidden="true"
          initial={false} animate={{ opacity: hovered === index && selected === null ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}>
          {photo.title}
        </motion.span>
      ))}
      <AnimatePresence>
        {isFunStuff && atStreamEnd && selected === null && (
          <motion.div ref={endRef} className="archive-fun-stuff-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }} onPointerDown={(event) => event.stopPropagation()}>
            <p className="body-l">You have reached the end.</p>
            <motion.button type="button" className="body-l underline-link"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.75 }}
              onClick={(event) => {
              event.stopPropagation();
              trackRef.current?.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
              stageRef.current?.focus({ preventScroll: true });
            }}>Go back up?</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence custom={returning !== null} onExitComplete={() => {
        const card = returnFlight.current && photoRefs.current[returnFlight.current.index];
        if (card) card.style.visibility = "visible";
        returnFlight.current = null;
        setReturning(null);
      }}>
        {selected !== null && (
          <motion.div key={selected} className="archive-feature" exit="exit"
            variants={{ exit: (isReturning: boolean) => ({ opacity: isReturning ? 1 : 0, transition: {
              duration: reduceMotion ? 0 : isReturning ? 0.45 : 0.12,
              ease: "easeOut",
            } }) }}
            onPointerDown={(event) => { if (isFunStuff && compact) event.stopPropagation(); }}
            onClick={(event) => { if (isFunStuff && compact) event.stopPropagation(); }}>
            <div className="archive-feature-media-slot">
            <motion.div className="archive-feature-media" initial={reduceMotion ? false : {
                ...featureBounds,
                x: origin.left - featureBounds.left - (mediaWidth - fittedWidth) / 2 * openingScale,
                y: origin.top - featureBounds.top - (mediaHeight - fittedHeight) / 2 * openingScale,
                scaleX: openingScale,
                scaleY: openingScale,
              }}
              animate={{ ...featureBounds, x: 0, y: 0, scaleX: 1, scaleY: 1 }}
              style={{ transformOrigin: "0 0" }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              onPointerDown={(event) => {
                event.stopPropagation();
                if (isFunStuff && event.pointerType === "touch") {
                  gallerySwipe.current = { x: event.clientX, y: event.clientY };
                  suppressGalleryClick.current = false;
                }
              }}
              onPointerUp={(event) => {
                const start = gallerySwipe.current;
                gallerySwipe.current = null;
                if (!start) return;
                const dx = event.clientX - start.x;
                const dy = event.clientY - start.y;
                if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                  suppressGalleryClick.current = true;
                  browseSequence(dx < 0 ? 1 : -1);
                }
              }}
              onPointerCancel={() => { gallerySwipe.current = null; }}
              onClickCapture={(event) => {
                if (suppressGalleryClick.current) {
                  event.preventDefault(); event.stopPropagation(); suppressGalleryClick.current = false;
                }
              }}
              onClick={(event) => event.stopPropagation()}>
              {selectedRow ? <PosterRow images={photos[selected].images} title={photos[selected].title} /> : selectedSrc.endsWith(".mp4") ? (
                <GalleryVideo key={selectedSrc} src={selectedSrc} poster={photos[selected].videoPoster}
                  title={photos[selected].title} reducedMotion={!!reduceMotion}
                  onRatio={(ratio) => setImageRatios((current) => current[selectedSrc] === ratio ? current : { ...current, [selectedSrc]: ratio })} />
              ) : (
                <GalleryImage src={selectedSrc} sources={selectedImages} naturalPairs={photos[selected].naturalPairs} alt={`${photos[selected].title}, view ${galleryIndex + 1}`} reducedMotion={!!reduceMotion} />
              )}
              {(
                <div className="archive-image-navigation" onKeyDown={(event) => {
                  if (isFunStuff) return;
                  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                    event.preventDefault(); event.stopPropagation();
                    browseSequence(event.key === "ArrowLeft" ? -1 : 1);
                  }
                }}>
                  <button type="button" className="archive-image-previous" aria-label={galleryIndex > 0 ? "Previous image" : "Previous project"} onClick={() => browseSequence(-1)}><span aria-hidden="true">←</span></button>
                  <button type="button" className="archive-image-next" aria-label={galleryIndex < imageCount(photos[selected]) - 1 ? "Next image" : "Next project"} onClick={() => browseSequence(1)}><span aria-hidden="true">→</span></button>
                </div>
              )}


            </motion.div>
            </div>
            {showThumbnails && (
              <motion.div className="archive-feature-gallery" role="group" aria-label="Project gallery"
                style={{ left: slotLeft, width: maxWidth }}
                initial={{ opacity: 0, top: featureTop + mediaHeight + 16 }}
                animate={{ opacity: 1, top: featureTop + mediaHeight + 16 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                transition={{ top: { duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }, opacity: { delay: reduceMotion ? 0 : 0.3 } }}
                onPointerDown={(event) => event.stopPropagation()} onClick={(event) => event.stopPropagation()}>
                {photos[selected].gallery.map(([src], index) => (
                  <button key={src} type="button" aria-label={`Show view ${index + 1} of ${imageCount(photos[selected])}`}
                    aria-pressed={galleryIndex === index} onClick={() => setGalleryIndex(index)}>
                    {src.endsWith(".mp4") ? (
                      <video src={src} muted playsInline preload="metadata" aria-hidden="true"
                        onLoadedMetadata={(event) => {
                          const video = event.currentTarget;
                          const ratio = video.videoWidth / video.videoHeight;
                          if (ratio > 0) setImageRatios((current) => current[src] === ratio ? current : { ...current, [src]: ratio });
                        }} />
                    ) : <Image src={src} alt="" width={64} height={48} unoptimized
                      onLoad={(event) => {
                        const image = event.currentTarget;
                        const ratio = image.naturalWidth / image.naturalHeight;
                        if (ratio > 0) setImageRatios((current) => current[src] === ratio ? current : { ...current, [src]: ratio });
                      }} />}
                  </button>
                ))}
              </motion.div>
            )}
            <motion.aside id="archive-photo-details" className="archive-sphere-caption" style={captionPosition}
              initial="hidden" animate="visible" exit="hidden"
              onPointerDown={(event) => event.stopPropagation()} onClick={(event) => event.stopPropagation()}>
              <motion.div className="archive-sphere-caption-backdrop" aria-hidden="true" variants={captionFade} transition={{ duration: 0.25 }} />
              <motion.div variants={captionFade} transition={{ duration: reduceMotion ? 0 : 0.25, delay: reduceMotion ? 0 : 0.15 }}>
                <h2 className="body-l">{photos[selected].title}</h2>
                <p className="body-m">{photos[selected].description}</p>
                {photos[selected].year && <p className="archive-project-year smallcase">{photos[selected].year}</p>}
                {photos[selected].link && <a className="archive-project-link body-m" href={photos[selected].link} target="_blank" rel="noreferrer">visit website</a>}
              {showGalleryDots && (
                <motion.div className="archive-gallery-dots" role="img"
                  aria-label={`Item ${galleryIndex + 1} of ${imageCount(photos[selected])}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}>
                  {photos[selected].gallery.map(([src], index) => (
                    <span key={src} className={index === galleryIndex ? "is-active" : undefined} aria-hidden="true" />
                  ))}
                </motion.div>
              )}
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    {isFunStuff && <div aria-hidden="true" style={{ height: streamEnd }} />}
    </div>
    </>
  );
}
