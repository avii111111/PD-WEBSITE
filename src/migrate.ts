import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (filepath: string) => void) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
      callback(dirPath);
    }
  }
}

function processComponent(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Colors
  content = content.replace(/bg-white\b(?!\/)/g, 'bg-white/5 backdrop-blur-md');
  content = content.replace(/bg-gray-50/g, 'bg-transparent');
  content = content.replace(/bg-gray-100/g, 'bg-white/5');
  
  content = content.replace(/text-gray-900/g, 'text-white');
  content = content.replace(/text-gray-800/g, 'text-white');
  content = content.replace(/text-gray-700/g, 'text-slate-300');
  content = content.replace(/text-gray-600/g, 'text-slate-400');
  content = content.replace(/text-gray-500/g, 'text-slate-400');
  content = content.replace(/text-gray-400/g, 'text-slate-500');

  // Borders
  content = content.replace(/border-gray-100/g, 'border-white/10');
  content = content.replace(/border-gray-200/g, 'border-white/20');
  content = content.replace(/border-gray-300/g, 'border-white/20');
  
  // Specific sections and texts
  content = content.replace(/bg-blue-50/g, 'bg-blue-500/10');
  content = content.replace(/text-blue-800/g, 'text-blue-300');
  content = content.replace(/text-blue-700/g, 'text-blue-400');
  content = content.replace(/bg-green-50/g, 'bg-green-500/10');
  content = content.replace(/text-green-800/g, 'text-green-300');
  content = content.replace(/bg-yellow-100/g, 'bg-yellow-500/10');
  content = content.replace(/text-yellow-800/g, 'text-yellow-300');

  // Replace text-primary with text-white
  content = content.replace(/text-primary/g, 'text-white');
  
  // Update buttons that used bg-primary to use secondary color (which will be blue)
  content = content.replace(/bg-primary text-white (.*?) rounded-(lg|xl|2xl|full)(.*?) transition/g, "bg-secondary text-white $1 rounded-$2$3 transition border border-secondary/30 shadow-lg shadow-secondary/20");

  fs.writeFileSync(filePath, content, 'utf-8');
}

walkDir('./src/pages', processComponent);
walkDir('./src/components', processComponent);
processComponent('./src/App.tsx');
