import Cars from "@modules/cars/infra/typeorm/entities/Cars";

export interface ICarItem {
    id?: string;
    name: string;
    cars: Cars;
    createdAt: Date | null;
    updatedAt: Date | null;
  }