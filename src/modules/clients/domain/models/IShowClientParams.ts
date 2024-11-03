export interface IShowClientParams {
  fullname?: string;
  email?: string;
  cpf?: string;
  excluded?: boolean;
  orderBy?: ('fullname' | 'createdAt' | 'deletedAt')[];
  page: number,
  size: number,
}