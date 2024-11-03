import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IRequestCreateOrder } from '../domain/models/IRequetCreateOrder';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';
import { IOrder } from '../domain/models/IOrder';
import { IClientRepository } from '@modules/clients/domain/repositories/IClientRepository'
import { ICarRepository } from '@modules/cars/domain/repositories/ICarRepository';
import axios from 'axios';

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
    const orderIsOpen = await this.ordersRepository.findByClient(clientId)

    const verifyClientOrder = orderIsOpen?.status === 'Aberto'

    const clients =  {
      email: clientExists.email,
      name: clientExists.fullName,
    }
   

    if ((verifyClientOrder)) {
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
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    const addressData = response.data
    
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
