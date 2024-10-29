export interface ICreateOrder {
  clientId: string;
  clientName: string;
  clientEmail: string;
  orderDate: Date;
  cep: string;
  city: string;
  uf: string;
  totalValue: number;
  carId: string;
}
