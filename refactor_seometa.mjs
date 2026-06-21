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

  if (code.includes('useSEOMeta')) {
    // Replace import
    code = code.replace(/import\s+\{\s*useSEOMeta\s*\}\s+from\s+['"]\.\.\/\.\.\/hooks\/useSEOMeta['"];/, 
      "import { SEOMeta } from '../../components/common/SEOMeta';");
      
    // Replace hook usage with variable assignment for the props
    // We assume it looks like `useSEOMeta({...})` or `useSEOMeta(category ? {...} : null)`
    // This is tricky to regex perfectly. Let's just find `useSEOMeta(` and capture until the matching `);`
    
    let startIndex = code.indexOf('useSEOMeta(');
    if (startIndex !== -1) {
      let openBrackets = 0;
      let endIndex = startIndex + 10; // 'useSEOMeta(' is 11 chars
      for (let i = startIndex + 11; i < code.length; i++) {
        if (code[i] === '(' || code[i] === '{') openBrackets++;
        if (code[i] === ')' || code[i] === '}') openBrackets--;
        if (openBrackets < 0) {
          endIndex = i;
          break;
        }
      }
      
      const args = code.substring(startIndex + 11, endIndex);
      
      // Remove the hook call
      code = code.slice(0, startIndex) + code.slice(endIndex + 2); // +2 for ');'
      
      // Now inject <SEOMeta meta={...} /> at the start of the return statement
      const returnMatch = /(return\s*\(\s*(?:<[^>]+>\s*)*)/;
      code = code.replace(returnMatch, `$1\n      <SEOMeta meta={${args}} />\n`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, code);
  }
});

console.log("Done");
