import { ICreateUser } from '../models/ICreateUser';
import { IFindUser } from '../models/IFindUser';
import { IShowUsersParams } from '../models/IShowUsersParams';
import { IUser } from '../models/IUser';
import { IUserPaginate } from '../models/IUserPaginate';

export interface IUserRepository {
  create(user: ICreateUser): Promise<IUser>;
  delete(id: string): Promise<void>;
  save(user: IUser): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IFindUser | null>;
  findAll(params: IShowUsersParams): Promise<IUserPaginate>;
}
