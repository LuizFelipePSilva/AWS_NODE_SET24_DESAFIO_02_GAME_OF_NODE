import { getRepository, Repository } from 'typeorm';
import Client from '../entities/Client';
import { IClientRepository } from '@modules/clients/domain/repositories/IClientRepository';
import { IClient } from '@modules/clients/domain/models/IClient';
import { ICreateClient } from '@modules/clients/domain/models/ICreateClient';

class ClientRepository implements IClientRepository {
  [x: string]: any;
  
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client)
  }

  public async create({ fullName, birthDate, cpf, email, phone}: ICreateClient): Promise<Client> {
    const client = this.ormRepository.create({fullName, birthDate, cpf, email, phone})

    await this.ormRepository.save(client)

    return client;
  }

  public async save(client: Client): Promise<Client> {
    await this.ormRepository.save(client)

    return client;
  }

  public async findByName(fullName: string): Promise<Client | undefined> {
    return this.ormRepository.findOne({
      where: {
        fullName,
      },
    });
  }

  public async findById(id: string): Promise<Client | undefined> {
    return this.ormRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async findByEmail(email: string): Promise<Client | undefined> {
    return this.ormRepository.findOne({
      where: {
        email,
      },
    });
  }

  public async findByCPF(cpf: string): Promise<Client | undefined> {
    return this.ormRepository.findOne({
      where: {
        cpf,
      },
    });
  }

  public async findByPhone(phone: string): Promise<Client | undefined> {
    return this.ormRepository.findOne({
      where: {
        phone,
      },
    });
  }
}

export default ClientRepository;
