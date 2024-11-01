import { container } from 'tsyringe';

import { OrderRepository } from '@modules/orders/infra/typeorm/repositories/OrderRepository';
import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';


import '@modules/users/providers';

container.registerSingleton<IOrderRepository>(
  'OrdersRepository',
  OrderRepository,
);



