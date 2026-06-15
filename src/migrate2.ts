import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (filepath: string) => void) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else if (dirPath.endsWith('.tsx')) {
      callback(dirPath);
    }
  }
}

function processComponent(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Input styles
  content = content.replace(/className="w-full px-4/g, 'className="w-full bg-[#020617] text-white placeholder-slate-400 px-4');
  content = content.replace(/className="w-full md:w-1\/2 px-4/g, 'className="w-full md:w-1/2 bg-[#020617] text-white placeholder-slate-400 px-4');

  // Select Option styles
  content = content.replace(/<option value/g, '<option className="bg-[#020617]" value');

  fs.writeFileSync(filePath, content, 'utf-8');
}

walkDir('./src/pages', processComponent);
