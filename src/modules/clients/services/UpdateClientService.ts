import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Client from '../infra/typeorm/entities/Client';
import ClientRepository from '../infra/typeorm/repositories/ClientRepository';

interface IRequest {
  id: string;
  fullName?: string;
  email?: string;
  cpf?: string;
  birthDate?: Date;
  phone?: string; 
}

class UpdateClientService {
  public async execute({ id, fullName, email, cpf, birthDate, phone }: IRequest): Promise<Client> {
    const clientsRepository = getCustomRepository(ClientRepository);
    const client = await clientsRepository.findById(id);

    if (!client) {
      throw new AppError('Client not found.');
    }

    // Validação de e-mail e CPF
    if (email && email !== client.email) {
      const emailExists = await clientsRepository.findByEmail(email);
      if (emailExists) {
        throw new AppError('There is already one client with this email.');
      }
      client.email = email;
    }

    if (cpf && cpf !== client.cpf) {
      const cpfExists = await clientsRepository.findByCPF(cpf);
      if (cpfExists) {
        throw new AppError('There is already one client with this CPF.');
      }
      client.cpf = cpf;
    }

    client.fullName = fullName || client.fullName;
    client.email = email || client.email;
    client.cpf = cpf || client.cpf;
    client.phone = phone || client.phone;

    await clientsRepository.save(client);
    
    return client;
  }
}

export default UpdateClientService;
