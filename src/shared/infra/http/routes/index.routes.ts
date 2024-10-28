import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Olá mundo' });
});
routes.get('/helloworld', async (req: Request, res: Response) => {
  res.json({ message: 'Olá mundo' });
});
export default routes;
