// Combines before.png + after.png into a labelled side-by-side image.
// Run: node scripts/buildComparison.mjs
import sharp from "sharp";

const PANEL_W = 760;
const BANNER = 70;
const GAP = 40;
const PAD = 40;
const LABEL_GAP = 14;

const resize = (file) =>
  sharp(file).resize({ width: PANEL_W }).toBuffer({ resolveWithObject: true });

const before = await resize("comparison/before.png");
const after = await resize("comparison/after.png");

const bH = before.info.height;
const aH = after.info.height;
const maxH = Math.max(bH, aH);

const canvasW = PAD * 2 + PANEL_W * 2 + GAP;
const canvasH = PAD * 2 + BANNER + LABEL_GAP + maxH;

const label = (text, color) =>
  Buffer.from(
    `<svg width="${PANEL_W}" height="${BANNER}">
       <rect width="100%" height="100%" rx="14" fill="${color}"/>
       <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="34"
             font-weight="bold" fill="white" text-anchor="middle"
             dominant-baseline="central" letter-spacing="2">${text}</text>
     </svg>`
  );

const imgTop = PAD + BANNER + LABEL_GAP;
const rightX = PAD + PANEL_W + GAP;

await sharp({
  create: {
    width: canvasW,
    height: canvasH,
    channels: 3,
    background: "#f3f4f6",
  },
})
  .composite([
    { input: label("BEFORE", "#6b7280"), top: PAD, left: PAD },
    { input: before.data, top: imgTop, left: PAD },
    { input: label("AFTER", "#f97316"), top: PAD, left: rightX },
    { input: after.data, top: imgTop, left: rightX },
  ])
  .png()
  .toFile("comparison/before-after.png");

console.log("saved comparison/before-after.png");
