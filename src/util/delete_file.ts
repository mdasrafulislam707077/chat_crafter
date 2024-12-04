import fs from 'fs';
import path from 'path';
import { fileBasepath } from './file_exist';
export { fileBasepath };
export function deleteFileById(directoryPath: string, id: string) {
  try {
    // Read all files in the directory
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);

      // Skip if it's not a JSON file
      if (path.extname(file) !== '.json') continue;

      // Read the file's content
      const content = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(content);

      // Check if the file contains the matching ID
      if (jsonData.id === id) {
        // Delete the file
        fs.unlinkSync(filePath);
        return; // Exit once the file is deleted
      }
    }


  } catch (error: any) {
 
  }
}
