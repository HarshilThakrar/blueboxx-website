import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import fs from 'fs';
import path from 'path';

const PORT = 9222;

const ROUTES_TO_AUDIT = [
  { name: 'Homepage', url: 'http://localhost:3000/', requiresAuth: false },
  { name: 'Courses', url: 'http://localhost:3000/courses', requiresAuth: false },
  { name: 'Jobs', url: 'http://localhost:3000/jobs', requiresAuth: false },
  { name: 'Student Dashboard', url: 'http://localhost:3000/student/dashboard', requiresAuth: true, role: 'student' },
  { name: 'Company Dashboard', url: 'http://localhost:3000/company/dashboard', requiresAuth: true, role: 'companies' }
];

async function run() {
  const reportDir = path.join(process.cwd(), 'qa-artifacts', 'lighthouse');
  if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });

  const summary = [];

  for (const route of ROUTES_TO_AUDIT) {
    console.log(`\nStarting Lighthouse audit for: ${route.name} (${route.url})`);
    
    // Launch a new browser instance with debugging port open
    const browser = await chromium.launch({
      args: [`--remote-debugging-port=${PORT}`],
      headless: true
    });

    try {
      if (route.requiresAuth) {
        console.log('Injecting auth state to bypass login...');
        const context = await browser.newContext();
        const page = await context.newPage();
        // Go to home to establish origin
        await page.goto('http://localhost:3000/');
        
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
        }, route.role);
        
        // Wait briefly for localStorage to persist
        await page.waitForTimeout(500);
      }

      console.log('Running Lighthouse...');
      
      const options = {
        logLevel: 'error',
        output: 'html',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        port: PORT,
      };

      const runnerResult = await lighthouse(route.url, options);

      // Save HTML report
      const reportHtml = runnerResult.report;
      const fileName = `${route.name.replace(/\s+/g, '_').toLowerCase()}_report.html`;
      fs.writeFileSync(path.join(reportDir, fileName), reportHtml);

      // Extract scores
      const scores = {
        name: route.name,
        url: route.url,
        performance: Math.round(runnerResult.lhr.categories.performance.score * 100),
        accessibility: Math.round(runnerResult.lhr.categories.accessibility.score * 100),
        bestPractices: Math.round(runnerResult.lhr.categories['best-practices'].score * 100),
        seo: Math.round(runnerResult.lhr.categories.seo.score * 100)
      };

      summary.push(scores);
      console.log(`✅ Audit complete for ${route.name}`);
      console.log(`Scores: P:${scores.performance} | A:${scores.accessibility} | BP:${scores.bestPractices} | SEO:${scores.seo}`);

    } catch (e) {
      console.error(`❌ Audit failed for ${route.name}:`, e.message);
    } finally {
      await browser.close();
    }
  }

  // Save JSON summary
  fs.writeFileSync(path.join(reportDir, 'summary.json'), JSON.stringify(summary, null, 2));
  console.log(`\n🎉 All audits complete! Interactive HTML reports saved to qa-artifacts/lighthouse/`);
}

run();
