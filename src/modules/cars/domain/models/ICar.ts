export interface ICar {
    carId: string;
    plate: string;
    mark: string;
    model: string;
    km: number;
    year: number;
    items: string[];
    price: number;
    status: 'Aberto' | 'Aprovado' | 'Cancelado';
    createAt: Date;
    updateAt: Date;
  }