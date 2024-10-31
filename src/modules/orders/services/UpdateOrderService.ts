import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IRequestUpdateOrder } from '../domain/models/IRequestUpdate';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';
import { IOrder } from '../domain/models/IOrder';
import fetch from 'node-fetch'

const validUFs = ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'];

@injectable()
class UpdateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrderRepository,
  ) {}

  public async execute({
    id,
    orderDate,
    purchaseDate,
    cep,
    status,
  }: IRequestUpdateOrder): Promise<IOrder> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    if (startDate && startDate < new Date()) {
      throw new AppError('Data Hora Inicial não pode ser menor que hoje.');
    }

    if (endDate && startDate && endDate < startDate) {
      throw new AppError('Data Hora Final não pode ser menor que Data Hora Inicial.');
    }

    let cidade, uf;
    if (cep) {
      const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const cepData = await resp.json();

      if (cepData.erro) {
        throw new AppError('CEP não encontrado.');
      }

      uf = cepData.uf;
      cidade = cepData.localidade;

      if (!validUFs.includes(uf)) {
        throw new AppError('No momento não temos filiais nessa região.');
      }

      order.cep = cep;
      order.city = cidade;
      order.uf = uf;
    }

    // Atualização de status
    if (status) {
      if (status === 'Aprovado') {
        if (order.status !== 'Aberto') {
          throw new AppError('Apenas pedidos abertos podem ser aprovados.');
        }
        if (!order.clientId || !order.carId || !order.orderDate || !order.purchaseDate || !order.cep) {
          throw new AppError('Todos os campos devem estar preenchidos para aprovar o pedido.');
        }
      } else if (status === 'Cancelado') {
        if (order.status !== 'Aberto') {
          throw new AppError('Apenas pedidos abertos podem ser cancelados.');
        }
        order.cancellationDate = new Date();
      }
      order.status = status;
    }


    Object.assign(order, { startDate, endDate });

    await this.ordersRepository.update(order);

    return order;

  }
}

export default UpdateOrderService;
