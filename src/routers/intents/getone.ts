import { Request, Response } from 'express';
import { fileBasepath, findFileById } from '../../util/get_file';
import { ensureDirectoryStructure } from '../../util/init_dir';

export async function intentGetOne(req: Request, res: Response) {
  if (req.query['user'] == 'null') {
    return res.status(200).json({ status: 'success', item: {} });
  }
  ensureDirectoryStructure(req.query['user'] as string);
  if (req.params['id']) {
    const result = await findFileById(
      fileBasepath.intents(req.query['user'] as string),
      req.params['id']
    );

    return res.status(200).json({ status: 'success', item: result });
  }
  return res.status(400).json({ asdasd: 'failed' });
}
