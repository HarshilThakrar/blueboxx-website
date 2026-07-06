const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'pages', 'student', 'dashboard');

// Helper to recursively get all files in a dir
function getFilesRecursive(d) {
    let results = [];
    if (!fs.existsSync(d)) return results;
    const list = fs.readdirSync(d);
    list.forEach(file => {
        const fullPath = path.join(d, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFilesRecursive(fullPath));
        } else {
            results.push(fullPath);
        }
    });
    return results;
}

const files = getFilesRecursive(dir);

let updatedFiles = 0;

files.forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        let content = fs.readFileSync(file, 'utf8');
        
        // When we moved pages/dashboard to pages/student/dashboard, depth increased by 1
        // So '../../src/' needs to become '../../../src/'
        // First check if it contains the broken import
        if (content.includes('../../src/')) {
            content = content.split('../../src/').join('../../../src/');
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Fixed imports in: ${file}`);
            updatedFiles++;
        }
        
        // Just in case there are other relative imports like '../../components'
        if (content.includes('../../components/')) {
             content = content.split('../../components/').join('../../../components/');
             fs.writeFileSync(file, content, 'utf8');
             console.log(`Fixed components import in: ${file}`);
        }
        
        // Wait, did we move companies too? pages/company to pages/companies
        // pages/company to pages/companies does NOT change depth! 
        // pages/mentor to pages/expert does NOT change depth!
    }
});

console.log(`\nImport fix complete. Fixed ${updatedFiles} files.`);
