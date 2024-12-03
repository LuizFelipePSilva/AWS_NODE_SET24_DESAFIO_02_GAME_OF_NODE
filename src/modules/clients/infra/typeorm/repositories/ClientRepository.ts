import { getRepository, Repository } from 'typeorm';
import Client from '../entities/Client';
import { IClientRepository } from '@modules/clients/domain/repositories/IClientRepository';
import { IClient } from '@modules/clients/domain/models/IClient';
import { ICreateClient } from '@modules/clients/domain/models/ICreateClient';
import { IShowClientParams } from '@modules/clients/domain/models/IShowClientParams';
import { IClientPaginate } from '@modules/clients/domain/models/IClientPaginate';

class ClientRepository implements IClientRepository {
  [x: string]: any;

  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async create({
    fullName,
    birthDate,
    cpf,
    email,
    phone,
  }: ICreateClient): Promise<Client> {
    const client = this.ormRepository.create({
      fullName,
      birthDate,
      cpf,
      email,
      phone,
    });

    await this.ormRepository.save(client);

    return client;
  }

  public async save(client: Client): Promise<Client> {
    await this.ormRepository.save(client);

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

  public async findAll(params: IShowClientParams): Promise<IClientPaginate> {
    const query = this.ormRepository.createQueryBuilder('client');

    // Filtros
    if (params.c) {
      query.andWhere('client.nome LIKE :nome', {
        fullname: `%${params.fullname}%`,
      });
    }
    if (params.email) {
      query.andWhere('client.email LIKE :email', {
        email: `%${params.email}%`,
      });
    }
    if (params.cpf) {
      query.andWhere('client.email LIKE :cpf', { cpf: `%${params.cpf}%` });
    }
    if (params.excluded !== undefined) {
      if (params.excluded) {
        query.andWhere('client.excluded IS NOT NULL');
      } else {
        query.andWhere('client.dataExclusao IS NULL');
      }
    }

    // Ordenação por múltiplos campos permitidos
    if (params.orderBy) {
      params.orderBy.forEach((campo) => {
        if (['fullname', 'createAt', 'deletedAt'].includes(campo)) {
          query.addOrderBy(`client.${campo}`);
        }
      });
    }

    // Paginação
    const current_page = params.page ?? 1;
    const clientsPerPage = params.size ?? 10;
    const totalClients = await query.getCount();
    query.skip((current_page - 1) * clientsPerPage).take(clientsPerPage);

    // Execução da consulta
    const clients = await query.getMany();

    return {
      quant_pages: Math.ceil(totalClients / clientsPerPage),
      totalClients: totalClients,
      current_page: current_page,
      data: clients,
    };
  }
}

export default ClientRepository;
