import { container } from 'tsyringe';

import { OrderRepository } from '@modules/orders/infra/typeorm/repositories/OrderRepository';
import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import CarRepository  from '@modules/cars/infra/typeorm/repositories/CarRepository';
import { ICarRepository } from '@modules/cars/domain/repositories/ICarRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import { IClientRepository } from '@modules/clients/domain/repositories/IClientRepository';
import ClientRepository from '@modules/clients/infra/typeorm/repositories/ClientRepository';

import '@modules/users/providers';
import { ICreateClient } from '@modules/clients/domain/models/ICreateClient';
import { ICarItemRepository } from '@modules/cars/domain/repositories/ICarItemRepository';
import CarItemRepository from '@modules/cars/infra/typeorm/repositories/CarItemRepository';

container.registerSingleton<IOrderRepository>(
  'OrdersRepository',
  OrderRepository,
);;

container.registerSingleton<ICarRepository>(
  'CarRepository',
  CarRepository,
);;

container.registerSingleton<ICarItemRepository>(
  'CarItemRepository',
  CarItemRepository,
);;

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository
);;

container.registerSingleton<IClientRepository>(
  'ClientRepository', 
  ClientRepository
);;



