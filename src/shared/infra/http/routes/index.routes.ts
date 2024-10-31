import { Router, Request, Response } from 'express';
import carRoutes from './carRoutes';

const routes = Router();

routes.use('/api/cars', carRoutes);

routes.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Olá mundo' });
});
routes.get('/helloworld', async (req: Request, res: Response) => {
  res.json({ message: 'Olá mundo' });
});
export default routes;
