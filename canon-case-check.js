// canon-case-check.js
const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, 'src', 'components');

function toCanonicalName(filename) {
  return filename.replace(/\.[jt]sx?$/, '');
}

function scanComponents() {
  const files = fs.readdirSync(COMPONENTS_DIR);
  const canonical = files.map(toCanonicalName);

  console.log(`🔍 Scanning ${files.length} component(s)...\n`);

  const importsFound = new Set();

  files.forEach(file => {
    const filePath = path.join(COMPONENTS_DIR, file);
    if (!file.endsWith('.js') && !file.endsWith('.jsx')) return;

    const content = fs.readFileSync(filePath, 'utf8');

    const matches = [...content.matchAll(/import\s+.*\s+from\s+['"](.+)['"]/g)];

    matches.forEach(match => {
      const importPath = match[1];

      if (importPath.startsWith('.') && !importPath.includes('node_modules')) {
        const base = path.basename(importPath);
        importsFound.add(base);
        if (!canonical.includes(base)) {
          console.warn(`❌ CASE MISMATCH in ${file}: tried to import '${base}' but no such file (case-sensitive)\n`);
        }
      }
    });
  });

  console.log(`✅ Scan complete. ${importsFound.size} unique local imports checked.`);
}

scanComponents();
