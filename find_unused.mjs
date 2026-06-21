import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('src');

function getAllFiles(dir, exts, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, exts, fileList);
    } else if (exts.some(ext => fullPath.endsWith(ext))) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allCodeFiles = getAllFiles(SRC_DIR, ['.js', '.jsx']);
const allContents = allCodeFiles.map(f => fs.readFileSync(f, 'utf8'));

const unusedFiles = [];

for (const file of allCodeFiles) {
  const basename = path.basename(file, path.extname(file));
  if (basename === 'main' || basename === 'App' || basename === 'index') continue;

  let isUsed = false;
  for (let i = 0; i < allCodeFiles.length; i++) {
    if (allCodeFiles[i] === file) continue;
    if (allContents[i].includes(basename)) {
      isUsed = true;
      break;
    }
  }
  
  if (!isUsed) {
    unusedFiles.push(file);
  }
}

console.log("Potentially Unused Files:");
unusedFiles.forEach(f => console.log(path.relative(process.cwd(), f)));
