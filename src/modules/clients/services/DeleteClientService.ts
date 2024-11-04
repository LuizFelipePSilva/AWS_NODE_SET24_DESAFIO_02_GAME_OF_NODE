import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientRepository from '../infra/typeorm/repositories/ClientRepository';
import { inject, injectable } from 'tsyringe';
import { IClientRepository } from '../domain/repositories/IClientRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteClientService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError('Client not found.');
    }

    client.deletedAt = new Date();
    await this.clientRepository.save(client);
  }
}

export default DeleteClientService;
