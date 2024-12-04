import { Request, Response } from 'express';
import { fileBasepath, findFileById } from '../../util/get_file';
export async function getBotList(req: Request, res: Response) {
  const findList:any = await findFileById(fileBasepath.botConfig, '100000000001');
  return res.status(200).json({ status: 'success', items: findList?.bot_list ?? [] });
}
