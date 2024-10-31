import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('car')
  class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    plate: string;
  
    @Column()
    mark: string;
  
    @Column()
    model: string;
  
    @Column({ type: 'float' })
    km: number;
  
    @Column()
    year: number;
  
    @Column('simple-array', { nullable: false })
    items: string[];
  
    @Column({ type: 'float' })
    price: number;
  
    @Column({
      type: 'enum',
      enum: ['ativo', 'inativo', 'excluido'],
      default: 'ativo',
    })
    status: 'ativo' | 'inativo' | 'excluido';
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  
  export default Car;