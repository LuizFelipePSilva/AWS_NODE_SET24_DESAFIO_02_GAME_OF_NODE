export interface IRequestUpdateOrder{
  id: string;
<<<<<<< HEAD
  startDate?: Date;
  endDate?: Date;
=======
  orderDate?: Date;
  purchaseDate?: Date;
>>>>>>> main
  cep?: string;
  status?: 'Aprovado' | 'Cancelado';
}