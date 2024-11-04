export interface IRequestUpdateCar {
    id: string;                  // ID do carro, necessário para localizar o carro a ser atualizado
    plate?: string;              // Placa do carro, opcional para atualização parcial
    mark?: string;               // Marca do carro, opcional para atualização parcial
    model?: string;              // Modelo do carro, opcional para atualização parcial
    km?: number;                 // Quilometragem, opcional para atualização parcial
    year?: number;               // Ano do carro, opcional para atualização parcial
    items?: string[];            // Lista de nomes dos itens, opcional para atualizar os itens do carro
    price?: number;              // Preço do carro, opcional para atualização parcial
    status?: 'Ativo' | 'Inativo'; // Status do carro, opcional, somente "Ativo" ou "Inativo"
  }
  