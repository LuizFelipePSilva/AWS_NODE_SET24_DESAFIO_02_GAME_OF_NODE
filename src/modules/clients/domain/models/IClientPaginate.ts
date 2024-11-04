import { IClient } from './IClient';

export interface IClientPaginate {
  quant_pages: number;
  totalClients: number;
  current_page: number;
  data: IClient[];
}
