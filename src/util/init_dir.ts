import * as fs from 'fs';
import * as path from 'path';
export function ensureDirectoryStructure(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory "${dirPath}" does not exist. Creating...`);
    fs.mkdirSync(dirPath, { recursive: true });
  } else {
    // console.log(`Directory "${dirPath}" already exists.`);
  }
  const subDirs = [
    'intents',
    'response',
    'custom-action',
    'entities',
    'task',
    'synonyms',
    'condition',
    'scripts',
  ];

  // Check and create each subdirectory if it doesn't exist
  subDirs.forEach((subDir) => {
    const subDirPath = path.join(dirPath, subDir);
    if (!fs.existsSync(subDirPath)) {
      fs.mkdirSync(subDirPath);
      console.log(`Subdirectory "${subDir}" created inside "${dirPath}".`);
    } else {
      // console.log(`Subdirectory "${subDir}" already exists inside "${dirPath}".`);
    }
  });
}
