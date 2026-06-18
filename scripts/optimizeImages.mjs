// Compresses the oversized PNG/JPG files in public/images.
// Originals are backed up once to public/images/_originals/.
// Run:  node scripts/optimizeImages.mjs
import sharp from "sharp";
import fs from "fs";
import path from "path";

const DIR = "public/images";
const BACKUP = path.join(DIR, "_originals");
const MAX_WIDTH = 1400; // no displayed image is wider than this
const SIZE_THRESHOLD = 600 * 1024; // only touch files over ~600KB

fs.mkdirSync(BACKUP, { recursive: true });

const files = fs
  .readdirSync(DIR)
  .filter((f) => /\.(png|jpe?g)$/i.test(f));

let savedTotal = 0;

for (const file of files) {
  const src = path.join(DIR, file);
  const stat = fs.statSync(src);
  if (stat.size < SIZE_THRESHOLD) continue;

  const backupPath = path.join(BACKUP, file);
  if (!fs.existsSync(backupPath)) fs.copyFileSync(src, backupPath);

  const ext = path.extname(file).toLowerCase();
  const input = fs.readFileSync(backupPath); // always from pristine original

  let pipeline = sharp(input).resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
  });

  if (ext === ".png") {
    pipeline = pipeline.png({ quality: 80, compressionLevel: 9, palette: true });
  } else {
    pipeline = pipeline.jpeg({ quality: 78, mozjpeg: true });
  }

  const out = await pipeline.toBuffer();
  fs.writeFileSync(src, out);

  const before = (stat.size / 1024 / 1024).toFixed(2);
  const after = (out.length / 1024 / 1024).toFixed(2);
  savedTotal += stat.size - out.length;
  console.log(`${file}: ${before}MB → ${after}MB`);
}

console.log(
  `\nDone. Total saved: ${(savedTotal / 1024 / 1024).toFixed(2)}MB`
);
console.log("Originals backed up in public/images/_originals/");
