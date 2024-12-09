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
  ensureDirectoryStructure(`src/doc/${req.query['user']}`);

  const target =
    req.query['target'] == 'intents'
      ? fileBasepath.intents(req.query['user'] as string)
      : req.query['target'] == 'entities'
      ? fileBasepath.entities(req.query['user'] as string)
      : req.query['target'] == 'response'
      ? fileBasepath.response(req.query['user'] as string)
      : req.query['target'] == 'task'
      ? fileBasepath.task(req.query['user'] as string)
      : req.query['target'] == 'synonyms'
      ? fileBasepath.synonyms(req.query['user'] as string)
      : req.query['target'] == 'condition'
      ? fileBasepath.condition(req.query['user'] as string)
      : req.query['target'] == 'scripts'
      ? fileBasepath.scripts(req.query['user'] as string)
      : fileBasepath.customActions(req.query['user'] as string);

  const filedata = await readAllJsonFilesFromDir(target);
  const sortedData = filedata.sort((a, b) => b.timeSP - a.timeSP);
  return res
    .setHeader('Content-Type', 'application/json')
    .status(200)
    .json({ status: 'success', items: sortedData });
}
