import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import ShowCarService from '@modules/cars/services/ShowCarService';
import CarRepository from '@modules/cars/infra/typeorm/repositories/CarRepository';
import Cars, { statusEnum } from '@modules/cars/infra/typeorm/entities/Cars';
import AppError from '@shared/errors/AppError';


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

  const carRepository = new CarRepository();

  const showCarService = new ShowCarService(carRepository)

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

        const carId = '2';
    
        const carss = await expect(showCarService.execute({id: carId}))
        .rejects
        .toThrow('Carro não encontrado.')
    
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
    
        const carId = '1';
    
        const showCar = await showCarService.execute({id: carId}); 
        expect(showCar);
    
        jest.clearAllMocks();
    
      });
})