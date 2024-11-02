import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IShowUsersParams } from '../domain/models/IShowUsersParams';
import { IUserPaginate } from '../domain/models/IUserPaginate';
import AppError from '@shared/errors/AppError';

@injectable()
class ListUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(params: IShowUsersParams): Promise<IUserPaginate> {
    const result = await this.userRepository.findAll(params);

    if (result.data.length === 0) {
      throw new AppError('Nenhum usuário encontrado');
    }

    return result;
  }
}

export default ListUsersService;
