import fs from 'fs';
import path from 'path';

const reportPath = path.join(process.cwd(), 'qa-artifacts', 'mobile-report.json');
if (!fs.existsSync(reportPath)) {
  console.error("No mobile-report.json found! Run the mobile crawler first.");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

const totalScore = data.totalPages > 0 
  ? Math.round((data.passedPages / data.totalPages) * 100) 
  : 0;

let md = `# Mobile Responsiveness QA Report

## Execution Summary
- **Mobile Readiness Score**: ${totalScore}%
- **Total Pages Audited**: ${data.totalPages}
- **Passed Pages**: ${data.passedPages}
- **Failed Pages**: ${data.failedPages}

---

## Breakdown by Viewport & Pages

| Viewport | Portal | URL | Status |
|---|---|---|---|
`;

data.pages.forEach(p => {
  const icon = p.status === 'Passed' ? '✅' : '❌';
  md += `| ${p.viewport} | ${p.role} | \`${p.url}\` | ${icon} ${p.status} |\n`;
});

md += `

---

## Action Items
1. Navigate to the \`qa-artifacts/mobile_screenshots\` directory.
2. Review the captured screenshots for the iPhone 14 Pro and iPad Pro 11.
3. Check for any overlapping elements, overflowing text, or inaccessible menus.
`;

const outPath = path.join(process.cwd(), 'qa-artifacts', 'MOBILE_QA_REPORT.md');
fs.writeFileSync(outPath, md);
console.log("Successfully generated markdown report at qa-artifacts/MOBILE_QA_REPORT.md");
