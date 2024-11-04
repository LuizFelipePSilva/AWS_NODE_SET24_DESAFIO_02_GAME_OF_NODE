import CarItem from '@modules/cars/infra/typeorm/entities/CarItem';
import { statusEnum } from '@modules/cars/infra/typeorm/entities/Cars';
import { Order } from '@modules/orders/infra/typeorm/entities/Order';

export interface ICar {
  id: string;
  plate: string;
  mark: string;
  model: string;
  km: number;
  year: number;
  price: number;
  status: statusEnum;
  createdAt: Date | null;
  updatedAt: Date | null;
  items: CarItem[];
  orders: Order[];
}
