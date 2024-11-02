import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientRepository from '../infra/typeorm/repositories/ClientRepository';

interface IRequest {
  id: string;
}

class DeleteClientService {
  public async execute({ id }: IRequest): Promise<void> {
    const clientsRepository = getCustomRepository(ClientRepository);
    const client = await clientsRepository.findById(id);

    if (!client) {
      throw new AppError('Client not found.');
    }

    client.deletedAt = new Date();
    await clientsRepository.save(client); 
  }
}

export default DeleteClientService;
