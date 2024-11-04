import { IUser } from './IUser';

export interface IUserPaginate {
  quant_pages: number;
  totalUsers: number;
  current_page: number;
  data: IUser[];
}
