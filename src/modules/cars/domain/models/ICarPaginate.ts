import { ICar } from './ICar';

export interface ICarPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: ICar[];
}