import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
  const assetsDir = path.resolve('public', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  console.log('Launching Playwright Chromium browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  
  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Capture Hero Home Preview
  const heroPath = path.join(assetsDir, 'hero-preview.png');
  await page.screenshot({ path: heroPath, fullPage: false });
  console.log(`Saved Hero preview to ${heroPath}`);

  // 2. Click Create a 3x3 CTA
  await page.click('text="Create a 3×3"');
  await page.waitForTimeout(800);

  // 3. Click Surprise Me to fill a grid
  await page.click('text="Surprise Me"');
  await page.waitForTimeout(1000);

  const workbenchPath = path.join(assetsDir, 'workbench-preview.png');
  await page.screenshot({ path: workbenchPath, fullPage: false });
  console.log(`Saved Workbench preview to ${workbenchPath}`);

  // 4. Click Replace or Slot to trigger reactive search
  const firstSlot = page.locator('.group.relative.aspect-\\[2\\/3\\]').first();
  await firstSlot.hover();
  await page.waitForTimeout(300);
  const replaceBtn = page.locator('text="Replace"').first();
  if (await replaceBtn.isVisible()) {
    await replaceBtn.click();
  }
  await page.waitForTimeout(500);

  const reactivePath = path.join(assetsDir, 'reactive-search-preview.png');
  await page.screenshot({ path: reactivePath, fullPage: false });
  console.log(`Saved Reactive Search preview to ${reactivePath}`);

  await browser.close();
  console.log('Playwright capture complete!');
})();
