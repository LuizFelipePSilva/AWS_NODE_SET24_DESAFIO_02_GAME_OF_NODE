import { ICar } from "./ICar";

export interface IResponseCar {
    data: ICar[];
    total: number;
    page: number;
    limit: number;
}