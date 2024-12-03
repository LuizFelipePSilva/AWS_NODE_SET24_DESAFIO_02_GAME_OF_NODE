import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import SoftDeleteOrder from '@modules/orders/services/SoftDeleteOrder';
import OrderRepository from '@modules/orders/infra/typeorm/repositories/OrderRepository';
import { Order } from '@modules/orders/infra/typeorm/entities/Order';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import Cars, { statusEnum } from '@modules/cars/infra/typeorm/entities/Cars';
import AppError from '@shared/errors/AppError';


jest.mock('@modules/orders/infra/typeorm/repositories/OrderRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
          findById: jest.fn(),
          delete: jest.fn(),
        };
      }),
    };
  });

  const orderRepository = new OrderRepository();

  const softDeleteOrder = new SoftDeleteOrder(orderRepository)

describe('SoftDelteOrder', () => {

  it('deve dar erro quando o pedido não for encontrado', async () => {

    const order: Order = {
        id: '1',
        clientId: "1",
        clientName:"Rigoberto Fernandes",
        clientEmail: "rigoberto@gmail.com",
        orderDate: new Date(),
        status: 'Aberto',
        cep: "12345-678",
        city: "Mossoró",
        uf: "RN",
        totalValue: 90.000,
        carId: "1",
        purchaseDate: new Date(),
        cancellationDate: new Date(),
        client: new Client(),
        car: new Cars(),
        deletedAt: new Date()
    };

    const spyFindById = jest.spyOn(orderRepository, 'findById');

    spyFindById.mockImplementationOnce((id: string) => {
        return Promise.resolve(null);
    });

    const carId = {
        id: '2'
    };

    await expect(softDeleteOrder.execute(carId))
    .rejects
    .toThrow('Order not found.')

    jest.clearAllMocks();

  });

  it('deve deletar o pedido', async () => {

    const order: Order = {
        id: '1',
        clientId: "1",
        clientName:"Rigoberto Fernandes",
        clientEmail: "rigoberto@gmail.com",
        orderDate: new Date(),
        status: 'Aberto',
        cep: "12345-678",
        city: "Mossoró",
        uf: "RN",
        totalValue: 90.000,
        carId: "1",
        purchaseDate: new Date(),
        cancellationDate: new Date(),
        client: new Client(),
        car: new Cars(),
        deletedAt: new Date()
    };

    const spyFindById = jest.spyOn(orderRepository, 'findById');

    spyFindById.mockImplementationOnce((id: string) => {
        return Promise.resolve(order);
    });

    const carId = {
        id: '1'
    };

    const orderDelete = await softDeleteOrder.execute(carId); 
    expect(orderDelete);

    jest.clearAllMocks();

  });
});
