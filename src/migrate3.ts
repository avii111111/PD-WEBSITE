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

  content = content.replace(/hover:bg-primary\/90/g, 'hover:bg-secondary/90');
  content = content.replace(/hover:bg-primary/g, 'hover:bg-secondary/90');
  content = content.replace(/bg-primary text-white p-10/g, 'bg-white/5 backdrop-blur-md border border-white/10 text-white p-10');
  content = content.replace(/bg-primary p-8 text-white/g, 'bg-white/5 backdrop-blur-md border-r border-white/10 p-8 text-white');
  content = content.replace(/bg-primary text-white py-20/g, 'bg-transparent text-white py-20');
  content = content.replace(/bg-primary text-white (.*?) rounded-lg/g, 'bg-secondary text-white $1 rounded-lg border border-secondary/30 shadow-lg shadow-secondary/20');
  
  fs.writeFileSync(filePath, content, 'utf-8');
}

walkDir('./src/pages', processComponent);
