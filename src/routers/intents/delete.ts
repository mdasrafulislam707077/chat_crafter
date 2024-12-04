import { Request, Response } from 'express';
import { deleteFileById, fileBasepath } from '../../util/delete_file';
import { readAllJsonFilesFromDir } from '../../util/file_fetch';
export async function intentDelete(req: Request, res: Response) {
  const id = req.params['id'];
  deleteFileById(fileBasepath.intents(req.query['user'] as string), id);
  const filedata = await readAllJsonFilesFromDir(fileBasepath.intents(req.query['user'] as string));
  const sortedData = filedata.sort((a, b) => b.timeSP - a.timeSP);
  return res.status(200).json({ items: sortedData, status: 'success' });
}
