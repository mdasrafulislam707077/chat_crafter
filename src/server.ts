import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import bodyParser from 'body-parser';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Define paths for server and browser dist folders
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

// Set up Express app and Angular Universal server engine
const app = express();
const angularApp = new AngularNodeAppEngine();
const { routes } = require('./routers/routers');

// Static file serving
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

// Middleware for parsing URL-encoded data and JSON bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());  // Use Express's built-in JSON body parser
routes(app);

// Add Angular Universal SSR handling for all other routes
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => response ? writeResponseToNodeResponse(response, res) : next())
    .catch(next);
});

// Define routes


// Start the server if running as the main module
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Export the SSR request handler
export const reqHandler = createNodeRequestHandler(app);
