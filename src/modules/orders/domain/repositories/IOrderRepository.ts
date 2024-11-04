import { IOrder } from '../models/IOrder';
import { IOrderPaginate } from '../models/IOrderPaginate';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IOrderRepository {
  findById(id: string): Promise<IOrder | null>;
  findAll({ page, skip, take }: SearchParams): Promise<IOrderPaginate>;
  findByClient(id: string): Promise<IOrder | null>;
  create(order: IOrder): Promise<IOrder>;
  update(order: IOrder): Promise<IOrder>;
  delete(id: string): Promise<void>;
}
