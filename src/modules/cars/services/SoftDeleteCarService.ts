import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Car from '@modules/cars/infra/typeorm/entities/Cars';
import { ICarRepository } from '@modules/cars/domain/repositories/ICarRepository';
import { statusEnum } from '@modules/cars/infra/typeorm/entities/Cars';

@injectable()
class SoftDeleteCarService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository
  ) {}

  public async execute(carId: string): Promise<Car> {
    const car = await this.carRepository.findById(carId);
    if (!car) {
      throw new AppError('Carro não encontrado.', 404);
    }

    // Verificar se o carro já está excluído
    if (car.status == statusEnum.excluido) {
      throw new AppError('Carro já está excluído.', 400);
    }

    // Soft delete: Atualizar o status para "Excluído" e setar o updateAt com a data atual
    car.status = statusEnum.excluido;
    car.updatedAt = new Date();

    await this.carRepository.softDelete(carId);

    return car;
  }
}

export default SoftDeleteCarService;
