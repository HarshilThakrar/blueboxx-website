import { test, expect, devices } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Mobile and Tablet configurations
const viewports = [
  { name: 'iPhone 14 Pro', device: devices['iPhone 14 Pro'] },
  { name: 'iPad Pro', device: devices['iPad Pro 11'] }
];

const ROLES = [
  { key: 'student', pathPrefix: '/student' },
  { key: 'companies', pathPrefix: '/company' }
  // To keep it fast for mobile testing, we'll test the two most critical portals: Student and Company.
];

const reportData = {
  totalPages: 0,
  passedPages: 0,
  failedPages: 0,
  consoleErrors: [],
  networkErrors: [],
  pages: []
};

test.describe.configure({ mode: 'serial' });

test.describe('Automated Mobile Responsiveness QA', () => {

  for (const vp of viewports) {
    for (const role of ROLES) {
      test(`Mobile Crawl: ${role.key} on ${vp.name}`, async ({ browser }) => {
        test.setTimeout(120000); 
        
        // Launch context with specific mobile device parameters
        const context = await browser.newContext({
          ...vp.device
        });
        const page = await context.newPage();
        
        const errors = [];
        const networkFails = [];
        
        page.on('pageerror', exception => {
          reportData.consoleErrors.push({ role: role.key, viewport: vp.name, message: exception.message });
        });

        page.on('response', response => {
          if (response.status() >= 400 && response.url().startsWith('http://localhost:3000')) {
            reportData.networkErrors.push({ role: role.key, viewport: vp.name, status: response.status(), url: response.url() });
          }
        });

        await page.goto('/');
        
        await page.evaluate(() => {
          const vid = document.querySelector('video');
          if (vid) vid.dispatchEvent(new Event('ended'));
        });

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

        const dashboardUrl = `${role.pathPrefix}/dashboard`;
        await page.goto(dashboardUrl);
        
        await page.evaluate(() => {
          const vid = document.querySelector('video');
          if (vid) vid.dispatchEvent(new Event('ended'));
        });
        
        // Mobile sidebars are often hidden behind a hamburger menu!
        // We'll try to find any navigation links, including the bottom nav or mobile menu.
        // First, check if there's a hamburger button (generic check)
        const hamburgerButtons = await page.$$('button:has(svg.lucide-menu)');
        if (hamburgerButtons.length > 0) {
          try {
             await hamburgerButtons[0].click();
             await page.waitForTimeout(500); // Wait for menu animation
          } catch(e) {}
        }

        const links = await page.evaluate(() => {
          const anchors = Array.from(document.querySelectorAll('a'));
          return anchors.map(a => a.getAttribute('href')).filter(href => href && href.startsWith('/'));
        });

        const uniqueLinks = [...new Set([dashboardUrl, ...links])].slice(0, 5); // Limit to top 5 routes to keep it fast

        console.log(`[${role.key} on ${vp.name}] Found ${uniqueLinks.length} routes to test.`);

        for (const link of uniqueLinks) {
          reportData.totalPages++;
          
          try {
            await page.goto(link);
            await page.evaluate(() => {
              const vid = document.querySelector('video');
              if (vid) vid.dispatchEvent(new Event('ended'));
            });
            
            await page.waitForLoadState('networkidle', { timeout: 10000 });
            
            const vpDirName = vp.name.replace(/\s+/g, '_').toLowerCase();
            const screenshotDir = path.join(process.cwd(), 'qa-artifacts', 'mobile_screenshots', vpDirName, role.key);
            if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });
            
            const safeName = link.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'home';
            await page.screenshot({ path: path.join(screenshotDir, `${safeName}.png`), fullPage: true });

            reportData.passedPages++;
            reportData.pages.push({ url: link, status: 'Passed', role: role.key, viewport: vp.name });
          } catch (err) {
            reportData.failedPages++;
            reportData.pages.push({ url: link, status: `Failed`, role: role.key, viewport: vp.name });
          }
        }
        
        await context.close();
      });
    }
  }

  test('Save Mobile QA Report Data', async () => {
    const reportPath = path.join(process.cwd(), 'qa-artifacts');
    fs.writeFileSync(
      path.join(reportPath, 'mobile-report.json'), 
      JSON.stringify(reportData, null, 2)
    );
  });
});
