
import { promises as fs } from 'fs';
function intents(name: string, types?: string) {
  return `src/doc/${name}/${types ?? 'intents'}/`;
}
export const fileBasepath = {
  intents: (name: string) => intents(name),
  response: (name:string)=>intents(name,'response'),
  scripts: (name:string)=>intents(name,'scripts'),
  condition: (name:string)=>intents(name,'condition'),
  customActions: (name:string)=>intents(name,'custom-action'),
  entities: (name:string)=>intents(name,'entities'),
  task: (name:string)=>intents(name,'task'),
  synonyms: (name:string)=>intents(name,'synonyms'),
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
