import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import CreateCarService from '@modules/cars/services/CreateCarService';
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
        //   findCarById: jest.fn(),
          findByPlate: jest.fn(),
          create: jest.fn(),
          // Outros métodos podem ser mockados aqui
        };
      }),
    };
  });

  jest.mock('@modules/cars/infra/typeorm/repositories/CarItemRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
          createMany: jest.fn(),
          // Outros métodos podem ser mockados aqui
        };
      }),
    };
  });

  const carRepository = new CarRepository();
  const carItemRepository = new CarItemRepository();

  const createCarService = new CreateCarService(carRepository, carItemRepository)

describe('CreateCarService', () => {

  it('deve dar erro quando o ano for anterior a 11 anos', async () => {

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
    const spyFindByPlate = jest.spyOn(carRepository, 'findByPlate');

    spyFindByPlate.mockImplementationOnce((plate: string) => {
        return Promise.resolve(null);
    });

    jest.spyOn(carRepository, 'create').mockResolvedValue(car);

    const requestData = {
      plate: 'ABC1234',
      mark: 'Toyota',
      model: 'Corolla',
      km: 10000,
      year: 2000,
      items: ['Airbag', 'ABS'],
      price: 80000,
    };

    await expect(createCarService.execute(requestData))
    .rejects
    .toThrow('O ano do carro não pode ser maior que 11 anos.')

    jest.clearAllMocks();
  });

  it('deve dar erro quando a placa já existir', async () => {

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
    const spyFindByPlate = jest.spyOn(carRepository, 'findByPlate');

    spyFindByPlate.mockImplementationOnce((plate: string) => {
        return Promise.resolve(car);
    });

    jest.spyOn(carRepository, 'create').mockResolvedValue(car);
    //jest.spyOn(carItemRepository, 'createMany').mockResolvedValue(undefined);

    const requestData = {
      plate: 'ABC1234',
      mark: 'Toyota',
      model: 'Corolla',
      km: 10000,
      year: 2020,
      items: ['Airbag', 'ABS'],
      price: 80000,
    };

    await expect(createCarService.execute(requestData)).rejects.toThrow('Já existe um carro cadastrado com esta placa.');

  });

  it('deve dar erro quando a quantidade de itens for maior que 5', async () => {

    const car: Cars = {
        id: '1',
        plate: 'ABC1234',
        mark: 'Toyota',
        model: 'Corolla',
        km: 10000,
        year: 2020,
        price: 80000,
        status: statusEnum.ativo,
        items: [],
        orders: [],
        createdAt: new Date(),
        updatedAt: new Date(), 
    };

    const uniqueItems = Array.from(new Set(car.items));
    
    const carItems = uniqueItems.map((itemName) => ({
        id: 1,
        name: itemName,
        cars: car,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    // Simula a resposta de findByPlate para indicar que a placa não existe
    const spyFindByPlate = jest.spyOn(carRepository, 'findByPlate');

    spyFindByPlate.mockImplementationOnce((plate: string) => {
        return Promise.resolve(null);
    });

    jest.spyOn(carRepository, 'create').mockResolvedValue(car);
    jest.spyOn(carItemRepository, 'createMany').mockResolvedValue(uniqueItems);

    const requestData = {
        plate: 'ABC1234',
        mark: 'Toyota',
        model: 'Corolla',
        km: 10000,
        year: 2020,
        items: ['Airbag', 'ABS', 'Ar', 'Teto Solar', 'Mala', 'Freios'],
        price: 80000,
    };

    

    await expect(createCarService.execute(requestData)).rejects.toThrow('O número máximo de itens é 5.');

  });

  it('deve passar por todos as validações e salvar o carro com os itens', async () => {

    const car: Cars = {
        id: '1',
        plate: 'ABC1234',
        mark: 'Toyota',
        model: 'Corolla',
        km: 10000,
        year: 2020,
        price: 80000,
        status: statusEnum.ativo,
        items: [],
        orders: [],
        createdAt: new Date(),
        updatedAt: new Date(), 
    };

    const uniqueItems = Array.from(new Set(car.items));
    
    const carItems = uniqueItems.map((itemName) => ({
        id: 1,
        name: itemName,
        cars: car,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    // Simula a resposta de findByPlate para indicar que a placa não existe
    const spyFindByPlate = jest.spyOn(carRepository, 'findByPlate');

    spyFindByPlate.mockImplementationOnce((plate: string) => {
        return Promise.resolve(null);
    });

    jest.spyOn(carRepository, 'create').mockResolvedValue(car);
    jest.spyOn(carItemRepository, 'createMany').mockResolvedValue(uniqueItems);

    const requestData = {
        plate: 'ABC1234',
        mark: 'Toyota',
        model: 'Corolla',
        km: 10000,
        year: 2020,
        items: ['Airbag', 'ABS', 'Ar'],
        price: 80000,
    };
    const saveCar = await createCarService.execute(requestData); 
    expect(saveCar);
  });

});
