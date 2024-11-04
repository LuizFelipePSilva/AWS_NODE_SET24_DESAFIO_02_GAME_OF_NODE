import { injectable, inject } from 'tsyringe';
import Cars from '@modules/cars/infra/typeorm/entities/Cars';
import { ICarRepository } from '@modules/cars/domain/repositories/ICarRepository';
import AppError from '@shared/errors/AppError';
import { IShowRequestCar } from '../domain/models/IShowRequestCar';

@injectable()
class ShowCarService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository
  ) {}

  public async execute({ id }: IShowRequestCar): Promise<Cars> {
    const car = await this.carRepository.findById(id);

    if (!car) {
      throw new AppError('Carro não encontrado.', 404);
    }

    return car;
  }
}

export default ShowCarService;
