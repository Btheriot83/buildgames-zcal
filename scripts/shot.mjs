import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const out = process.argv[2];
const url = process.argv[3];
const waitMs = Number(process.argv[4] || 1000);
const cssPath = process.argv[5] || '';

fs.mkdirSync(path.dirname(out), { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--single-process'],
});
try {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.setDefaultTimeout(40000);
  await page.route('**/*', (route) => {
    if (route.request().resourceType() === 'media') return route.abort();
    return route.continue();
  });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
  await page.waitForTimeout(waitMs);
  if (cssPath && fs.existsSync(cssPath)) {
    await page.addStyleTag({ content: fs.readFileSync(cssPath, 'utf8') });
    await page.waitForTimeout(200);
  }
  await page.evaluate(() => {
    document.querySelectorAll('video').forEach((v) => {
      try { v.pause(); v.removeAttribute('src'); v.load(); } catch {}
    });
  });
  await page.screenshot({ path: out, type: 'png', animations: 'disabled', timeout: 45000 });
  console.log('wrote', out, fs.statSync(out).size);
} finally {
  await browser.close();
}
