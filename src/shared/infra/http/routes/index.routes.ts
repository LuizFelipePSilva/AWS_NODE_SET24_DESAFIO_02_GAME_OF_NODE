import { Router, Request, Response } from 'express';
import carRoutes from '@modules/cars/infra/http/routes/Car.routes';
import orderRoute from '@modules/orders/infra/http/routes/Order.routes'
import clientRoutes from '@modules/clients/infra/http/routes/Client.routes';
import userRoutes from '@modules/users/infra/http/routes/User.routes';
import sessionRoutes from '@modules/users/infra/http/routes/Session.routes';
const routes = Router();

routes.use('/api/cars', carRoutes);
routes.use('/api/v1/orders', orderRoute)
routes.use('/clients', clientRoutes)
routes.use('/api/users', userRoutes)
routes.use('/api/session', sessionRoutes)

routes.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Olá mundo' });
});
routes.get('/helloworld', async (req: Request, res: Response) => {
  res.json({ message: 'Olá mundo' });
});
export default routes;
