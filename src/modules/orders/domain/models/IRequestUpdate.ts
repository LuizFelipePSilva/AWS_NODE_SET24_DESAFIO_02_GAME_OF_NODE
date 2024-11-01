export interface IRequestUpdateOrder{
  id: string;
  startDate?: Date;
  endDate?: Date;
  cep?: string;
  status?: 'Aprovado' | 'Cancelado';
}