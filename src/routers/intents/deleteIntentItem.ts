import { Request, Response } from 'express';
import fs from 'fs/promises';
import { fileBasepath, findFileById } from '../../util/get_file';

export async function deleteIntentsItems(req: Request, res: Response) {
  const items: any = req.query;
  const filedata: any = await findFileById(
    fileBasepath.intents(items.user),
    items.name
  );
  if (filedata) {
    let newItems:any = filedata?.items?.filter(
      (element: any, index: any) => element.txt != items.txt
    );
    newItems = newItems.filter(
      (element: any, index: any) => element.txt != ' '
    );
    filedata.items = newItems;
    fs.writeFile(
      `src/doc/${items.user}/intents/${filedata?.info?.name}.json`,
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
