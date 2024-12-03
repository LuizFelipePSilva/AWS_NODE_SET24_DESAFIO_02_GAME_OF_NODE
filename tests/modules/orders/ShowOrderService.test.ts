import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import OrderRepository from '@modules/orders/infra/typeorm/repositories/OrderRepository';
import ClientRepository from '@modules/clients/infra/typeorm/repositories/ClientRepository';
import CarRepository from '@modules/cars/infra/typeorm/repositories/CarRepository';
import { Order } from '@modules/orders/infra/typeorm/entities/Order';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import Cars, { statusEnum } from '@modules/cars/infra/typeorm/entities/Cars';
import AppError from '@shared/errors/AppError';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import { IShowOrderResponse } from '@modules/orders/domain/models/IShowOrderResponse';

jest.mock('@modules/orders/infra/typeorm/repositories/OrderRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
            findById: jest.fn(),
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

  const showOrderService = new ShowOrderService(orderRepository, clientRepository, carsRepository);

describe('ShowOrderService', () => {

  it('deve dar erro quando o pedido não for encontrado', async () => {
  
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
            client: client,
            car: car,
            deletedAt: new Date()
        };

        const spyClientFindById = jest.spyOn(clientRepository, 'findById');
        const spyOrderFindById = jest.spyOn(orderRepository, 'findById');
        const spyCarFindById = jest.spyOn(carsRepository, 'findById');

        spyOrderFindById.mockImplementationOnce((id: string) => {
            return Promise.resolve( null );
        });

        spyCarFindById.mockImplementationOnce((id: string) => {
            return Promise.resolve(car);
        });
        
        spyClientFindById.mockImplementationOnce((id: string) => {
            return Promise.resolve(client);
        });

        const requestData = {
            id: '2'
        };

        await expect(showOrderService.execute(requestData))
        .rejects
        .toThrow('Order not found.')

        jest.clearAllMocks();
    });

    it('deve dar erro quando o cliente não for encontrado', async () => {
  
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
            client: client,
            car: car,
            deletedAt: new Date()
        };

        const spyClientFindById = jest.spyOn(clientRepository, 'findById');
        const spyOrderFindById = jest.spyOn(orderRepository, 'findById');
        const spyCarFindById = jest.spyOn(carsRepository, 'findById');

        spyOrderFindById.mockImplementationOnce((id: string) => {
            return Promise.resolve( order );
        });

        spyCarFindById.mockImplementationOnce((id: string) => {
            return Promise.resolve(car);
        });
        
        spyClientFindById.mockImplementationOnce((id: string) => {
            return Promise.resolve(undefined);
        });

        const requestData = {
            id: '1'
        };

        await expect(showOrderService.execute(requestData))
        .rejects
        .toThrow('Client not found.')

        jest.clearAllMocks();
    });

    it('deve dar erro quando o carro não for encontrado', async () => {
  
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
            client: client,
            car: car,
            deletedAt: new Date()
        };

        const spyClientFindById = jest.spyOn(clientRepository, 'findById');
        const spyOrderFindById = jest.spyOn(orderRepository, 'findById');
        const spyCarFindById = jest.spyOn(carsRepository, 'findById');

        spyOrderFindById.mockImplementationOnce((id: string) => {
            return Promise.resolve( order );
        });

        spyCarFindById.mockImplementationOnce((id: string) => {
            return Promise.resolve(null);
        });
        
        spyClientFindById.mockImplementationOnce((id: string) => {
            return Promise.resolve(client);
        });

        const requestData = {
            id: '1'
        };

        await expect(showOrderService.execute(requestData))
        .rejects
        .toThrow('Car not found.')

        jest.clearAllMocks();
    });

    it('deve passar por todas as validações e retornar um pedido', async () => {
  
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
            client: client,
            car: car,
            deletedAt: new Date()
        };

        const spyClientFindById = jest.spyOn(clientRepository, 'findById');
        const spyOrderFindById = jest.spyOn(orderRepository, 'findById');
        const spyCarFindById = jest.spyOn(carsRepository, 'findById');

        spyOrderFindById.mockImplementationOnce((id: string) => {
            return Promise.resolve( order );
        });

        spyCarFindById.mockImplementationOnce((id: string) => {
            return Promise.resolve(car);
        });
        
        spyClientFindById.mockImplementationOnce((id: string) => {
            return Promise.resolve(client);
        });

        const requestData = {
            id: '1'
        };

        const orderDelete = await showOrderService.execute(requestData); 
        expect(orderDelete);
    
        jest.clearAllMocks();
    });

});