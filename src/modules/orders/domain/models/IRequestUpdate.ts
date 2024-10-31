export interface IRequestUpdateOrder{
  id: string;
  orderDate?: Date;
  purchaseDate?: Date;
  cep?: string;
  status?: 'Aprovado' | 'Cancelado';
}