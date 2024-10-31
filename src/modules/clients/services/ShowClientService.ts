import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Client from '../infra/typeorm/entities/Client';
import ClientRepository from '../infra/typeorm/repositories/ClientRepository';


interface IRequest {
  id: string;
}

class ShowClientService {
  public async execute({ id }: IRequest): Promise<Client> {
    const clientsRepository = getCustomRepository(ClientRepository);

    const client = await clientsRepository.findById(id);

    if (!client) {
      throw new AppError('Client not found.');
    }
    
    return client;
  }
}
export default ShowClientService;