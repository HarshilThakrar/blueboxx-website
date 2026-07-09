import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const ROLES = [
  { key: 'student', pathPrefix: '/student' },
  { key: 'admin', pathPrefix: '/admin' },
  { key: 'companies', pathPrefix: '/company' },
  { key: 'expert', pathPrefix: '/expert' },
  { key: 'colleges', pathPrefix: '/college' },
  { key: 'intern', pathPrefix: '/intern' },
  { key: 'jobseeker', pathPrefix: '/jobseeker' }
];

const reportData = {
  totalPages: 0,
  passedPages: 0,
  failedPages: 0,
  consoleErrors: [],
  networkErrors: [],
  pages: []
};

// Disable parallel execution within this file so we can accumulate the report
test.describe.configure({ mode: 'serial' });

test.describe('Automated QA Audit Crawler', () => {

  for (const role of ROLES) {
    test(`Crawl Portal: ${role.key}`, async ({ page }) => {
      // Set longer timeout for crawling entire portal
      test.setTimeout(120000); 
      
      const errors = [];
      const networkFails = [];
      
      page.on('pageerror', exception => {
        errors.push(`[${role.key}] ${exception.message}`);
        reportData.consoleErrors.push({ role: role.key, type: 'PageError', message: exception.message });
      });

      page.on('response', response => {
        if (response.status() >= 400 && response.url().startsWith('http://localhost:3000')) {
          networkFails.push(`[${role.key}] ${response.status()} on ${response.url()}`);
          reportData.networkErrors.push({ role: role.key, status: response.status(), url: response.url() });
        }
      });

      // 1. Visit homepage to set origin for localStorage
      await page.goto('/');
      
      // Dismiss any loading screen quickly
      await page.evaluate(() => {
        const vid = document.querySelector('video');
        if (vid) vid.dispatchEvent(new Event('ended'));
      });

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
        // Dismiss tour
        localStorage.setItem("bb_student_tour_done", "1");
      }, role.key);

      // 3. Navigate to Dashboard
      const dashboardUrl = `${role.pathPrefix}/dashboard`;
      await page.goto(dashboardUrl);
      
      await page.evaluate(() => {
        const vid = document.querySelector('video');
        if (vid) vid.dispatchEvent(new Event('ended'));
      });
      
      // Wait for sidebar to load
      try {
        await page.waitForSelector('aside a', { timeout: 10000 });
      } catch (e) {
        console.log(`[${role.key}] Sidebar not found or dashboard doesn't exist.`);
        reportData.failedPages++;
        reportData.pages.push({ url: dashboardUrl, status: 'Failed - No Sidebar', role: role.key });
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
        reportData.totalPages++;
        console.log(`Testing ${link}...`);
        
        try {
          await page.goto(link);
          await page.evaluate(() => {
            const vid = document.querySelector('video');
            if (vid) vid.dispatchEvent(new Event('ended'));
          });
          
          // Wait for main content to load
          await page.waitForLoadState('networkidle', { timeout: 10000 });
          
          // Take screenshot
          const screenshotDir = path.join(process.cwd(), 'qa-artifacts', 'screenshots', role.key);
          if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });
          
          const safeName = link.replace(/[^a-z0-9]/gi, '_').toLowerCase();
          await page.screenshot({ path: path.join(screenshotDir, `${safeName}.png`), fullPage: true });

          // Basic interaction test (click first button if exists to catch handlers)
          const buttons = await page.$$('button');
          if (buttons.length > 0) {
             // Just checking if querying works, clicking random buttons might submit forms
             // which is destructive. We'll just assert it didn't crash.
          }

          reportData.passedPages++;
          reportData.pages.push({ url: link, status: 'Passed', role: role.key });
        } catch (err) {
          reportData.failedPages++;
          reportData.pages.push({ url: link, status: `Failed: ${err.message}`, role: role.key });
        }
      }
    });
  }

  test('Save QA Report Data', async () => {
    const reportPath = path.join(process.cwd(), 'qa-artifacts');
    if (!fs.existsSync(reportPath)) fs.mkdirSync(reportPath, { recursive: true });
    
    fs.writeFileSync(
      path.join(reportPath, 'raw-report.json'), 
      JSON.stringify(reportData, null, 2)
    );
  });
});
