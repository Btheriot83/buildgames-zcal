import { chromium } from 'playwright';
import fs from 'fs';
const out = process.argv[2] || 'gauntlet/shots-elevate/e6-confirm.png';
const url = process.argv[3] || 'http://127.0.0.1:3210/b/maya';
const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--single-process'],
});
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.setDefaultTimeout(40000);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
  await page.waitForTimeout(2000);
  const chip = page.locator('.slot-chip').first();
  await chip.waitFor({ state: 'visible', timeout: 15000 });
  await chip.click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: out, type: 'png', animations: 'disabled', timeout: 45000 });
  console.log('wrote', out, fs.statSync(out).size);
} finally {
  await browser.close();
}
