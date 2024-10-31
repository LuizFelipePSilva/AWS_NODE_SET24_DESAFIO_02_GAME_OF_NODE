import { Router, Request, Response } from 'express';
import carRoutes from './carRoutes';
import orderRoute from '@modules/orders/infra/http/routes/Order.routes'
const routes = Router();

routes.use('/api/cars', carRoutes);
routes.use('/api/v1/orders', orderRoute)

routes.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Olá mundo' });
});
routes.get('/helloworld', async (req: Request, res: Response) => {
  res.json({ message: 'Olá mundo' });
});
export default routes;
