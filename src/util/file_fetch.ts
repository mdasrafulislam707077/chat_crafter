import { promises as fs } from 'fs';
import { extname, resolve } from 'path';
import { fileBasepath } from './file_exist';
export { fileBasepath };
export async function readAllJsonFilesFromDir(dirPath: string): Promise<any[]> {
  try {
    const files = await fs.readdir(dirPath);
    const jsonDataList: any[] = [];
    for (const file of files) {
      const filePath = resolve(dirPath, file);
      if (extname(file) === '.json') {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(fileContent);
        jsonDataList.push(jsonData);
      }
    }

    return jsonDataList;
  } catch (err) {
    return [];
  }
  return [];
}
