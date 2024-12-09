import { Request, Response } from 'express';
import fs from 'fs/promises';
import { deleteFileById } from '../../util/delete_file';
import { fileBasepath, findFileById } from '../../util/get_file';

export async function removeAlternativeWord(req: Request, res: Response) {
  const result: any = await findFileById(
    fileBasepath.intents(req.body.wordObj.botname),
    req.body.id
  );
  if (result) {
    let newAlterItems: any = [];
    const newWords = result.alter_word.map((element: any, index: any) => {
      if (element.id == req.body.wordObj.word_id) {
        newAlterItems = element.alter.filter(
          (element: any, index: any) => element.id != req.body.wordObj.remove_id
        );
        return {
          ...element,
          alter: newAlterItems,
        };
      }
      return element;
    });
    result.alter_word = newWords;
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
      items: newAlterItems,
    });
  }

  return res.status(200).json({
    status: 'success',
  });
}
