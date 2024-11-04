import { getRepository, Repository } from 'typeorm';
import Car from '@modules/cars/infra/typeorm/entities/Cars';
import { ICarRepository, IFindAllWithFiltersParams, IFindAllWithFiltersResponse } from '@modules/cars/domain/repositories/ICarRepository';
import { ICar } from '@modules/cars/domain/models/ICar';
import { ICreateCar } from '@modules/cars/domain/models/ICreateCar';
import AppError from '@shared/errors/AppError';
import { statusEnum } from "@modules/cars/infra/typeorm/entities/Cars";

class CarRepository implements ICarRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  public async create(data: ICreateCar): Promise<ICar> {
    const car = this.ormRepository.create(data);
    await this.ormRepository.save(car);
    return car
  }

  public async findById(id: string): Promise<ICar | null> {
    return (await this.ormRepository.findOne(id, {relations: ['items']})) || null;
  }

  public async findByPlate(plate: string): Promise<Car | null> {
    const car = (await this.ormRepository.findOne({ where: { plate } }) || null);
    return car;
  }

  public async update(car: Car): Promise<Car> {
    return await this.ormRepository.save(car);
  }

  public async softDelete(id: string): Promise<void> {
    const car = await this.ormRepository.findOne(id);

    if (!car) {
      throw new AppError('Carro não encontrado');
    }

    car.status = statusEnum.excluido;
    car.updatedAt = new Date();
    await this.ormRepository.save(car);
  }

  public async findAllWithFilters({
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
    sortField = 'price',
    sortOrder = 'asc',
    page,
    limit,
  }: IFindAllWithFiltersParams): Promise<IFindAllWithFiltersResponse> {
    const query = this.ormRepository.createQueryBuilder('car');

    // Filtros
    if (status) query.andWhere('car.status = :status', { status });
    if (plateEnd) query.andWhere('car.plate LIKE :plateEnd', { plateEnd: `%${plateEnd}` });
    if (mark) query.andWhere('car.mark = :mark', { mark });
    if (model) query.andWhere('car.model = :model', { model });
    if (items && items.length > 0) {
      query.andWhere('EXISTS (SELECT 1 FROM car_items item WHERE item.car_id = car.id AND item.name IN (:...items))', { items });
    }
    if (maxKm !== undefined) query.andWhere('car.km <= :maxKm', { maxKm });
    if (yearFrom !== undefined) query.andWhere('car.year >= :yearFrom', { yearFrom });
    if (yearTo !== undefined) query.andWhere('car.year <= :yearTo', { yearTo });
    if (priceMin !== undefined) query.andWhere('car.price >= :priceMin', { priceMin });
    if (priceMax !== undefined) query.andWhere('car.price <= :priceMax', { priceMax });

    // Ordenação
    query.orderBy(`car.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');

    // Paginação
    const total = await query.getCount();
    query.skip((page - 1) * limit).take(limit);

    const cars = await query.getMany();

    return {
      data: cars,
      total,
      page,
      limit,
    };
  }
}

export default CarRepository;
