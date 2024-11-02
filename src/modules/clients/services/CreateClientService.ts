import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Client from '../infra/typeorm/entities/Client';
import ClientRepository from '../infra/typeorm/repositories/ClientRepository';


function isValidCPF(cpf: string): boolean {
  // Remove caracteres que não são numéricos
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || /^(.)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  let remainder;


  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;

  // Valida o segundo dígito do cpf
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;

  return true;
}

interface IRequest {
  fullName: string;
  email: string;
  cpf: string;
  birthDate: Date;
  phone: string;
}

class CreateClientService {
  public async execute({ fullName, email, cpf, birthDate, phone }: IRequest): Promise<Client> {
    const clientsRepository = getCustomRepository(ClientRepository);
    
  
    if (!isValidCPF(cpf)) {
      throw new AppError('Invalid CPF.');
    }

    const emailExists = await clientsRepository.findByEmail(email);
    const cpfExists = await clientsRepository.findByCPF(cpf);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    if (cpfExists) {
      throw new AppError('CPF already used.');
    }

    const client = clientsRepository.create({
      fullName,
      email,
      cpf,
      birthDate,
      phone,
    });

    await clientsRepository.save(client);

    return client;
  }
}

export default CreateClientService;
