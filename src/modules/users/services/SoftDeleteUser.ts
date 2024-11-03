import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { IRequestFindUserById } from '../domain/models/IRequestFindUserById';

@injectable()
class SoftDeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({id}: IRequestFindUserById): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    user.deletedAt = new Date();
    await this.userRepository.save(user);
  }
}

export default SoftDeleteUserService;
