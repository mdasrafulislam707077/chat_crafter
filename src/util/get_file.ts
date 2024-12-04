import * as fs from 'fs';
import * as path from 'path';
import { fileBasepath } from './file_exist';

export { fileBasepath };
export async function findFileById(
  directoryPath: string,
  id: string
): Promise<object | null> {
  try {
    const files = await fs.promises.readdir(directoryPath); // List all files in the directory

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const fileData = await fs.promises.readFile(filePath, 'utf-8');
      const jsonData = JSON.parse(fileData);

      if (jsonData.id === id) {
        return jsonData; // Return the matching file data
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}
