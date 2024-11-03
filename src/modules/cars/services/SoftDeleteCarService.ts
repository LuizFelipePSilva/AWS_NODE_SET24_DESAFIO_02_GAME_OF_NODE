import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Car from '@modules/cars/infra/typeorm/entities/Cars';
import { ICarRepository } from '@modules/cars/domain/repositories/ICarRepository';

@injectable()
class SoftDeleteCarService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

  public async execute(carId: string): Promise<Car> {
    
    const car = await this.carRepository.findById(carId);
    if (!car) {
      throw new AppError('Carro não encontrado.', 404);
    }

    // Verificar se o carro já está excluído
    if (car.status === 'Excluido') {
      throw new AppError('Carro já está excluído.', 400);
    }

    // Soft delete: Atualizar o status para "Excluído" e setar o updateAt com a data atual
    car.status = 'Excluido';
    car.updatedAt = new Date();

    
    await this.carRepository.update(car);

    return car;
  }
}

export default SoftDeleteCarService;
