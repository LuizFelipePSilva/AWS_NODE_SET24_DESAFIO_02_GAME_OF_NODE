import { container } from 'tsyringe';

import { OrderRepository } from '@modules/orders/infra/typeorm/repositories/OrderRepository';
import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import CarRepository  from '@modules/cars/infra/typeorm/repositories/CarRepository';
import { ICarRepository } from '@modules/cars/domain/repositories/ICarRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';

import '@modules/users/providers';

container.registerSingleton<IOrderRepository>(
  'OrdersRepository',
  OrderRepository,
);;

container.registerSingleton<ICarRepository>(
  'CarRepository',
  CarRepository,
);;

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository
);;



