import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IRequestUpdateOrder } from '../domain/models/IRequestUpdate';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';
import { IOrder } from '../domain/models/IOrder';
import axios from 'axios';
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

    if ( orderDate &&  orderDate < new Date()) {
      throw new AppError('Data Hora Inicial não pode ser menor que hoje.');
    }

    if (purchaseDate &&  orderDate && purchaseDate <  orderDate) {
      throw new AppError('Data Hora Final não pode ser menor que Data Hora Inicial.');
    }

    let cidade, uf;
    if (cep) {
      const resp = await axios(`https://viacep.com.br/ws/${cep}/json/`);
      const cepData = await resp.data
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
        else {
          order.purchaseDate = new Date()
        }

      } else if (status === 'Cancelado') {
        if (order.status !== 'Aberto') {
          throw new AppError('Apenas pedidos abertos podem ser cancelados.');
        }
        else {
          order.cancellationDate = new Date();
        }
        
      }
      order.status = status;
    }

    await this.ordersRepository.update(order);

    return order;

  }
}

export default UpdateOrderService;

