import { Request, Response } from 'express';
import fs from 'fs/promises';
import { deleteFileById } from '../../util/delete_file';
import { fileBasepath, findFileById } from '../../util/get_file';

export async function addAlternativeWordLabel(req: Request, res: Response) {
  const result: any = await findFileById(
    fileBasepath.intents(req.body.wordObj.botname),
    req.body.id
  );
  if (result) {
    result.alter_word = [...result.alter_word, { ...req.body.wordObj }];
    deleteFileById(
      fileBasepath.intents(req.body.wordObj.botname),
      req.body?.id
    );
    fs.writeFile(
      `src/doc/${req.body.wordObj.botname}/intents/${result?.info?.name}.json`,
      JSON.stringify(result)
    );
    return res.status(200).json({
      status: 'success',
      items: result.alter_word,
    });
  }
  return res.status(200).json({});
}
