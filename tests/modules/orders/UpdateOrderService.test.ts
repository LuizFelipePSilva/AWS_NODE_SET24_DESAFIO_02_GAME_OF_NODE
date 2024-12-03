import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import UpdateOrderService from '@modules/orders/services/UpdateOrderService';
import OrderRepository from '@modules/orders/infra/typeorm/repositories/OrderRepository';
import ClientRepository from '@modules/clients/infra/typeorm/repositories/ClientRepository';
import CarRepository from '@modules/cars/infra/typeorm/repositories/CarRepository';
import { Order } from '@modules/orders/infra/typeorm/entities/Order';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import Cars, { statusEnum } from '@modules/cars/infra/typeorm/entities/Cars';
import AppError from '@shared/errors/AppError';
import { IRequestUpdateOrder } from '@modules/orders/domain/models/IRequestUpdate';

jest.mock('@modules/orders/infra/typeorm/repositories/OrderRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
          findById: jest.fn(),
          update: jest.fn(),
        };
      }),
    };
  });

  const orderRepository = new OrderRepository();

  const updateOrderService = new UpdateOrderService(orderRepository);

describe('UpdateOrder', () => {

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

    const client: Client = {
        id: '1',
        fullName: 'Rigoberto Fernandes',
        email: 'rigoberto@gmail.com',
        cpf: '123.456.789-09',
        phone: '84988884927',
        birthDate: new Date(),
        orders: [],
        createdAt: new Date(),
        deletedAt: new Date(),
    }

    const car: Cars = {
        id: '1',
        plate: 'ABC1234',
        mark: 'Toyota',
        model: 'Corolla',
        km: 10000,
        year: 2000,
        price: 80000,
        status: statusEnum.ativo,
        items: [],
        orders: [],
        createdAt: new Date(),
        updatedAt: new Date(), 
    };

    const spyFindById = jest.spyOn(orderRepository, 'findById');

    spyFindById.mockImplementationOnce((id: string) => {
        return Promise.resolve(null);
    });

    jest.spyOn(orderRepository, 'update').mockResolvedValue(order);

    const requestData = {
        id: '2',
        orderDate: new Date(),
        purchaseDate: new Date(),
        cep: '5963-000',
        status: 'Aberto'
    } as IRequestUpdateOrder;

    await expect(updateOrderService.execute(requestData))
    .rejects
    .toThrow('Order not found.')

    jest.clearAllMocks();

  });

  it('deve dar erro quando a data inicial for menor que a data atual', async () => {

    const order: Order = {
        id: '1',
        clientId: "1",
        clientName:"Rigoberto Fernandes",
        clientEmail: "rigoberto@gmail.com",
        orderDate: new Date(),
        status: "Aberto",
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

    const client: Client = {
        id: '1',
        fullName: 'Rigoberto Fernandes',
        email: 'rigoberto@gmail.com',
        cpf: '123.456.789-09',
        phone: '84988884927',
        birthDate: new Date(),
        orders: [],
        createdAt: new Date(),
        deletedAt: new Date(),
    }

    const car: Cars = {
        id: '1',
        plate: 'ABC1234',
        mark: 'Toyota',
        model: 'Corolla',
        km: 10000,
        year: 2000,
        price: 80000,
        status: statusEnum.ativo,
        items: [],
        orders: [],
        createdAt: new Date(),
        updatedAt: new Date(), 
    };

    const spyFindById = jest.spyOn(orderRepository, 'findById');

    spyFindById.mockImplementationOnce((id: string) => {
        return Promise.resolve(order);
    });

    //jest.spyOn(orderRepository, 'update').mockResolvedValue(order);

    const requestData = {
        id: '1',
        orderDate: new Date(new Date().getTime() - 3600000), // 1 hora no futuro
        purchaseDate: new Date(new Date().getTime() + 7200000), 
        cep: '59630-000', 
        status: 'Aberto'
    } as IRequestUpdateOrder;

    await expect(updateOrderService.execute(requestData))
    .rejects
    .toThrow('Data Hora Inicial não pode ser menor que hoje.')

    jest.clearAllMocks();

  });

  it('deve dar erro quando a data final for menor que a data inicial', async () => {

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

    const client: Client = {
        id: '1',
        fullName: 'Rigoberto Fernandes',
        email: 'rigoberto@gmail.com',
        cpf: '123.456.789-09',
        phone: '84988884927',
        birthDate: new Date(),
        orders: [],
        createdAt: new Date(),
        deletedAt: new Date(),
    }

    const car: Cars = {
        id: '1',
        plate: 'ABC1234',
        mark: 'Toyota',
        model: 'Corolla',
        km: 10000,
        year: 2000,
        price: 80000,
        status: statusEnum.ativo,
        items: [],
        orders: [],
        createdAt: new Date(),
        updatedAt: new Date(), 
    };

    const spyFindById = jest.spyOn(orderRepository, 'findById');

    spyFindById.mockImplementationOnce((id: string) => {
        return Promise.resolve(order);
    });

    jest.spyOn(orderRepository, 'update').mockResolvedValue(order);

    const requestData = {
        id: '1',
        orderDate: new Date(new Date().getTime() + 3600000), 
        purchaseDate: new Date(new Date().getTime() - 7200000), 
        cep: '59630-000',
        status: 'Aberto'
    } as IRequestUpdateOrder;

    await expect(updateOrderService.execute(requestData))
    .rejects
    .toThrow('Data Hora Final não pode ser menor que Data Hora Inicial.')

    jest.clearAllMocks();

  });

  it('deve dar erro quando o pedido for modificado de aprovado para algo diferente de aberto', async () => {

    const order: Order = {
        id: '1',
        clientId: "1",
        clientName:"Rigoberto Fernandes",
        clientEmail: "rigoberto@gmail.com",
        orderDate: new Date(),
        status: 'Aprovado',
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

    const client: Client = {
        id: '1',
        fullName: 'Rigoberto Fernandes',
        email: 'rigoberto@gmail.com',
        cpf: '123.456.789-09',
        phone: '84988884927',
        birthDate: new Date(),
        orders: [],
        createdAt: new Date(),
        deletedAt: new Date(),
    }

    const car: Cars = {
        id: '1',
        plate: 'ABC1234',
        mark: 'Toyota',
        model: 'Corolla',
        km: 10000,
        year: 2000,
        price: 80000,
        status: statusEnum.ativo,
        items: [],
        orders: [],
        createdAt: new Date(),
        updatedAt: new Date(), 
    };

    const spyFindById = jest.spyOn(orderRepository, 'findById');

    spyFindById.mockImplementationOnce((id: string) => {
        return Promise.resolve(order);
    });

    //jest.spyOn(orderRepository, 'update').mockResolvedValue(order);

    const requestData = {
        id: '1',
        orderDate: new Date(new Date().getTime() + 3600000),
        purchaseDate: new Date(new Date().getTime() + 7200000),
        cep: '59663-000',
        status: 'Aprovado'
    } as IRequestUpdateOrder;

    await expect(updateOrderService.execute(requestData))
    .rejects
    .toThrow('Apenas pedidos abertos podem ser aprovados.')

    jest.clearAllMocks();

  });

  it('deve dar erro quando o pedido for modificado para cancelado e não estiver em aberto', async () => {

    const order: Order = {
        id: '1',
        clientId: "1",
        clientName:"Rigoberto Fernandes",
        clientEmail: "rigoberto@gmail.com",
        orderDate: new Date(),
        status: 'Aprovado',
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

    const client: Client = {
        id: '1',
        fullName: 'Rigoberto Fernandes',
        email: 'rigoberto@gmail.com',
        cpf: '123.456.789-09',
        phone: '84988884927',
        birthDate: new Date(),
        orders: [],
        createdAt: new Date(),
        deletedAt: new Date(),
    }

    const car: Cars = {
        id: '1',
        plate: 'ABC1234',
        mark: 'Toyota',
        model: 'Corolla',
        km: 10000,
        year: 2000,
        price: 80000,
        status: statusEnum.ativo,
        items: [],
        orders: [],
        createdAt: new Date(),
        updatedAt: new Date(), 
    };

    const spyFindById = jest.spyOn(orderRepository, 'findById');

    spyFindById.mockImplementationOnce((id: string) => {
        return Promise.resolve(order);
    });

    jest.spyOn(orderRepository, 'update').mockResolvedValue(order);

    const requestData = {
        id: '1',
        orderDate: new Date(new Date().getTime() + 3600000),
        purchaseDate: new Date(new Date().getTime() + 7200000),
        cep: '59663-000',
        status: 'Cancelado'
    } as IRequestUpdateOrder;

    await expect(updateOrderService.execute(requestData))
    .rejects
    .toThrow('Apenas pedidos abertos podem ser cancelados.')

    jest.clearAllMocks();

    });

  it('deve passar por todas as validações e salvar o pedido', async () => {

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

    const client: Client = {
        id: '1',
        fullName: 'Rigoberto Fernandes',
        email: 'rigoberto@gmail.com',
        cpf: '123.456.789-09',
        phone: '84988884927',
        birthDate: new Date(),
        orders: [],
        createdAt: new Date(),
        deletedAt: new Date(),
    }

    const car: Cars = {
        id: '1',
        plate: 'ABC1234',
        mark: 'Toyota',
        model: 'Corolla',
        km: 10000,
        year: 2000,
        price: 80000,
        status: statusEnum.ativo,
        items: [],
        orders: [],
        createdAt: new Date(),
        updatedAt: new Date(), 
    };

    const spyFindById = jest.spyOn(orderRepository, 'findById');

    spyFindById.mockImplementationOnce((id: string) => {
        return Promise.resolve(order);
    });

    jest.spyOn(orderRepository, 'update').mockResolvedValue(order);

    const requestData = {
        id: '1',
        orderDate: new Date(new Date().getTime() + 3600000),
        purchaseDate: new Date(new Date().getTime() + 7200000),
        cep: '59663-000',
        status: 'Aprovado'
    } as IRequestUpdateOrder;

    const saveOrder = await updateOrderService.execute(requestData); 
    expect(saveOrder);

    jest.clearAllMocks();

  });
});
