export interface IOrder {
  clientId: string;
  clientName: string;
  clientEmail: string;
  orderDate: Date;
  status: 'Aberto' | 'Aprovado' | 'Cancelado';
  cep: string;
  city: string;
  uf: string;
  totalValue: number;
  carId: string;
  purchaseDate: Date | null;
  cancellationDate?: Date | null;
}
