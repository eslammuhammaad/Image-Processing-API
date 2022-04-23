import express from 'express';
import images from './api/images';

const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Main API route');
});
routes.use('/images', images as express.Router);

export default routes;
