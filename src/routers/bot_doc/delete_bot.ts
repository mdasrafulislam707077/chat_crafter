import { Request, Response } from 'express';
import fs from 'fs/promises';
import { fileBasepath, findFileById, } from '../../util/get_file';

export async function delete_bot_item(req: Request, res: Response) {
  const dataInfo:any = await findFileById(fileBasepath.botConfig, '100000000001');
  try {
    const name: string = req.params['name'];

    const findItem = dataInfo.bot_list;
    const findBot = findItem.find((element:any, index:any) => element.name == name);
    if (findBot) {
      const newList:any = dataInfo?.bot_list?.filter(
        (element:any, index:any) => element?.name != name
      );
      dataInfo.bot_list = [...newList];
      fs.writeFile(`${fileBasepath.botConfig}botConfig.json`,JSON.stringify(dataInfo))
      return res.status(200)?.json({ status: 'success', items: dataInfo.bot_list });
    } else {
      return res
        .status(200)
        ?.json({ status: 'success', items: dataInfo?.bot_list });
    }
  } catch (error) {
    return res
      .status(200)
      ?.json({ status: 'success', items: dataInfo?.bot_list });
  }
}
