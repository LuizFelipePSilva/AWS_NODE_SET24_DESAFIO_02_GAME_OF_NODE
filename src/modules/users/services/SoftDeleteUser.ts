import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { IRequestFindUserById } from '../domain/models/IRequestFindUserById';
import { IUser } from '../domain/models/IUser';

@injectable()
class SoftDeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({id}: IRequestFindUserById): Promise<IUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    await this.userRepository.delete(id);

    return user;
  }
}

export default SoftDeleteUserService;
