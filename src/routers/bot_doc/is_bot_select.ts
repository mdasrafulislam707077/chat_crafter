import { Request, Response } from 'express';
let bot_name: object | null = null;
const requestType = {
  CHECK_STATUS: 'CHECK_STATUS',
  CHANGE: 'CHANGE',
  CLOSE: 'CLOSE',
};

export async function changeBotStatus(req: Request, res: Response) {
  console.log(bot_name);
  if (req?.body?.status == requestType.CHANGE) {
    bot_name = {
      name: req?.body?.name,
    };
    return res.status(200).json({ status: 'success', botname: bot_name });
  } else if (req?.body?.status == requestType.CLOSE) {
    bot_name = null;
    return res.status(200).json({ status: 'success' });
  } else {
    return res.status(200).json({ status: 'success', botname: bot_name });
  }
  return res.status(200).json({ status: 'success', botname: bot_name });
}
