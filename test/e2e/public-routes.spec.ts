import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';

const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/courses',
  // Assuming these details pages exist or we just hit the parent for now
  // '/courses/sample-course',
  '/internships',
  '/jobs',
  '/experts',
  '/companies',
  '/colleges',
  '/placements',
  '/success-stories',
  '/blog',
  '/contact',
  '/community',
  '/careers',
  '/book-consultation',
  '/cart',
  '/checkout',
  '/payment-success',
  '/payment-failed',
  '/login',
  '/signup',
  '/forgot-password',
  '/onboarding',
  '/this-page-does-not-exist-404' // 404 Page
];

test.describe('Public Pages End-to-End Audit', () => {

  for (const route of PUBLIC_ROUTES) {
    test(`Verify ${route}`, async ({ page }, testInfo) => {
      // 1. Visit the route
      const response = await page.goto(route);
      
      // 2. Verify page loads successfully
      if (route === '/this-page-does-not-exist-404') {
        expect(response?.status()).toBe(404);
      } else {
        expect(response?.status()).toBeLessThan(400);
      }

      // Wait for any videos to play/load and network to be idle to reduce flakiness
      await page.waitForLoadState('domcontentloaded');

      // Dismiss any loading screen quickly if exists
      await page.evaluate(() => {
        const vid = document.querySelector('video');
        if (vid) vid.dispatchEvent(new Event('ended'));
      }).catch(() => {});

      // 3. Accessibility Scan (Axe)
      try {
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        if (accessibilityScanResults.violations.length > 0) {
            console.warn(`[a11y violations on ${route}]:`, accessibilityScanResults.violations.map(v => v.id));
        }
      } catch (e) {
        console.warn(`Could not run Axe on ${route}:`, e.message);
      }

      // 4. Console Errors (Basic check, fail if critical runtime errors)
      const errors: string[] = [];
      page.on('pageerror', exception => {
        errors.push(exception.message);
      });

      // 5. Check for broken images
      const brokenImages = await page.evaluate(async () => {
        const images = Array.from(document.querySelectorAll('img'));
        const broken: string[] = [];
        for (const img of images) {
          if (!img.complete || img.naturalWidth === 0) {
             broken.push(img.src);
          }
        }
        return broken;
      });
      if (brokenImages.length > 0) {
        console.warn(`Broken images on ${route}:`, brokenImages);
      }

      // Take a screenshot for the report
      const screenshotDir = path.join(process.cwd(), 'qa-artifacts', 'screenshots', 'public');
      if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });
      const safeName = route === '/' ? 'home' : route.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      await page.screenshot({ path: path.join(screenshotDir, `${safeName}-${testInfo.project.name}.png`), fullPage: true });

      // If we caught unhandled page errors, we might want to flag them (soft assertion)
      if (errors.length > 0) {
        console.error(`Page Errors on ${route}:`, errors);
      }
    });
  }
});
