import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
  } from 'typeorm';
  import Cars from './Cars';
  
  @Entity('car_items')
  class CarItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @ManyToOne(() => Cars, cars => cars.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'car_id' })
    cars: Cars;

    @CreateDateColumn()
    createdAt: Date | null;
  
    @CreateDateColumn()
    updatedAt: Date | null;
  }
  
  export default CarItem;