import { Request, Response } from 'express';
import fs from 'fs/promises';
import { deleteFileById } from '../../util/delete_file';
import { fileBasepath, findFileById } from '../../util/get_file';
export async function removeAlternativeWordLabel(req: Request, res: Response) {
  const result: any = await findFileById(
    fileBasepath.intents(req.body.wordObj.botname),
    req.body.id
  );
  //   console.log(result.alter_word)

  if (result) {
    const findObj = result.alter_word.filter(
      (element: any, index: any) => element.id != req.body.wordObj.id
    );

    result.alter_word = findObj;
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
      items: findObj,
    });
  }
  return res.status(200).json({});
}
