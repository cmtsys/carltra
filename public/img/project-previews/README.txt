LANDING-PAGE CARD PREVIEWS

Generated from the original files; case-study media is unchanged.
Regenerate with: node scripts/generate-project-previews.mjs
Requires ffmpeg plus the sharp package available with the project's dependencies.

remarkable.mp4: full 10.2-second sequence, 800px wide, 10fps, H.264 CRF 27.
kote.mp4: full 21.28-second sequence, 720px wide, 20fps, H.264 CRF 30.
Both are silent, fast-start MP4s. WebP covers are their first frames.

lib/projects.ts selects the preview and cover through cardPreview.
ProjectCardVideo.tsx loads video within 240px of the viewport, plays only while
visible in an active tab, and unloads it farther away. Reduced Motion or blocked
autoplay shows the static cover. The card remains a link to the project.
