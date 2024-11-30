import { Express } from 'express';
import { intentDelete } from './intents/delete';
import { intentGet } from './intents/get';
import { intentGetOne } from './intents/getone';
import { intentPost } from './intents/post';
function routes(app: Express) {
  // about intents
  app.route('/intent').post(intentPost).get(intentGet)
  app.route('/intent/:id').get(intentGetOne)
  // about intents .get(intentGet).delete(intentDelete)
}

export { routes };

