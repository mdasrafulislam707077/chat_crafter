import { Request, Response } from 'express';
import { fileBasepath, readAllJsonFilesFromDir } from '../../util/file_fetch';
export async function intentGet(req: Request, res: Response) {
  const filedata = await readAllJsonFilesFromDir(fileBasepath.intents);
  const sortedData = filedata.sort((a, b) => b.timeSP - a.timeSP);
  return res
    .setHeader('Content-Type', 'application/json')
    .status(200)
    .json({ status: 'success', items: sortedData });
}
