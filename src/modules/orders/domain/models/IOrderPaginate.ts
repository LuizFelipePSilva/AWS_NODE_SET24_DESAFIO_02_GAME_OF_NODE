import { IFindRequest } from './IFindRequest';
import { IOrder } from './IOrder';

export interface IOrderPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: IFindRequest[]; 
  last_page?: number; 
}