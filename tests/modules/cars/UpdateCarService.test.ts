import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import UpdateCarService from '@modules/cars/services/UpdateCarService';
import CarRepository from '@modules/cars/infra/typeorm/repositories/CarRepository';
import CarItemRepository from '@modules/cars/infra/typeorm/repositories/CarItemRepository';
import Cars, { statusEnum } from '@modules/cars/infra/typeorm/entities/Cars';
import AppError from '@shared/errors/AppError';
import CarItem from '@modules/cars/infra/typeorm/entities/CarItem';


jest.mock('@modules/cars/infra/typeorm/repositories/CarRepository', () => {
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

  jest.mock('@modules/cars/infra/typeorm/repositories/CarItemRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
          deleteByCar: jest.fn(),
          createMany: jest.fn(),
        };
      }),
    };
  });

  const carRepository = new CarRepository();
  const carItemRepository = new CarItemRepository();

  const updateCarService = new UpdateCarService(carRepository, carItemRepository)

describe('UpdateCarService', () => {

  it('deve dar erro quando o carro não for encontrado', async () => {

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

    // Simula a resposta de findByPlate para indicar que a placa não existe
    const spyFindBy = jest.spyOn(carRepository, 'findById');

    spyFindBy.mockImplementationOnce((plate: string) => {
        return Promise.resolve(null);
    });

    //jest.spyOn(carRepository, 'update').mockResolvedValue(car);
    // jest.spyOn(carItemRepository, 'createMany').mockResolvedValue(undefined);

    const requestData = {
      id: '2',
    };

    await expect(updateCarService.execute(requestData))
    .rejects
    .toThrow('Carro não encontrado.')

    jest.clearAllMocks();
  });

  it('deve dar erro quando o carro estiver com status de excluído', async () => {

    const car: Cars = {
        id: '1',
        plate: 'ABC1234',
        mark: 'Toyota',
        model: 'Corolla',
        km: 10000,
        year: 2000,
        price: 80000,
        status: statusEnum.excluido,
        items: [],
        orders: [],
        createdAt: new Date(),
        updatedAt: new Date(), 
    };

    // Simula a resposta de findByPlate para indicar que a placa não existe
    const spyFindById = jest.spyOn(carRepository, 'findById');

    spyFindById.mockImplementationOnce((id: string) => {
        return Promise.resolve(car);
    });

    const requestData = {
      id: '1',
    };

    await expect(updateCarService.execute(requestData)).rejects.toThrow('Não é possível atualizar um carro com status "Excluido".');
    jest.clearAllMocks();

  });

  it('deve dar update no carro após passar por todas as validações', async () => {

    const carItem: CarItem [] = [{
        id: '1',
        name: 'Ar Condicionado',
        cars: new Cars(),
        createdAt: new Date(),
        updatedAt: new Date()
    }]

    const car: Cars = {
        id: '1',
        plate: 'ABC1234',
        mark: 'Toyota',
        model: 'Corolla',
        km: 10000,
        year: 2020,
        price: 80000,
        status: statusEnum.ativo,
        items: carItem,
        orders: [],
        createdAt: new Date(),
        updatedAt: new Date(), 
    };

    const uniqueItems = Array.from(new Set(car.items));

    // Simula a resposta de findByPlate para indicar que a placa não existe
    const spyFindBy = jest.spyOn(carRepository, 'findById');

    
    spyFindBy.mockImplementationOnce((id: string) => {
        return Promise.resolve(car);
    });

    jest.spyOn(carItemRepository, 'deleteByCar').mockResolvedValue();
    jest.spyOn(carItemRepository, 'createMany').mockResolvedValue(uniqueItems);
    jest.spyOn(carRepository, 'update').mockResolvedValue(car);

    const requestData = {
        id: '1',
        plate: 'ABC1234',
        mark: 'Toyota',
        model: 'Corolla',
        km: 10000,
        year: 2020,
        items: ['Airbag', 'ABS', 'Ar', 'Freios'],
        price: 80000,
    };

    const saveCar = await updateCarService.execute(requestData); 
    expect(saveCar);
    jest.clearAllMocks();

  });

});
