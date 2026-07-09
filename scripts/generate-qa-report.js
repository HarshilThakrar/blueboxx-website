const fs = require('fs');
const path = require('path');

const resultsFile = path.join(__dirname, '../qa-artifacts/test-results.json');
const reportFile = path.join(__dirname, '../qa-artifacts/qa-report.md');

if (!fs.existsSync(resultsFile)) {
  console.error("Test results JSON not found. Did Playwright run successfully?");
  process.exit(1);
}

const rawData = fs.readFileSync(resultsFile, 'utf8');
const results = JSON.parse(rawData);

let passedTests = 0;
let failedTests = 0;
let flakyTests = 0;

results.suites.forEach(suite => {
  suite.specs.forEach(spec => {
    if (spec.ok) passedTests++;
    else failedTests++;
  });
});

const totalTests = passedTests + failedTests + flakyTests;
const passRate = totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(2) : 0;

const markdownReport = `
# Complete End-to-End QA Audit Report

**Date:** ${new Date().toLocaleString()}

## Overall Summary
- **Total Tests Executed:** ${totalTests}
- **Passed Tests:** ${passedTests}
- **Failed Tests:** ${failedTests}
- **Overall Frontend Quality Score:** ${passRate}%

## Failures Summary
${failedTests > 0 ? "Review the Playwright HTML report and screenshots in `qa-artifacts` for details on failures." : "All tests passed successfully!"}

## Detailed Trace & Media
- Screenshots and Videos (for failed tests) are stored in the \`qa-artifacts\` folder.
- Run \`npx playwright show-report\` to view the detailed HTML report.

## Production Readiness
${passRate === '100.00' ? "✅ System is 100% production ready." : "❌ System requires fixes before production."}
`;

fs.mkdirSync(path.dirname(reportFile), { recursive: true });
fs.writeFileSync(reportFile, markdownReport);
console.log("QA Report Generated at qa-artifacts/qa-report.md");
