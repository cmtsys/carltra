// Run with node scripts/generate-fun-stuff-previews.mjs (requires ffmpeg).
// Originals and opened-project media are never overwritten.
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const source = await fs.readFile('lib/archive.ts', 'utf8');
const projects = JSON.parse('[' + source.split('= [')[1].split(/;\s*$/)[0]);
const manifest = {};
for (const project of projects) {
  const sources = project.mediaLayout === 'row' ? project.images : [project.images[0]];
  for (const src of sources) {
    const input = 'public' + src;
    const ext = path.extname(src).toLowerCase();
    const name = path.basename(src, path.extname(src));
    const folder = path.dirname(src) + '/previews';
    await fs.mkdir('public' + folder, { recursive: true });
    const output = folder + '/' + name + (ext === '.mp4' ? '.mp4' : ext === '.gif' ? '.gif' : '.webp');
    let width, height;
    if (ext === '.mp4' || ext === '.gif') {
      const probe = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'json', input]));
      ({ width, height } = probe.streams[0]);
      const args = ['-hide_banner', '-loglevel', 'error', '-y'];
      if (ext === '.mp4') {
        if (project.title === 'Stomata') args.push('-ss', '24');
        args.push('-t', '20', '-i', input, '-an', '-vf', "scale=480:-2,fps=15", '-c:v', 'libx264', '-crf', '28', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart');
      } else {
        const detailed = project.title === 'Error 445' || project.title === 'Variable type';
        const size = detailed ? 240 : 320;
        const fps = project.title === 'Error 445' ? 16 : detailed ? 8 : 10;
        const colors = detailed ? 32 : 96;
        args.push('-i', input, '-filter_complex', `[0:v]fps=${fps},scale=${size}:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=${colors}:stats_mode=diff[p];[b][p]paletteuse=dither=none:diff_mode=rectangle`, '-loop', '0');
      }
      execFileSync('ffmpeg', [...args, 'public' + output]);
      const poster = folder + '/' + name + '.jpg';
      execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', 'public' + output, '-frames:v', '1', 'public' + poster]);
      manifest[src] = { src: output, width, height, poster };
    } else {
      ({ width, height } = await sharp(input).metadata());
      await sharp(input).rotate().resize({ width: 600, withoutEnlargement: true }).webp({ quality: 78 }).toFile('public' + output);
      manifest[src] = { src: output, width, height };
    }
  }
}
await fs.writeFile('lib/archive-previews.json', JSON.stringify(manifest, null, 2) + '\n');
