import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IShowOrder } from '../domain/models/IShowOrder';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';
import { IShowOrderResponse } from '../domain/models/IShowOrderResponse';
import { IClientRepository } from '@modules/clients/domain/repositories/IClientRepository';
import { ICarRepository } from '@modules/cars/domain/repositories/ICarRepository';

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrderRepository,
    @inject('ClientRepository')
    private clientRepository: IClientRepository,
    @inject('CarRepository')
    private carsRepository: ICarRepository
  ) {}

  public async execute({ id }: IShowOrder): Promise<IShowOrderResponse> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    const { clientId, carId } = order;
    const clientExist = await this.clientRepository.findById(clientId);
    const carExist = await this.carsRepository.findById(carId);

    if (!clientExist) {
      throw new AppError('Client not found.');
    }

    if (!carExist) {
      throw new AppError('Car not found.');
    }

    return {
      order: {
        id: id,
        clientId: order.clientId,
        clientName: clientExist.fullName,
        clientEmail: clientExist.email,
        orderDate: order.orderDate,
        status: order.status,
        cep: order.cep,
        city: order.city,
        uf: order.uf,
        totalValue: order.totalValue,
        carId: order.carId,
        purchaseDate: order.purchaseDate,
        cancellationDate: order.cancellationDate,
      },
      client: {
        id: clientExist.id,
        fullName: clientExist.fullName,
        cpf: clientExist.cpf,
        email: clientExist.email,
      },
      car: {
        id: carExist.id,
        plate: carExist.plate,
        mark: carExist.mark,
        model: carExist.model,
        km: carExist.km,
        year: carExist.year,
        items: carExist.items.map((item) => ({ name: item.name })), // Adapta os itens do carro
      },
    };
  }
}

export default ShowOrderService;
