import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Client from '../infra/typeorm/entities/Client';
import ClientRepository from '../infra/typeorm/repositories/ClientRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  fullName?: string;
  email?: string;
  cpf?: string;
  birthDate?: Date;
  phone?: string;
}

@injectable()
class UpdateClientService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: ClientRepository
  ) {}

  public async execute({
    id,
    fullName,
    email,
    cpf,
    birthDate,
    phone,
  }: IRequest): Promise<Client> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError('Client not found.');
    }

    // Validação de e-mail e CPF
    if (email && email !== client.email) {
      const emailExists = await this.clientRepository.findByEmail(email);
      if (emailExists) {
        throw new AppError('There is already one client with this email.');
      }
      client.email = email;
    }

    if (cpf && cpf !== client.cpf) {
      const cpfExists = await this.clientRepository.findByCPF(cpf);
      if (cpfExists) {
        throw new AppError('There is already one client with this CPF.');
      }
      client.cpf = cpf;
    }

    client.fullName = fullName || client.fullName;
    client.email = email || client.email;
    client.cpf = cpf || client.cpf;
    client.phone = phone || client.phone;
    client.birthDate = birthDate || client.birthDate;

    await this.clientRepository.save(client);

    return client;
  }
}

export default UpdateClientService;
