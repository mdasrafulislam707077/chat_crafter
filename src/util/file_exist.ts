
import { promises as fs } from 'fs';
function intents(name: string, types?: string) {
  return `src/doc/${name}/${types ?? 'intents'}/`;
}
export const fileBasepath = {
  intents: (name: string) => intents(name),
  response: 'src/doc/response/',
  scripts: 'src/doc/scripts/',
  botConfig: 'src/routers/bot_doc/',
};
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath); 
    return true; 
  } catch (err) {
    return false; 
  }
}
