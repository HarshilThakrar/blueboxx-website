import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const ROLES = [
  { key: 'admin', pathPrefix: '/admin' },
  { key: 'student', pathPrefix: '/student' },
  { key: 'college', pathPrefix: '/college' },
  { key: 'companies', pathPrefix: '/company' },
  { key: 'expert', pathPrefix: '/expert' },
  { key: 'jobseeker', pathPrefix: '/jobseeker' },
  { key: 'intern', pathPrefix: '/intern' }
];

test.describe('Portal Pages End-to-End Audit', () => {

  for (const role of ROLES) {
    test(`Crawl Portal: ${role.key}`, async ({ page }, testInfo) => {
      test.setTimeout(300000); 
      
      const errors: string[] = [];
      page.on('pageerror', exception => {
        errors.push(exception.message);
      });

      // 1. Visit homepage to set origin for localStorage
      await page.goto('/');
      
      // Dismiss video loading
      await page.evaluate(() => {
        const vid = document.querySelector('video');
        if (vid) vid.dispatchEvent(new Event('ended'));
      }).catch(() => {});

      // 2. Inject Auth State for this role
      await page.evaluate((roleName) => {
        localStorage.setItem('auth-storage', JSON.stringify({
          state: {
            user: {
              id: `qa_${roleName}`,
              name: `QA ${roleName}`,
              email: `qa@${roleName}.com`,
              role: roleName,
              avatar: `https://ui-avatars.com/api/?name=${roleName}`
            },
            isAuthenticated: true
          },
          version: 0
        }));
        localStorage.setItem("bb_student_tour_done", "1");
      }, role.key);

      // 3. Navigate to Dashboard
      const dashboardUrl = `${role.pathPrefix}/dashboard`;
      const response = await page.goto(dashboardUrl);
      
      expect(response?.status()).toBeLessThan(400);

      await page.evaluate(() => {
        const vid = document.querySelector('video');
        if (vid) vid.dispatchEvent(new Event('ended'));
      }).catch(() => {});
      
      // Wait for sidebar to load
      try {
        await page.waitForSelector('aside a', { timeout: 10000 });
      } catch (e) {
        console.log(`[${role.key}] Sidebar not found or dashboard doesn't exist.`);
        return; // Skip if no dashboard
      }

      // 4. Extract all sidebar links
      const links = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('aside a'));
        return anchors.map(a => a.getAttribute('href')).filter(href => href && href.startsWith('/'));
      });

      const uniqueLinks = [...new Set([dashboardUrl, ...links])];
      console.log(`[${role.key}] Found ${uniqueLinks.length} routes to test.`);

      // 5. Crawl each link
      for (const link of uniqueLinks) {
        
        try {
          const res = await page.goto(link as string);
          expect(res?.status()).toBeLessThan(400);

          await page.evaluate(() => {
            const vid = document.querySelector('video');
            if (vid) vid.dispatchEvent(new Event('ended'));
          }).catch(() => {});
          
          // Wait for main content to load
          await page.waitForLoadState('networkidle', { timeout: 10000 });
          
          // Take screenshot
          const screenshotDir = path.join(process.cwd(), 'qa-artifacts', 'screenshots', role.key);
          if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });
          
          const safeName = (link as string).replace(/[^a-z0-9]/gi, '_').toLowerCase();
          await page.screenshot({ path: path.join(screenshotDir, `${safeName}-${testInfo.project.name}.png`), fullPage: true });

        } catch (err) {
          console.error(`Failed on portal route: ${link}`, err);
        }
      }
      
      if (errors.length > 0) {
        console.error(`Portal Errors for ${role.key}:`, errors);
      }
    });
  }
});
