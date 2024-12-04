import { Express } from 'express';
import { create_bot } from './bot_doc/create_bot';
import { delete_bot_item } from './bot_doc/delete_bot';
import { getBotList } from './bot_doc/get_bot_list';
import { changeBotStatus } from './bot_doc/is_bot_select';
import { addIntent } from './intents/addintents';
import { intentDelete } from './intents/delete';
import { intentGet } from './intents/get';
import { intentGetOne } from './intents/getone';
import { intentPost } from './intents/post';
function routes(app: Express) {
  // about intents
  app.route('/intent').post(intentPost).get(intentGet);
  app.route('/intent/:id').get(intentGetOne);
  app.route('/intent/:id').delete(intentDelete);
  app.route('/intent/addIntent').post(addIntent);
  app.route('/bot/status').post(create_bot).get(getBotList);
  app.route('/bot/status/:name').delete(delete_bot_item);
  app.route('/bot/status/changeStatus').post(changeBotStatus);
  // app.route('/bot/status/change')
  // about intents .get(intentGet).delete(intentDelete)
}

export { routes };
