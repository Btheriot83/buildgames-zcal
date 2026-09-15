import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const out = process.argv[2];
const url = process.argv[3];
const cssPath = process.argv[4];
const waitMs = Number(process.argv[5] || 2200);
const full = process.argv[6] === 'full';

fs.mkdirSync(path.dirname(out), { recursive: true });
const css = cssPath ? fs.readFileSync(cssPath, 'utf8') : '';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(waitMs);
if (css) await page.addStyleTag({ content: css });
await page.waitForTimeout(400);
await page.screenshot({ path: out, fullPage: full, type: 'png' });
await browser.close();
console.log('wrote', out, fs.statSync(out).size);
