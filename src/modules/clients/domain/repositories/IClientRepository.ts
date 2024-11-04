import { promises } from 'fs';
import { IClient } from '../models/IClient';
import { ICreateClient } from '../models/ICreateClient';

export interface IClientRepository {
  findByName(fullName: string): Promise<IClient | undefined>;
  findById(id: string): Promise<IClient | undefined>;
  findByEmail(email: string): Promise<IClient | undefined>;
  findByCPF(cpf: string): Promise<IClient | undefined>;
  findByPhone(phone: string): Promise<IClient | undefined>;
  create(data: ICreateClient): Promise<IClient>;
  save(client: IClient): Promise<IClient>;
}
