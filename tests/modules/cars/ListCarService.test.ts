import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import ListCarService from '@modules/cars/services/ListCarService';
import CarRepository from '@modules/cars/infra/typeorm/repositories/CarRepository';
import Cars, { statusEnum } from '@modules/cars/infra/typeorm/entities/Cars';
import AppError from '@shared/errors/AppError';
import { IFindAllWithFiltersParams } from '@modules/cars/domain/repositories/ICarRepository';
import { IRequest } from '@modules/cars/services/ListCarService';

jest.mock('@modules/cars/infra/typeorm/repositories/CarRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
            findAllWithFilters: jest.fn(),
        };
      }),
    };
  });

  const carRepository = new CarRepository();

  const listCarService = new ListCarService(carRepository)

describe('ListCarService', () => {
    it('Deve listar todos os clientes', async () => {
        const car: Cars [] = [{
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
        }];

        const spyFindAllWithFilters= jest.spyOn(carRepository, 'findAllWithFilters');
        
        spyFindAllWithFilters.mockImplementationOnce((args: IFindAllWithFiltersParams) => {
            return Promise.resolve(
                {data: car,
                total: 1,
                page: 1,
                limit: 1}
            );
        });

        const requestData = {
            status: 'Ativo',
            plateEnd: '234',
            mark: 'Toyota',
            model: 'Corolla',
            items: [],
            maxKm: 150000,
            yearFrom: 2020,
            yearTo: 2020,
            priceMin: 90000,
            priceMax: 90000,
            sortField: '',
            sortOrder: 'desc',
            page: 1,
            limit: 1,
        } as IRequest;

        const listCar = await listCarService.execute(requestData); 
        expect(listCar);

        jest.clearAllMocks();
    })
})