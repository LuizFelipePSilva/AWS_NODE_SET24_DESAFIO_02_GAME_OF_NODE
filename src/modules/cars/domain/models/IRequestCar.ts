export interface IRequestCar {
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
  page: number;
  limit: number;
}
