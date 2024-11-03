import { ICar } from '../models/ICar';
import { ICreateCar } from '../models/ICreateCar';

export interface IFindAllWithFiltersParams {
  status?: 'Ativo' | 'Inativo';
  plateEnd?: string;
  mark?: string;
  model?: string;
  items?: string[];
  maxKm?: number;
  yearFrom?: number;
  yearTo?: number;
  priceMin?: number;
  priceMax?: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  page: number;
  limit: number;
}

export interface IFindAllWithFiltersResponse {
  data: ICar[];
  total: number;
  page: number;
  limit: number;
}

export interface ICarRepository {
  findById(id: string): Promise<ICar | null>;
  findByPlate(plate: string): Promise<ICar | null>;
  create(car: ICreateCar): Promise<ICar>;
  update(car: ICar): Promise<ICar>;
  softDelete(id: string): Promise<void>;
  findAllWithFilters(params: IFindAllWithFiltersParams): Promise<IFindAllWithFiltersResponse>;
}
