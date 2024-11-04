import { inject, injectable } from 'tsyringe';
import { ICarRepository } from '@modules/cars/domain/repositories/ICarRepository';
import { ICar } from '@modules/cars/domain/models/ICar';

interface IRequest {
  status?: 'Ativo' | 'Inativo';
  plateEnd?: string;
  mark?: string;
  model?: string;
  items?: string[];
  maxKm?: number;
  yearFrom?: number;
  yearTo?: number;
  priceMin?: number;
  priceMax?: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  page: number;
  limit: number;
}

interface IResponse {
  data: ICar[];
  total: number;
  page: number;
  limit: number;
}

@injectable()
class ListCarsService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

  public async execute({
    status,
    plateEnd,
    mark,
    model,
    items,
    maxKm,
    yearFrom,
    yearTo,
    priceMin,
    priceMax,
    sortField,
    sortOrder,
    page,
    limit,
  }: IRequest): Promise<IResponse> {
    const cars = await this.carRepository.findAllWithFilters({
      status,
      plateEnd,
      mark,
      model,
      items,
      maxKm,
      yearFrom,
      yearTo,
      priceMin,
      priceMax,
      sortField,
      sortOrder,
      page,
      limit,
    });

    return cars;
  }
}

export default ListCarsService;
