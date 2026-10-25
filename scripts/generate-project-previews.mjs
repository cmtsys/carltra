// Run: node scripts/generate-project-previews.mjs (requires ffmpeg).
// Card-only derivatives. Original project media stays untouched.
import { mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const folder = 'public/img/project-previews';
mkdirSync(folder, { recursive: true });
for (const [name, source, fps, width, crf] of [
  ['remarkable', 'public/img/rmgif.gif', 10, 800, 27],
  ['kote', 'public/img/kote/kote14/kote14-card.mp4', 20, 720, 30],
]) {
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', source,
    '-an', '-vf', `scale=${width}:-2:flags=lanczos,fps=${fps}`, '-c:v', 'libx264',
    '-preset', 'slow', '-crf', String(crf), '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    `${folder}/${name}.mp4`]);
  const frame = execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error',
    '-i', `${folder}/${name}.mp4`, '-frames:v', '1', '-f', 'image2pipe', '-c:v', 'png', '-']);
  await sharp(frame).webp({ quality: 82 }).toFile(`${folder}/${name}.webp`);
}
