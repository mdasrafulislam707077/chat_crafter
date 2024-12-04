import { Request, Response } from 'express';
import { fileBasepath, readAllJsonFilesFromDir } from '../../util/file_fetch';
import { ensureDirectoryStructure } from '../../util/init_dir';
export async function intentGet(req: Request, res: Response) {
  if (req.query['user'] == 'null') {
    return res
      .setHeader('Content-Type', 'application/json')
      .status(200)
      .json({ status: 'success', items: [] });
  }
  ensureDirectoryStructure(`src/doc/${req.query['user'] }`)
  const filedata = await readAllJsonFilesFromDir(fileBasepath.intents(req.query['user'] as string));
  const sortedData = filedata.sort((a, b) => b.timeSP - a.timeSP);
  return res
    .setHeader('Content-Type', 'application/json')
    .status(200)
    .json({ status: 'success', items: sortedData });
}
