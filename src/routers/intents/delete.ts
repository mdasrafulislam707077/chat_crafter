import { Request, Response } from 'express';
import { deleteFileById, fileBasepath } from '../../util/delete_file';
import { readAllJsonFilesFromDir } from '../../util/file_fetch';
export async function intentDelete(req: Request, res: Response) {
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
  const id = req.params['id'];
  deleteFileById(target, id);
  const filedata = await readAllJsonFilesFromDir(target);
  const sortedData = filedata.sort((a, b) => b.timeSP - a.timeSP);
  return res.status(200).json({ items: sortedData, status: 'success' });
}
