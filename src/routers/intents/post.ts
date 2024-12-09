import { Request, Response } from 'express';
import fs from 'fs/promises';
import { uuid } from 'uuidv4';
import { fileBasepath, fileExists } from '../../util/file_exist';
export async function intentPost(req: Request, res: Response) {
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
  const data = req.body;
  const file = await fileExists(
    `${target}${data?.name}.json`
  );
  if (file) {
    return res.status(401).json({ status: 'failed' });
  } else {
    const datas = {
      info: data,
      items: [],
      wrong_F: [],
      wrong_S: [],
      wrong_T: [],
      alter_word:[],
      id: uuid(),
      timeSP: Date.now(),
    };
    fs.writeFile(
      `src/doc/${req.body?.botname}/${req.query['target']}/${data?.name}.json`,
      JSON.stringify(datas)
    );
    return res.status(200).json({ status: 'success', item: datas });
  }
}
