import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import SoftDeleteCarService from '@modules/cars/services/SoftDeleteCarService';
import CarRepository from '@modules/cars/infra/typeorm/repositories/CarRepository';
import Cars, { statusEnum } from '@modules/cars/infra/typeorm/entities/Cars';
import AppError from '@shared/errors/AppError';


jest.mock('@modules/cars/infra/typeorm/repositories/CarRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
          findById: jest.fn(),
          softDelete: jest.fn(),
        };
      }),
    };
  });

  const carRepository = new CarRepository();

  const softDeleteCarService = new SoftDeleteCarService(carRepository)

describe('SoftDelteCarService', () => {

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

    const spyFindById = jest.spyOn(carRepository, 'findById');

    spyFindById.mockImplementationOnce((id: string) => {
        return Promise.resolve(null);
    });

    const carId = '1';

    await expect(softDeleteCarService.execute(carId))
    .rejects
    .toThrow('Carro não encontrado.')

    jest.clearAllMocks();

  });

  it('deve dar erro quando o carro já estiver excluído', async () => {

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

    const spyFindById = jest.spyOn(carRepository, 'findById');

    spyFindById.mockImplementationOnce((id: string) => {
        return Promise.resolve(car);
    });

    const carId = '1';

    await expect(softDeleteCarService.execute(carId))
    .rejects
    .toThrow('Carro já está excluído.')

    jest.clearAllMocks();

  });

  it('deve passar por todas as validações e excluir o carro', async () => {

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

    const spyFindById = jest.spyOn(carRepository, 'findById');

    spyFindById.mockImplementationOnce((id: string) => {
        return Promise.resolve(car);
    });

    jest.spyOn(carRepository, 'softDelete').mockResolvedValue();

    const carId = '1';

    const carDelete = await softDeleteCarService.execute(carId); 
    expect(carDelete);

    jest.clearAllMocks();

  });

});
