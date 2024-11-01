export interface IRequestUpdateOrder{
  id: string;
<<<<<<< HEAD
<<<<<<< HEAD
  startDate?: Date;
  endDate?: Date;
=======
  orderDate?: Date;
  purchaseDate?: Date;
>>>>>>> main
=======
  orderDate?: Date;
  purchaseDate?: Date;
>>>>>>> main
  cep?: string;
  status?: 'Aprovado' | 'Cancelado';
}