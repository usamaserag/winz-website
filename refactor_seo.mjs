import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const pf = path.join(dir, f);
    if (fs.statSync(pf).isDirectory()) walk(pf, callback);
    else if (pf.endsWith('.jsx')) callback(pf);
  });
}

walk('src/pages', (file) => {
  let code = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace usePageTitle hook calls
  // e.g. usePageTitle('About Us'); -> we need to render <Helmet><title>About Us | WINZ</title></Helmet>
  if (code.includes('usePageTitle')) {
    const match = code.match(/usePageTitle\(\s*(['"`][^'"`]+['"`])\s*\);?/);
    if (match) {
      const title = match[1];
      code = code.replace(/import\s+usePageTitle\s+from\s+[^;]+;/, "import { Helmet } from 'react-helmet-async';");
      code = code.replace(match[0], ''); // Remove the hook call
      
      // Inject <Helmet> right after the first <div> or <main> or <React.Fragment> after return
      // This is a naive regex but works mostly
      code = code.replace(/(return\s*\(\s*(?:<[^>]+>\s*)*)/, `$1\n      <Helmet><title>$\{${title}\} | WINZ</title></Helmet>\n`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, code);
  }
});

console.log("Done");
