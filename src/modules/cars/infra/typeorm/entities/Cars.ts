import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import CarItem from './CarItem';

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

  @Column({ type: 'enum', enum: ['Ativo', 'Inativo', 'Excluido'] })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => CarItem, carItem => carItem.cars, { cascade: true })
  items: CarItem[];
}

export default Cars;