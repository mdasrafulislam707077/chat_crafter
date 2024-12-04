import { Request, Response } from 'express';
import fs from 'fs/promises';
import { fileBasepath, findFileById } from '../../util/get_file';
let bot_name: string = '';

export async function create_bot(req: Request, res: Response) {
  // 100000000001
  const configData: any = await findFileById(
    fileBasepath.botConfig,
    '100000000001'
  );
  const findBot = configData.bot_list?.find((element: any, index: any) => {
    return element?.name == req.body?.name;
  });
  if (!findBot) {
    configData.bot_list = [...configData.bot_list, { name: req.body?.name, timeS:req.body?.timeS}];
  }

  fs.writeFile(
    `${fileBasepath.botConfig}botConfig.json`,
    JSON.stringify(configData)
  );
  return res
    .status(200)
    .json({ status: 'success', listOfBot: configData.bot_list });
}
