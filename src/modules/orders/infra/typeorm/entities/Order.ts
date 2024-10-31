import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Client  from '@modules/clients/infra/typeorm/entities/Client';
import Car  from '@modules/cars/entities/Car';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  clientId: string;

  @Column()
  clientName: string;

  @Column()
  clientEmail: string;

  @CreateDateColumn({ name: 'orderDate', type: 'timestamp'})
  orderDate: Date;

  @Column({
    type: 'enum',
    enum: ['Aberto', 'Aprovado', 'Cancelado'],
  })
  status: 'Aberto' | 'Aprovado' | 'Cancelado';

  @Column({default: null})
  cep: string;

  @Column({default: null})
  city: string;

  @Column({default: null})
  uf: string;

  @Column({ type: 'float', default: 0})
  totalValue: number;

  @Column({ type: 'uuid' })
  carId: string;

  @CreateDateColumn({ name: 'purchaseDate', type: 'timestamp', default: null})
  purchaseDate: Date | null;

  @Column({ type: 'timestamp', nullable: true, default: null})
  cancellationDate: Date | null;

  @ManyToOne(() => Client, (client) => client.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @ManyToOne(() => Car, (car) => car.orders, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'carId' })
  car: Car;
}