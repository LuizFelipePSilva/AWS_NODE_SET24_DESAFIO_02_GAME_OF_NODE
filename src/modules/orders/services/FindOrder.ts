import { inject, injectable } from 'tsyringe';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';
import { IOrderPaginate } from '../domain/models/IOrderPaginate';
import AppError from '@shared/errors/AppError';

export interface SearchParams {
  page: number;
  limit: number;
  status?: string;
  cpf?: string;
  startDate?: Date;
  endDate?: Date;
}

@injectable()
class ListOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrderRepository
  ) {}

  public async execute({
    page,
    limit,
    status,
    cpf,
    startDate,
    endDate,
  }: SearchParams): Promise<IOrderPaginate> {
    const take = limit;
    const skip = (page - 1) * take;

    const filters: any = {
      ...(status && { status }),
      ...(cpf && { clientCpf: cpf }),
      ...(startDate &&
        endDate && { orderDateRange: { start: startDate, end: endDate } }),
      ...(startDate && !endDate && { orderDate: { $gte: startDate } }),
      ...(!startDate && endDate && { orderDate: { $lte: endDate } }),
    };

    const orders = await this.ordersRepository.findAll({
      page,
      skip,
      take,
    });

    if (orders.data.length === 0) {
      throw new AppError('No orders found.');
    }

    return {
      per_page: orders.per_page,
      data: orders.data,
      total: orders.total,
      current_page: orders.current_page,
      last_page: Math.ceil(orders.total / take),
    };
  }
}

export default ListOrderService;
