import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  
} from 'typeorm';
import CarItem from './CarItem';
import {ICar} from '@modules/cars/domain/models/ICar'
import { Order } from '@modules/orders/infra/typeorm/entities/Order';

export enum statusEnum {
  ativo,
  inativo,
  excluido
}

@Entity('cars')
class Cars {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  plate: string;

  @Column()
  mark: string;

  @Column()
  model: string;

  @Column()
  km: number;

  @Column()
  year: number;

  @Column()
  price: number;

  @Column({ type: 'enum', enum: statusEnum})
  status: statusEnum;

  @CreateDateColumn()
  createdAt: Date | null;

  @CreateDateColumn()
  updatedAt: Date | null;
  
  // @OneToMany(() => CarItem, carItem => carItem.cars, { cascade: true })
  // items: CarItem[];

  // @OneToMany(() => Order, (order) => order.car)
  // orders: Order[]
}

export default Cars;