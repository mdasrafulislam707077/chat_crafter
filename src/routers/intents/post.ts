import { Request, Response } from 'express';
import fs from 'fs/promises';
import { uuid } from 'uuidv4';
import { fileBasepath, fileExists } from '../../util/file_exist';
export async function intentPost(req: Request, res: Response) {
  const data = req.body;
  const file = await fileExists(`${fileBasepath.intents}${data?.name}.json`);
  if (file) {
    return res.status(401).json({ status: 'failed' });
  } else {
    const datas = { info: data, items: [], id: uuid(), timeSP: Date.now() };
    fs.writeFile(`src/doc/intents/${data?.name}.json`, JSON.stringify(datas));
    return res.status(200).json({ status: 'success', item: datas });
  }
}
