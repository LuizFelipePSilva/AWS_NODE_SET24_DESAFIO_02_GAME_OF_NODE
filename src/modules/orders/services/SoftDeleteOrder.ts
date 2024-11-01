import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IShowOrder } from '../domain/models/IShowOrder';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';
import { IOrder } from '../domain/models/IOrder';

@injectable()
class SoftDeleteOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrderRepository,
  ) {}

  public async execute({ id }: IShowOrder): Promise<IOrder> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }
    await this.ordersRepository.delete(id)

    return order
  }
}

export default SoftDeleteOrderService;