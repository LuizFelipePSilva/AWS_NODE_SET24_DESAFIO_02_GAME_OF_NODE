import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IRequestCreateOrder } from '../domain/models/IRequetCreateOrder';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';
import { IOrder } from '../domain/models/IOrder';
import { IClientRepository } from '@modules/client/domain/repositories/IClientRepository';
import { ICarRepository } from '@modules/cars/domain/repositories/ICarRepository';
import fetch from 'node-fetch'

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private ordersRepository: IOrderRepository,

    @inject('ClientRepository')
    private clientRepository: IClientRepository,

    @inject('CarRepository')
    private carsRepository: ICarRepository
  ) {}

  public async execute({
    clientId,
    carId,
    cep,
    value,
  }: IRequestCreateOrder): Promise<IOrder> {
    const clientExists = await this.clientRepository.findById(clientId);
    if (!clientExists) {
      throw new AppError('Cliente não existe');
    }
    const clients =  {
      email: clientExists.email,
      name: clientExists.name,
    }
    const orderIsOpen =  await clientExists.filter((order) => order.status);

    if ((orderIsOpen == 'Aberto')) {
      throw new AppError('Cliente tem um pedido em aberto');
    }

    const carExists = await this.carsRepository.findById(carId);

    if (!carExists) {
      throw new AppError('Carro não existe');
    }
    if (!cep ) {
      throw new AppError('Nenhum cep foi informado!');
    }
    function validarCep(cep: string): boolean {
      const cepRegex = /^[0-9]{8}$/;
      return cepRegex.test(cep);
    }

    if(!validarCep(cep)){
      throw new AppError('Cep Invalido ou foi digitado incorretamente.')
    }
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) {
      throw new AppError('Erro ao consultar o CEP');
    }

    const addressData = await response.json();
    
    if (addressData.erro) {
      throw new AppError('CEP não encontrado');
    }
    const cepInfo = {
      city: addressData.localidade,
      uf: addressData.uf,
    }


    const order = await this.ordersRepository.create({
      clientId: clientId,
      clientEmail: clients.email,
      clientName: clients.name,
      orderDate: new Date(),
      cep: cep,
      city: cepInfo.city,
      uf: cepInfo.uf,
      totalValue: value,
      carId: carId,
      purchaseDate: null,
      status: 'Aberto',
      cancellationDate: null,
    })
    return order
  }
}

export default CreateOrderService;
