import { IUser } from '@modules/users/domain/models/IUser';
import { IUserPaginate } from '@modules/users/domain/models/IUserPaginate';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { IShowUsersParams } from '@modules/users/domain/models/IShowUsersParams';

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create(user: IUser): Promise<IUser> {
    const newUser = this.ormRepository.create(user);
    await this.ormRepository.save(newUser);
    return newUser;
  }

  async save(user: IUser): Promise<IUser> {
    return await this.ormRepository.save(user);
  }

  public async findById(id: string): Promise<IUser | null> {
    return (await this.ormRepository.findOne(id)) || null;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return (await this.ormRepository.findOne({ where: { email } })) || null;
  }

  public async findAll(params: IShowUsersParams): Promise<IUserPaginate> {
    const query = this.ormRepository.createQueryBuilder('user');

    // Filtros
    if (params.name) {
      query.andWhere('user.nome LIKE :nome', { name: `%${params.name}%` });
    }
    if (params.email) {
      query.andWhere('user.email LIKE :email', { email: `%${params.email}%` });
    }
    if (params.excluded !== undefined) {
      if (params.excluded) {
        query.andWhere('user.excluded IS NOT NULL');
      } else {
        query.andWhere('user.dataExclusao IS NULL');
      }
    }

    // Ordenação por múltiplos campos permitidos
    if (params.orderBy) {
      params.orderBy.forEach((campo) => {
        if (['name', 'createAt', 'deletedAt'].includes(campo)) {
          query.addOrderBy(`user.${campo}`);
        }
      });
    }

    // Paginação
    const current_page = params.page ?? 1;
    const usersPerPage = params.size ?? 10;
    const totalUsers = await query.getCount();
    query.skip((current_page - 1) * usersPerPage).take(usersPerPage);

    // Execução da consulta
    const usuarios = await query.getMany();

    return {
      quant_pages: Math.ceil(totalUsers / usersPerPage),
      totalUsers: totalUsers,
      current_page: current_page,
      data: usuarios,
    };
  }
}
