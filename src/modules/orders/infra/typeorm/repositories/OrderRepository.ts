import { getRepository, Repository } from 'typeorm';
import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import { IOrder } from '@modules/orders/domain/models/IOrder';
import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { Order } from '../entities/Order';
import { IOrderPaginate } from '@modules/orders/domain/models/IOrderPaginate';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async findById(id: string): Promise<Order | null> {
    return await this.ormRepository.findOne(id) || null;
  }

  public async findByClient(id: string): Promise<Order | null> {
    return await this.ormRepository.findOne({
      where: {
        clientId: id
      }
    }) || null;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IOrderPaginate> {
    const [orders, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: orders,
    };

    return result;
  }

  async create(order: ICreateOrder): Promise<IOrder> {
    const newOrder = this.ormRepository.create(order);
    return await this.ormRepository.save(newOrder);
  }

  async update(order: Order): Promise<Order> {
    return await this.ormRepository.save(order);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}