import { inject, injectable } from 'tsyringe';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';
import { IOrderPaginate } from '../domain/models/IOrderPaginate';
import { IShowOrderResponse } from '../domain/models/IShowOrderResponse';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrderRepository,
    @inject('ClientRepository')
    private clientRepository: IClientRepository,
  ) {}

  public async execute({ page, limit }: SearchParams): Promise<IOrderPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const orders = await this.ordersRepository.findAll({
      page,
      skip,
      take,
    });
   
    return orders;
  }
}

export default ListOrderService;