import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IShowOrder } from '../domain/models/IShowOrder';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';
import { IOrder } from '../domain/models/IOrder';
import { IShowOrderResponse } from '../domain/models/IShowOrderResponse';

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrderRepository,
    @inject('ClientRepository')
    private clientRepository: IClientRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({ id }: IShowOrder): Promise<IShowOrderResponse> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }
    const {clientId, carId} = order
    const clientExist = await this.clientRepository.findById(clientId)
    const carExist = await this.carsRepository.findById(carId)

    return {order, clientExist ,carExist}
  }
}

export default ShowOrderService;