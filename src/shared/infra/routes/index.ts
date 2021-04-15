import { Router, Request, Response } from 'express';
import StatusController from '@shared/controller/StatusController';

const routes = Router();

routes.get('/status', StatusController.status);
routes.get('/ready', StatusController.ready);

routes.get('/', function (request: Request, response: Response) {
  response.json({
    api: 'API-User',
    version: '1.0',
  });
});

export default routes;
