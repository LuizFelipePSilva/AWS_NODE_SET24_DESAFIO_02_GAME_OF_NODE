import { getCustomRepository } from 'typeorm';
import Client from '../infra/typeorm/entities/Client';
import ClientRepository from '../infra/typeorm/repositories/ClientRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListClientService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: ClientRepository
  ) {}

  public async execute(p0: {
    page: number;
    size: number;
    fullname: string;
    email: string;
    excluded: boolean | undefined;
    orderBy: ('fullname' | 'createdAt' | 'deletedAt')[] | undefined;
  }): Promise<Client[]> {
    const clients = await this.clientRepository.find();
    return clients;
  }
}

export default ListClientService;
