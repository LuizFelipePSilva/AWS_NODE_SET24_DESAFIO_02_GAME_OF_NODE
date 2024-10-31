import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Client from '../infra/typeorm/entities/Client';
import ClientRepository from '../infra/typeorm/repositories/ClientRepository';

interface IRequest {
  fullName: string;
  email: string;
}

class CreateClientService {
  public async execute({ fullName, email }: IRequest): Promise<Client> {
    const clientsRepository = getCustomRepository(ClientRepository);
    const emailExists = await clientsRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const client = clientsRepository.create({
      fullName,
      email,
    });

    await clientsRepository.save(client);

    return client;
  }
}

export default CreateClientService;