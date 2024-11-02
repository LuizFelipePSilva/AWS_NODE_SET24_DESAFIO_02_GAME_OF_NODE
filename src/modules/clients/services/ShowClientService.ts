import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Client from '../infra/typeorm/entities/Client';
import ClientRepository from '../infra/typeorm/repositories/ClientRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
}

@injectable()
class ShowClientService {

  constructor(
    @inject('ClientRepository')
    private clientRepository: ClientRepository){
  }

  public async execute({ id }: IRequest): Promise<Client> {
    const clientRepository = getCustomRepository(ClientRepository);
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError('Client not found.');
    }

    return client;
  }
}

export default ShowClientService;
