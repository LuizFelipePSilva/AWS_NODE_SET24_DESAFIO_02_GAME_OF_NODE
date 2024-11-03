import { statusEnum } from "@modules/cars/infra/typeorm/entities/Cars";

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
  }