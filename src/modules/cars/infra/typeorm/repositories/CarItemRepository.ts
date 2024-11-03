import { Repository, getRepository } from 'typeorm';
import CarItem from '../entities/CarItem';
import { ICarItem } from '@modules/cars/domain/models/ICarItem';
import { ICarItemRepository } from '@modules/cars/domain/repositories/ICarItemRepository';

class CarItemRepository implements ICarItemRepository {
  
  private ormRepository: Repository<CarItem>;

  constructor() {
    this.ormRepository = getRepository(CarItem);
  }
  
  public async createMany(data: ICarItem[]): Promise<ICarItem[]> {
    // Cria instâncias dos itens de carro a partir dos dados fornecidos
    const carItems = this.ormRepository.create(data);

    // Salva todos os itens de uma vez
    await this.ormRepository.save(carItems);

    return carItems;
  }

  public async findById(id: string): Promise<ICarItem | null> {
    const carItem = await this.ormRepository.findOne(id);
    return carItem || null;
  }

  public async create(item: ICarItem): Promise<ICarItem> {
    const carItem = this.ormRepository.create(item);
    await this.ormRepository.save(carItem);
    return carItem;
  }

  public async update(item: ICarItem): Promise<ICarItem> {
    return this.ormRepository.save(item);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findByName(name: string): Promise<ICarItem | undefined> {
    return this.ormRepository.findOne({ where: { name } });
  }

  public async findByCar(carId: string): Promise<ICarItem[]> {
    return this.ormRepository.find({ where: { car_id: carId } });
  }

  public async deleteByCar(carId: string): Promise<void> {
    await this.ormRepository.delete({ id: carId });
  }
}

export default CarItemRepository;
