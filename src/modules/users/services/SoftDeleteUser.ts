import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class SoftDeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    user.deletedAt = new Date();
    await this.userRepository.save(user);
  }
}

export default SoftDeleteUserService;
