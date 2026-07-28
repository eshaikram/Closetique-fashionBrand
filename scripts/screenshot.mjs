// Full-page screenshot of a URL.
// Usage: node scripts/screenshot.mjs <url> <outfile>
import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3000";
const out = process.argv[3] || "shot.png";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

await page.goto(url, { waitUntil: "load", timeout: 60000 });
// let fonts, remote images and entrance animations settle
await page.waitForTimeout(5000);

// scroll through to trigger lazy-loaded images, then return to top
await page.evaluate(async () => {
  await new Promise((resolve) => {
    let y = 0;
    const step = 500;
    const timer = setInterval(() => {
      window.scrollBy(0, step);
      y += step;
      if (y >= document.body.scrollHeight) {
        clearInterval(timer);
        resolve();
      }
    }, 120);
  });
});
await page.waitForTimeout(2500);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1500);

await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log("saved", out);
