import { IOrder } from "./IOrder";
import { IClient } from "@modules/clients/domain/models/IClient";
import { ICar } from "@modules/cars/domain/models/ICar";

export interface IShowOrderResponse {
  order: {
    id: string; // ID do pedido
    clientId: string; // ID do cliente
    clientName: string; // Nome do cliente
    clientEmail: string; // Email do cliente
    orderDate: Date; // Data do pedido
    status: string; // Status do pedido
    cep: string; // CEP
    city: string; // Cidade
    uf: string; // UF
    totalValue: number; // Valor total
    carId: string; // ID do carro
    purchaseDate: Date | null; // Data da compra
    cancellationDate: Date | null | undefined; // Data de cancelamento
  };
  client: {
    id: string; // ID do cliente
    fullName: string; // Nome completo do cliente
    cpf: string; // CPF do cliente
    email: string; // Email do cliente
  };
  car: {
    id: string; // ID do carro
    plate: string; // Placa do carro
    mark: string; // Marca do carro
    model: string; // Modelo do carro
    km: number; // KM do carro
    year: number; // Ano do carro
    items: Array<{
      name: string; // Nome do item
    }>; 
  };
}
