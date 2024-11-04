export interface IFindRequest {
  id: string;
  clientId: string;
  clientName: string;
  clientCpf: string;
  orderDate: Date;
  status: 'Aberto' | 'Aprovado' | 'Cancelado';
  cep: string;
  city: string;
  uf: string;
  totalValue: number;
  purchaseDate: Date | null;
  cancellationDate?: Date | null;
}
