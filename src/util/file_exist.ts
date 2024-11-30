export const fileBasepath = {
  intents: 'src/doc/intents/',
  response: 'src/doc/response/',
  scripts: 'src/doc/scripts/',
};
import { promises as fs } from 'fs';

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath); // No callback needed with fs.promises
    return true; // File exists
  } catch (err) {
    return false; // File does not exist
  }
}
