import { getRepository, Repository } from 'typeorm';
import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import IOrder
import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';

export class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  async findById(id: string): Promise<Order | null> {
    return await this.ormRepository.findOne(id) || null;
  }
  async findByClient(id: string): Promise<Order | null> {
    return await this.ormRepository.findOne({
      where: {
        clientId: id
      }
    }) || null;
  }

  async findAll(): Promise<Order[]> {
    return await this.ormRepository.find();
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