import AppError from '@shared/errors/AppError';
import { IClientRepository } from '../domain/repositories/IClientRepository';
import { ICreateClient } from '../domain/models/ICreateClient';
import { IClient } from '../domain/models/IClient';
import { inject, injectable } from 'tsyringe';


function isValidCPF(cpf: string): boolean {
  // Remove caracteres que não tem numéricos
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

  return true
}

interface IRequest {
  fullName: string;
  email: string;
  cpf: string;
  birthDate: Date;
  phone: string;
}

@injectable()
class CreateClientService {

  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository){
  }

  public async execute({ fullName, email, cpf, birthDate, phone }: ICreateClient): Promise<IClient> {    
  
    if (!isValidCPF(cpf)) {
      throw new AppError('Invalid CPF.');
    }

    const emailExists = await this.clientRepository.findByEmail(email);
    const cpfExists = await this.clientRepository.findByCPF(cpf);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    if (cpfExists) {
      throw new AppError('CPF already used.');
    }

    const client = await this.clientRepository.create({
      fullName,
      email,
      cpf,
      birthDate,
      phone,
    });

    return client;
  }
}

export default CreateClientService;
