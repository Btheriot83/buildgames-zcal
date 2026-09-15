import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

const base = process.env.DEMO_URL || "https://buildgames-zcal.vercel.app";
const out = path.resolve("docs");
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const log = [];

async function shot(name) {
  const p = path.join(out, name);
  await page.screenshot({ path: p, fullPage: false });
  log.push(`shot ${name}`);
}

await page.goto(base + "/", { waitUntil: "networkidle" });
log.push(`home status title=${await page.title()}`);
await shot("live-home.png");

await page.goto(base + "/desk", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
const deskText = await page.locator("h1.display").first().textContent();
log.push(`desk h1=${deskText}`);
await shot("live-desk.png");

await page.goto(base + "/b/brandon", { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await shot("live-booking.png");

const dayButtons = page.locator(".day-chip");
const dayCount = await dayButtons.count();
log.push(`day chips=${dayCount}`);
let booked = false;
for (let i = 0; i < dayCount; i++) {
  const label = await dayButtons.nth(i).textContent();
  await dayButtons.nth(i).click();
  await page.waitForTimeout(200);
  const slots = page.locator(".slot-chip");
  const n = await slots.count();
  if (n > 0) {
    log.push(`picked day=${label?.trim()} slots=${n}`);
    await slots.nth(0).click();
    await page.fill('input[autocomplete="name"]', "App Desk Smoke");
    await page.fill('input[type="email"]', "smoke@buildgames.test");
    await page.fill("textarea.t-input", "Live smoke booking");
    await page.getByRole("button", { name: "Reserve slot" }).click();
    await page.waitForTimeout(800);
    const success = await page.locator("text=You're on the sundial").count();
    log.push(`success pane=${success > 0}`);
    await shot("live-success.png");
    booked = success > 0;
    break;
  }
}

await page.goto(base + "/desk", { waitUntil: "networkidle" });
await page.waitForTimeout(700);
const cal = await page.locator(".event-card").count();
log.push(`calendar events after book=${cal}`);
await shot("live-calendar.png");

await page.goto("https://zcal.co/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(1500);
await shot("original-zcal-home.png");
const zcalTitle = await page.title();
log.push(`zcal title=${zcalTitle}`);

await browser.close();
fs.writeFileSync(path.join(out, "live-smoke-log.json"), JSON.stringify({ base, booked, log, at: new Date().toISOString() }, null, 2));
console.log(JSON.stringify({ booked, log }, null, 2));
if (!booked) process.exit(2);
