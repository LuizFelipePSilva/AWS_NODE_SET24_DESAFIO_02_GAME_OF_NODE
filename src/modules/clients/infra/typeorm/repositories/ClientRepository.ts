import { EntityRepository, Repository } from 'typeorm';
import Client from '../entities/Client';

@EntityRepository(Client)
class ClientRepository extends Repository<Client> {
  public async findByName(fullName: string): Promise<Client | undefined> {
    return this.findOne({
      where: {
        fullName,
      },
    });
  }

  public async findById(id: string): Promise<Client | undefined> {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  public async findByEmail(email: string): Promise<Client | undefined> {
    return this.findOne({
      where: {
        email,
      },
    });
  }

  public async findByCPF(cpf: string): Promise<Client | undefined> {
    return this.findOne({
      where: {
        cpf,
      },
    });
  }

  public async findByPhone(phone: string): Promise<Client | undefined> {
    return this.findOne({
      where: {
        phone,
      },
    });
  }
}

export default ClientRepository;
