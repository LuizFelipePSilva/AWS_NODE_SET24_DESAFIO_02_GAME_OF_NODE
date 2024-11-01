// import { Repository, EntityRepository } from 'typeorm';
// import CarItem from '../entities/CarItem';

// @EntityRepository(CarItem)
// class CarItemRepository extends Repository<CarItem> {
//   public async findByName(name: string): Promise<CarItem | undefined> {
//     const item = await this.findOne({ where: { name } });
//     return item;
//   }

//   public async findByCar(carId: string): Promise<CarItem[]> {
//     const items = await this.find({ where: { car: carId } });
//     return items;
//   }

//   public async deleteByCar(carId: string): Promise<void> {
//     await this.delete({ cars : carId });
//   }
// }

// export default CarItemRepository;
