import { IOrder } from '../models/IOrder';

export interface IOrderRepository {
  findById(id: string): Promise<IOrder | null>;
  findAll(): Promise<IOrder[]>;
  findByClient(id: string): Promise<IOrder | null>; 
  create(order: IOrder): Promise<IOrder>;
  update(order: IOrder): Promise<IOrder>;
  delete(id: string): Promise<void>;
}