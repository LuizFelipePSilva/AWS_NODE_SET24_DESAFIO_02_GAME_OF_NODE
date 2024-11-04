import { getRepository, Repository } from 'typeorm';
import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import { IOrder } from '@modules/orders/domain/models/IOrder';
import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { Order } from '../entities/Order';
import { IOrderPaginate } from '@modules/orders/domain/models/IOrderPaginate';

interface SearchParams {
  page: number;
  skip: number;
  take: number;
  filters?: {
    status?: string;
    clientCpf?: string;
    orderDateRange?: { start: Date; end: Date };
    orderDate?: { $gte?: Date; $lte?: Date };
  };
}

export class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async findById(id: string): Promise<Order | null> {
    return (await this.ormRepository.findOne(id)) || null;
  }

  public async findByClient(id: string): Promise<Order | null> {
    return (
      (await this.ormRepository.findOne({
        where: {
          clientId: id,
        },
      })) || null
    );
  }

  public async findAll({
    page,
    skip,
    take,
    filters,
  }: SearchParams): Promise<IOrderPaginate> {
    const query = this.ormRepository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.client', 'client');

    if (filters) {
      if (filters.status) {
        query.andWhere('orders.status = :status', { status: filters.status });
      }
      if (filters.clientCpf) {
        query.andWhere('client.cpf = :cpf', { cpf: filters.clientCpf });
      }
      if (filters.orderDateRange) {
        query.andWhere('orders.orderDate BETWEEN :start AND :end', {
          start: filters.orderDateRange.start,
          end: filters.orderDateRange.end,
        });
      }
      if (filters.orderDate?.$gte) {
        query.andWhere('orders.orderDate >= :startDate', {
          startDate: filters.orderDate.$gte,
        });
      }
      if (filters.orderDate?.$lte) {
        query.andWhere('orders.orderDate <= :endDate', {
          endDate: filters.orderDate.$lte,
        });
      }
    }

    // Ordenação DESC para orderDate
    query.orderBy('orders.orderDate', 'DESC');

    const [orders, count] = await query.skip(skip).take(take).getManyAndCount();

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      status: order.status,
      orderDate: order.orderDate,
      purchaseDate: order.purchaseDate,
      cancellationDate: order.cancellationDate,
      totalValue: order.totalValue,
      cep: order.cep,
      city: order.city,
      uf: order.uf,
      clientId: order.clientId,
      clientName: order.client.fullName,
      clientCpf: order.client.cpf,
    }));

    return {
      per_page: take,
      total: count,
      current_page: page,
      data: formattedOrders,
    };
  }

  async create(order: ICreateOrder): Promise<IOrder> {
    const newOrder = this.ormRepository.create(order);
    await this.ormRepository.save(newOrder);
    return newOrder;
  }

  async update(order: Order): Promise<Order> {
    await this.ormRepository.save(order);
    return order;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}
