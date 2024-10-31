import { getCustomRepository } from 'typeorm';
import Client from '../infra/typeorm/entities/Client';
import ClientRepository from '../infra/typeorm/repositories/ClientRepository';

class ListClientService {
  public async execute(): Promise<Client[]> {
    const clientsRepository = getCustomRepository(ClientRepository);
    
    const clients = clientsRepository.find();
    
    return clients;
  }
}

export default ListClientService;