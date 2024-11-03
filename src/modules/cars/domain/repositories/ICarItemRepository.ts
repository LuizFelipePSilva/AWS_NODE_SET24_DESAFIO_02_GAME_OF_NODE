import { ICarItem } from '../models/ICarItem';

export interface ICarItemRepository {
  findById(id: string): Promise<ICarItem | null>;
  createMany(data: ICarItem[]): Promise<ICarItem[]>;
  create(item: ICarItem): Promise<ICarItem>;
  update(item: ICarItem): Promise<ICarItem>;
  delete(id: string): Promise<void>;
}
