const fs = require('fs'); 
const content = fs.readFileSync('src/layout/AdminDashboardLayout.tsx', 'utf-8'); 
const importMatch = content.match(/import\s+\{([\s\S]+?)\}\s+from\s+['"']lucide-react['"']/); 
if (importMatch) { 
    const imports = importMatch[1].split(',').map(s => s.trim().split(' as ')[0]); 
    const unused = imports.filter(i => i && content.split(new RegExp('\\b' + i + '\\b')).length <= 2); 
    console.log(unused.join(', ')); 
}
