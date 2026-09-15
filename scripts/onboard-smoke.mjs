import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

const base = process.env.DEMO_URL || "http://127.0.0.1:3000";
const outDir = path.resolve("gauntlet/shots-onboard");
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const log = [];

async function shot(name) {
  const p = path.join(outDir, name);
  await page.screenshot({ path: p, type: "png", animations: "disabled" });
  log.push(`shot ${name} (${fs.statSync(p).size}b)`);
}

// --- First visit: complete walkthrough ---
await page.goto(base + "/desk", { waitUntil: "networkidle" });
await page.waitForTimeout(600);
const firstVisible = (await page.locator(".ob-card").count()) > 0;
log.push(`firstVisit.obCard=${firstVisible}`);
await shot("01-first-visit-card1.png");

if (firstVisible) {
  for (let i = 0; i < 5; i++) {
    const title = await page.locator("#ob-title").textContent();
    log.push(`card ${i + 1}: ${title?.trim()}`);
    const linkCta = page.locator("a.ob-cta");
    const btnCta = page.locator("button.ob-cta");
    if ((await linkCta.count()) > 0 && (await linkCta.isVisible())) {
      await shot(`0${i + 2}-card-link.png`);
      await linkCta.click();
      await page.waitForTimeout(700);
      await shot("06-opened-booker.png");
      // return to desk for final card
      await page.goto(base + "/desk", { waitUntil: "networkidle" });
      await page.waitForTimeout(500);
      continue;
    }
    if ((await btnCta.count()) > 0) {
      await shot(`0${i + 2}-card.png`);
      await btnCta.click();
      await page.waitForTimeout(350);
    }
  }
}

const afterComplete = (await page.locator(".ob-card").count()) > 0;
log.push(`afterComplete.obCard=${afterComplete}`);
const doneFlag = await page.evaluate(() => localStorage.getItem("clearline.onboarded.v1"));
log.push(`onboardedFlag=${doneFlag}`);

// booking cards present
await page.goto(base + "/b/maya", { waitUntil: "networkidle" });
await page.waitForTimeout(700);
const hostCard = (await page.locator(".host-card").count()) > 0;
const durCards = await page.locator(".duration-card").count();
const slotCards = await page.locator(".slot-card, .slot-chip").count();
log.push(`booker.hostCard=${hostCard} durationCards=${durCards} slotCards=${slotCards}`);
await shot("07-booker-cards.png");

// --- Skip path (fresh storage) ---
await context.clearCookies();
await page.evaluate(() => localStorage.clear());
await page.goto(base + "/desk", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
const skipVisible = (await page.locator(".ob-card").count()) > 0;
log.push(`skipPath.visible=${skipVisible}`);
if (skipVisible) {
  await page.locator("button.ob-skip").click();
  await page.waitForTimeout(300);
}
const afterSkip = (await page.locator(".ob-card").count()) > 0;
const skipFlag = await page.evaluate(() => localStorage.getItem("clearline.onboarded.v1"));
log.push(`afterSkip.obCard=${afterSkip} flag=${skipFlag}`);
await shot("08-after-skip.png");

// --- Return visit: no replay ---
await page.goto(base + "/desk", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
const returnReplay = (await page.locator(".ob-card").count()) > 0;
log.push(`returnVisit.replay=${returnReplay}`);
await shot("09-return-no-replay.png");

// empty coach
const coach = (await page.locator(".empty-coach").count()) > 0;
log.push(`emptyCoach=${coach}`);

await browser.close();

const result = {
  base,
  ok:
    firstVisible &&
    doneFlag === "1" &&
    !afterComplete &&
    skipFlag === "1" &&
    !afterSkip &&
    !returnReplay &&
    hostCard &&
    durCards >= 3 &&
    slotCards > 0,
  log,
  cardCount: 5,
  activationEvent:
    "A bookable Clearline link the user can open and complete week → slot → confirm",
  at: new Date().toISOString(),
};

fs.writeFileSync(path.join(outDir, "smoke-log.json"), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exit(2);
