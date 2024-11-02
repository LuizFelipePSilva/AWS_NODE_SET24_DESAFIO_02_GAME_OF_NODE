import { getCustomRepository } from 'typeorm';
import Client from '../infra/typeorm/entities/Client';
import ClientRepository from '../infra/typeorm/repositories/ClientRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListClientService {

  constructor(
    @inject('ClientRepository')
    private clientRepository: ClientRepository){
  }
  
  public async execute(): Promise<Client[]> {
    const clientRepository = getCustomRepository(ClientRepository);
    const clients = await this.clientRepository.find();
    return clients;
  }
}

export default ListClientService
