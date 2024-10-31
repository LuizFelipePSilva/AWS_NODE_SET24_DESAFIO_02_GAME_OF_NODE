import { IOrder } from "./IOrder";
import IClient from "@modules/clients/domain/models/IClient"
import ICar from "@modules/car/domain/models/ICar"

export interface IShowOrderResponse {
  order: IOrder;
  clientExist: IClient | null;
  carExist: ICar | null;
}
