import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import ClientRepository from '../infra/typeorm/repositories/ClientRepository';
import Client from '../infra/typeorm/entities/Client';


interface IRequest {
  id: string;
  fullName: string;
  email: string;
}

class UpdateClientService {
  public async execute({ id, fullName, email }: IRequest): Promise<Client> {
    const clientsRepository = getCustomRepository(ClientRepository);

    const client = await clientsRepository.findById(id);

    if (!client) {
      throw new AppError('Client not found.');
    }

    const clientExists = await ClientRepository.findByEmail(email);

    if (email !== client.email) {
      throw new AppError('There is already one client with this email.');
    }

    // if (clientExists && email !== client.email) {
    //   throw new AppError('There is already one client with this email.');
    // }

    client.fullName = fullName;
    client.email = email;

    await clientsRepository.save(client);

    return client;
  }
}

export default UpdateClientService;