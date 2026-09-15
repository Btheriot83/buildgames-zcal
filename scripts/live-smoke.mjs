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
const homeText = await page.locator("main").innerText();
log.push(`home has job=${/Set your hours|Set availability/i.test(homeText)}`);
await shot("live-home.png");

await page.goto(base + "/desk", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
const deskText = await page.locator("h1.display").first().textContent();
log.push(`desk h1=${deskText}`);
await shot("live-desk.png");

await page.goto(base + "/b/maya", { waitUntil: "networkidle" });
await page.waitForTimeout(700);
const host = await page.locator("h1.host-name, h1.display").first().textContent();
log.push(`booking host=${host}`);
await shot("live-booking.png");

const slots = page.locator(".slot-chip");
let booked = false;
const n = await slots.count();
log.push(`slots visible=${n}`);
if (n > 0) {
  await slots.nth(0).click();
  await page.waitForTimeout(200);
  await page.fill('input[autocomplete="name"]', "Elena Vargas");
  await page.fill('input[type="email"]', "elena@desertstudio.co");
  await page.fill("textarea.t-input", "Courtyard intro about the Phoenix launch week.");
  await page.getByRole("button", { name: /Confirm/i }).click();
  await page.waitForTimeout(800);
  const success = await page.locator("text=You're booked").count();
  log.push(`success pane=${success > 0}`);
  await shot("live-success.png");
  booked = success > 0;
} else {
  // try clicking an open day first
  const openDays = page.locator(".cal-day.is-open:not(:disabled)");
  const od = await openDays.count();
  log.push(`open days=${od}`);
  if (od > 0) {
    await openDays.nth(0).click();
    await page.waitForTimeout(250);
    const n2 = await slots.count();
    if (n2 > 0) {
      await slots.nth(0).click();
      await page.fill('input[autocomplete="name"]', "Elena Vargas");
      await page.fill('input[type="email"]', "elena@desertstudio.co");
      await page.getByRole("button", { name: /Confirm/i }).click();
      await page.waitForTimeout(800);
      booked = (await page.locator("text=You're booked").count()) > 0;
      await shot("live-success.png");
    }
  }
}

await page.goto(base + "/desk", { waitUntil: "networkidle" });
await page.waitForTimeout(700);
await shot("live-calendar.png");

await page.goto("https://zcal.co/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(1200);
await shot("original-zcal-home.png");

await browser.close();
fs.writeFileSync(
  path.join(out, "live-smoke-log.json"),
  JSON.stringify({ base, booked, log, at: new Date().toISOString() }, null, 2)
);
console.log(JSON.stringify({ booked, log }, null, 2));
if (!booked) process.exit(2);
