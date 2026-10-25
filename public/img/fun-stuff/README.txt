FUN STUFF MEDIA

Place your original files in the matching project folder.
Use 01-name.jpg, 02-name.jpg, etc. to indicate gallery order.
The first item listed in lib/archive.ts is the cover shown in the stream.
Keep the real file extension.
Mobile video cards use generated preview.gif files; opened projects retain the MP4.
Reduce Motion uses cover.jpg instead. Originals are unchanged.
Previews (all without dithering, generated from the original MP4s):
Stomata: seconds 24–44, 320px wide, 10fps, 128 colors.
Rosa: seconds 0–13, 280px wide, 8fps, 64 colors.
Action: seconds 0–13, 280px wide, 8fps, 32 colors.
Existing filenames are also fine; tell us if the intended order is unclear.

Card-only assets live in each project's previews/ folder. The generated mapping
and dimensions are in lib/archive-previews.json. Opened projects use originals.
Regenerate these assets with: node scripts/generate-fun-stuff-previews.mjs
Requires ffmpeg/ffprobe; uses the installed sharp package. This does not regenerate
the three hand-tuned mobile preview.gif files described above.
The stream mounts media only near the viewport and unloads it farther away.

Tell Codex when a batch is ready. It will inspect the files, update lib/archive.ts,
and verify the gallery. Adding files alone does not update the site.
