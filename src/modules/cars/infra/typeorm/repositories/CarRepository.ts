import { Repository, EntityRepository, getRepository } from 'typeorm';
import Cars from '../entities/Cars';
import CarItem from '../entities/CarItem';

@EntityRepository(Cars)
class CarRepository extends Repository<Cars> {
  public async findById(id: string): Promise<Cars | undefined> {
    const cars = await this.findOne(id, { relations: ['items'] });
    return cars;
  }

  public async createCars(data: Partial<Cars>, items: string[]): Promise<Cars> {
    const carRepository = getRepository(Cars);
    const carItemRepository = getRepository(CarItem);

    const cars = carRepository.create(data);
    await carRepository.save(cars);

    // Cria e associa itens ao carro
    const carItems = items.map(itemName => carItemRepository.create({ name: itemName, cars }));
    await carItemRepository.save(carItems);

    cars.items = carItems;
    return cars;
  }

  public async updateCars(id: string, data: Partial<Cars>, items?: string[]): Promise<Cars | undefined> {
    const cars = await this.findOne(id, { relations: ['items'] });
    if (!cars) return undefined;

    this.merge(cars, data);
    await this.save(cars);

    if (items) {
      const carItemRepository = getRepository(CarItem);

      // Exclui itens antigos e adiciona os novos
      await carItemRepository.delete({ cars });
      const carItems = items.map(itemName => carItemRepository.create({ name: itemName, cars }));
      await carItemRepository.save(carItems);

      cars.items = carItems;
    }

    return cars;
  }

  public async deleteCar(id: string): Promise<void> {
    await this.update(id, { status: 'excluido' });
  }
}

export default CarRepository;