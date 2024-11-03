import { inject, injectable } from 'tsyringe';
import { ICarRepository } from '@modules/cars/domain/repositories/ICarRepository';
import { ICar } from '@modules/cars/domain/models/ICar';
import { ICarItemRepository } from '../domain/repositories/ICarItemRepository';
import { IResponseCar } from '@modules/cars/domain/models/IResponseCar';
import { IRequestCar } from '@modules/cars/domain/models/IRequestCar';

@injectable()
class ListCarsService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,

    @inject('CarItemRepository')
    private carItemRepository: ICarItemRepository,
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
    page,
    limit,
  }: IRequestCar): Promise<IResponseCar> {
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
      page,
      limit,
    });

    return cars;
  }
}

export default ListCarsService;
