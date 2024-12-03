import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import CreateOrderService from '@modules/orders/services/CreateOrder';
import OrderRepository from '@modules/orders/infra/typeorm/repositories/OrderRepository';
import ClientRepository from '@modules/clients/infra/typeorm/repositories/ClientRepository';
import CarRepository from '@modules/cars/infra/typeorm/repositories/CarRepository';
import { Order } from '@modules/orders/infra/typeorm/entities/Order';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import Cars, { statusEnum } from '@modules/cars/infra/typeorm/entities/Cars';
import AppError from '@shared/errors/AppError';

jest.mock('@modules/orders/infra/typeorm/repositories/OrderRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
          findByClient: jest.fn(),
          create: jest.fn(),
        };
      }),
    };
  });

jest.mock('@modules/clients/infra/typeorm/repositories/ClientRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
            findById: jest.fn(),
        };
      }),
    };
  });

jest.mock('@modules/cars/infra/typeorm/repositories/CarRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
            findById: jest.fn(),
        };
      }),
    };
  });

  const orderRepository = new OrderRepository();
  const clientRepository = new ClientRepository();
  const carsRepository = new CarRepository();

  const createOrderService = new CreateOrderService(orderRepository, clientRepository, carsRepository);

describe('CreateOrder', () => {

  it('deve dar erro quando o cliente não existir', async () => {

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

    const spyClientFindById = jest.spyOn(clientRepository, 'findById');
    const spyOrderFindByClient = jest.spyOn(orderRepository, 'findByClient');
    const spyCarFindById = jest.spyOn(carsRepository, 'findById');

    jest.spyOn(orderRepository, 'create').mockResolvedValue(order);

    spyClientFindById.mockImplementationOnce((clientId: string) => {
        return Promise.resolve(undefined);
    });

    spyCarFindById.mockImplementationOnce((carId: string) => {
        return Promise.resolve(car);
    });

    const requestData = {
        clientId: '2',
        carId: '1',
        cep: '12345-678',
        value: 90.000
    };

    await expect(createOrderService.execute(requestData))
    .rejects
    .toThrow('Cliente não existe')

    jest.clearAllMocks();

  });

  it('deve dar erro quando o cliente já tiver algum pedido em aberto', async () => {

    const order: Order [] = [{
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
    }];

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

    const spyClientFindById = jest.spyOn(clientRepository, 'findById');
    const spyOrderFindByClient = jest.spyOn(orderRepository, 'findByClient');
    const spyCarFindById = jest.spyOn(carsRepository, 'findById');

    jest.spyOn(orderRepository, 'create').mockResolvedValue(order[0]);

    spyClientFindById.mockImplementationOnce((clientId: string) => {
        return Promise.resolve(client);
    });

    spyCarFindById.mockImplementationOnce((carId: string) => {
        return Promise.resolve(car);
    });

    spyOrderFindByClient.mockImplementationOnce((clientId: string) => {
        return Promise.resolve(order);
    });

    const requestData = {
        clientId: '1',
        carId: '1',
        cep: '12345-678',
        value: 90.000
    };

    await expect(createOrderService.execute(requestData))
    .rejects
    .toThrow('Cliente tem um pedido em aberto')

    jest.clearAllMocks();

  });

  it('deve dar erro quando o carro não existir', async () => {

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

    const spyClientFindById = jest.spyOn(clientRepository, 'findById');
    const spyOrderFindByClient = jest.spyOn(orderRepository, 'findByClient');
    const spyCarFindById = jest.spyOn(carsRepository, 'findById');

    jest.spyOn(orderRepository, 'create').mockResolvedValue(order);

    spyClientFindById.mockImplementationOnce((clientId: string) => {
        return Promise.resolve(client);
    });

    spyCarFindById.mockImplementationOnce((carId: string) => {
        return Promise.resolve(null);
    });

    const requestData = {
        clientId: '1',
        carId: '2',
        cep: '12345-678',
        value: 90.000
    };

    await expect(createOrderService.execute(requestData))
    .rejects
    .toThrow('Carro não existe')

    jest.clearAllMocks();

  });

  it('deve dar erro quando o cep não for informado', async () => {

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

    const spyClientFindById = jest.spyOn(clientRepository, 'findById');
    const spyOrderFindByClient = jest.spyOn(orderRepository, 'findByClient');
    const spyCarFindById = jest.spyOn(carsRepository, 'findById');

    jest.spyOn(orderRepository, 'create').mockResolvedValue(order);

    spyClientFindById.mockImplementationOnce((clientId: string) => {
        return Promise.resolve(client);
    });

    spyCarFindById.mockImplementationOnce((carId: string) => {
        return Promise.resolve(car);
    });

    const requestData = {
        clientId: '1',
        carId: '1',
        cep: '',
        value: 90.000
    };

    await expect(createOrderService.execute(requestData))
    .rejects
    .toThrow('Nenhum cep foi informado')

    jest.clearAllMocks();

  });

  it('deve dar erro quando o cep for invalido', async () => {

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

    const spyClientFindById = jest.spyOn(clientRepository, 'findById');
    const spyOrderFindByClient = jest.spyOn(orderRepository, 'findByClient');
    const spyCarFindById = jest.spyOn(carsRepository, 'findById');

    jest.spyOn(orderRepository, 'create').mockResolvedValue(order);

    spyClientFindById.mockImplementationOnce((clientId: string) => {
        return Promise.resolve(client);
    });

    spyCarFindById.mockImplementationOnce((carId: string) => {
        return Promise.resolve(car);
    });

    const requestData = {
        clientId: '1',
        carId: '1',
        cep: '589',
        value: 90.000
    };

    await expect(createOrderService.execute(requestData))
    .rejects
    .toThrow('Cep Invalido ou foi digitado incorretamente.')

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

    const spyClientFindById = jest.spyOn(clientRepository, 'findById');
    const spyOrderFindByClient = jest.spyOn(orderRepository, 'findByClient');
    const spyCarFindById = jest.spyOn(carsRepository, 'findById');

    jest.spyOn(orderRepository, 'create').mockResolvedValue(order);

    spyClientFindById.mockImplementationOnce((clientId: string) => {
        return Promise.resolve(client);
    });

    spyCarFindById.mockImplementationOnce((carId: string) => {
        return Promise.resolve(car);
    });

    const requestData = {
        clientId: '1',
        carId: '1',
        cep: '59628030',
        value: 90.000
    };

    const saveOrder = await createOrderService.execute(requestData); 
    expect(saveOrder);

    jest.clearAllMocks();

  });
});
