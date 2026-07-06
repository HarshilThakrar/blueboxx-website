const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const pagesDir = path.join(rootDir, 'pages');
const layoutDir = path.join(rootDir, 'src', 'layout');

// Helper to replace text in a file
function replaceInFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    replacements.forEach(({ search, replace }) => {
        if (content.includes(search)) {
            content = content.split(search).join(replace);
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated contents in: ${filePath}`);
    }
}

// Helper to recursively get all files in a dir
function getFilesRecursive(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFilesRecursive(fullPath));
        } else {
            results.push(fullPath);
        }
    });
    return results;
}

// Helper to move directory contents safely
function moveDirectoryContents(sourceDir, targetDir) {
    if (!fs.existsSync(sourceDir)) return;
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    
    const files = fs.readdirSync(sourceDir);
    files.forEach(file => {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);
        
        // If target exists and is a directory, merge it
        if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
            moveDirectoryContents(sourcePath, targetPath);
            fs.rmdirSync(sourcePath);
        } else {
            // Overwrite or move
            fs.renameSync(sourcePath, targetPath);
            console.log(`Moved: ${sourcePath} -> ${targetPath}`);
        }
    });
    
    // Remove the old directory if empty
    try {
        fs.rmdirSync(sourceDir);
    } catch (e) {
        console.log(`Could not remove ${sourceDir} as it might not be empty.`);
    }
}

console.log('Starting Migration Script...');

// 1. Rename mentor -> expert
console.log('\n--- Migrating Mentor to Expert ---');
const mentorLayout = path.join(layoutDir, 'MentorLayout.tsx');
const expertLayout = path.join(layoutDir, 'ExpertLayout.tsx');
if (fs.existsSync(mentorLayout)) {
    fs.renameSync(mentorLayout, expertLayout);
    console.log('Renamed MentorLayout.tsx -> ExpertLayout.tsx');
}

const mentorDashLayout = path.join(layoutDir, 'MentorDashboardLayout.tsx');
const expertDashLayout = path.join(layoutDir, 'ExpertDashboardLayout.tsx');
if (fs.existsSync(mentorDashLayout)) {
    fs.renameSync(mentorDashLayout, expertDashLayout);
    console.log('Renamed MentorDashboardLayout.tsx -> ExpertDashboardLayout.tsx');
}

const mentorPagesDir = path.join(pagesDir, 'mentor');
const expertPagesDir = path.join(pagesDir, 'expert');
if (fs.existsSync(mentorPagesDir)) {
    fs.renameSync(mentorPagesDir, expertPagesDir);
    console.log('Renamed pages/mentor -> pages/expert');
}

// 2. Rename company -> companies
console.log('\n--- Migrating Company to Companies ---');
const companyLayout = path.join(layoutDir, 'CompanyLayout.tsx');
const companiesLayout = path.join(layoutDir, 'CompaniesLayout.tsx');
if (fs.existsSync(companyLayout)) {
    fs.renameSync(companyLayout, companiesLayout);
    console.log('Renamed CompanyLayout.tsx -> CompaniesLayout.tsx');
}

const companyDashLayout = path.join(layoutDir, 'CompanyDashboardLayout.tsx');
const companiesDashLayout = path.join(layoutDir, 'CompaniesDashboardLayout.tsx');
if (fs.existsSync(companyDashLayout)) {
    fs.renameSync(companyDashLayout, companiesDashLayout);
    console.log('Renamed CompanyDashboardLayout.tsx -> CompaniesDashboardLayout.tsx');
}

// Check for pages/companies.tsx conflict before moving company -> companies
const companiesPageFile = path.join(pagesDir, 'companies.tsx');
const companiesPagesDir = path.join(pagesDir, 'companies');

if (fs.existsSync(companiesPageFile)) {
    if (!fs.existsSync(companiesPagesDir)) {
        fs.mkdirSync(companiesPagesDir, { recursive: true });
    }
    fs.renameSync(companiesPageFile, path.join(companiesPagesDir, 'index.tsx'));
    console.log('Moved pages/companies.tsx -> pages/companies/index.tsx');
}

const companyPagesDir = path.join(pagesDir, 'company');
if (fs.existsSync(companyPagesDir)) {
    // If pages/companies exists, merge company into it
    moveDirectoryContents(companyPagesDir, companiesPagesDir);
    console.log('Moved pages/company/* -> pages/companies/');
}

// 3. Consolidate Dashboard -> Student
console.log('\n--- Consolidating Dashboard to Student ---');
const dashPagesDir = path.join(pagesDir, 'dashboard');
const studentDashPagesDir = path.join(pagesDir, 'student', 'dashboard');
if (fs.existsSync(dashPagesDir)) {
    // Move everything from dashboard to student/dashboard
    moveDirectoryContents(dashPagesDir, studentDashPagesDir);
    console.log('Moved pages/dashboard/* -> pages/student/dashboard/');
}

// 4. Update References across all files
console.log('\n--- Updating Layout References in Files ---');
const allFiles = [
    ...getFilesRecursive(pagesDir),
    ...getFilesRecursive(layoutDir),
    ...getFilesRecursive(path.join(rootDir, 'src', 'components'))
];

const replacements = [
    { search: 'MentorDashboardLayout', replace: 'ExpertDashboardLayout' },
    { search: 'MentorLayout', replace: 'ExpertLayout' },
    { search: 'CompanyDashboardLayout', replace: 'CompaniesDashboardLayout' },
    { search: 'CompanyLayout', replace: 'CompaniesLayout' },
    // Also fix routing strings if they exist
    { search: '"/mentor', replace: '"/expert' },
    { search: "'/mentor", replace: "'/expert" },
    { search: '`/mentor', replace: '`/expert' },
    { search: '"/company', replace: '"/companies' },
    { search: "'/company", replace: "'/companies" },
    { search: '`/company', replace: '`/companies' },
    { search: '"/dashboard', replace: '"/student/dashboard' },
    { search: "'/dashboard", replace: "'/student/dashboard" },
    { search: '`/dashboard', replace: '`/student/dashboard' }
];

allFiles.forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        replaceInFile(file, replacements);
    }
});

console.log('\nMigration complete.');
