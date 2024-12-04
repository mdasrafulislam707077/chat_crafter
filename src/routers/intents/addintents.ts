import { Request, Response } from 'express';
import fs from 'fs/promises';
import { deleteFileById } from '../../util/delete_file';
import { fileBasepath, findFileById } from '../../util/get_file';


export async function addIntent(req: Request, res: Response) {
  const filedata: any = await findFileById(fileBasepath.intents(req.body?.botname), req.body?.id);
  if (filedata) {
    deleteFileById(fileBasepath.intents(req.body?.botname), req.body?.id);
    filedata.items = [...filedata.items, { txt: req.body?.intent }];
    fs.writeFile(
      `src/doc/${req.body?.botname}/intents/${filedata?.info?.name}.json`,
      JSON.stringify(filedata)
    );
    return res.status(200).json({
      status: 'success',
      item: filedata,
    });
  }
  return res.status(400).json({
    status: 'failed',
  });
}
