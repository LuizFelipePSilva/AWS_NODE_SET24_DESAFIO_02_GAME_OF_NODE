import { ICar } from '../models/ICar';
import { ICarPaginate } from '../models/ICarPaginate';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ICarRepository {
  findById(id: string): Promise<ICar | null>;
  findAll({ page, skip, take }: SearchParams): Promise<ICarPaginate>;
  //findByClient(id: string): Promise<ICar | null>; 
  create(car: ICar): Promise<ICar>;
  update(car: ICar): Promise<ICar>;
  delete(id: string): Promise<void>;
}