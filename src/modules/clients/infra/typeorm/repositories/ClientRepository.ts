import { EntityRepository, Repository } from 'typeorm';
import Client from '../entities/Client';

@EntityRepository(Client)
class ClientRepository extends Repository<Client> {
  public async findByName(fullName: string): Promise<Client | undefined> {
    const client = await this.findOne({
      where: {
        fullName,
      },
    });
    return client;
  }

  public async findById(id: string): Promise<Client | undefined> {
    const client = await this.findOne({
      where: {
        id,
      },
    });
    return client;
  }

  public async findByEmail(email: string): Promise<Client | undefined> {
    const client = await this.findOne({
      where: {
        email,
      },
    });
    return client;
  }

  public async findByCPF(cpf: string): Promise<Client | undefined> {
    const client = await this.findOne({
      where: {
        cpf,
      },
    });
    return client;
  }

  public async findByPhone(phone: string): Promise<Client | undefined> {
    const client = await this.findOne({
      where: {
        phone,
      },
    });
    return client;
  }
}

export default ClientRepository;
