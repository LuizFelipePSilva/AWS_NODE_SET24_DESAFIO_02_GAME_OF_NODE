import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IRequestFindUserById } from "../domain/models/IRequestFindUserById";
import { IUser } from "../domain/models/IUser";
import AppError from "@shared/errors/AppError";

@injectable()
class FindUserByIdService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    
    public async execute({id}: IRequestFindUserById): Promise<IUser> {
        const user = await this.userRepository.findById(id);
        
        if(!user) {
            throw new AppError('Usuário não encontrado');
        }

        return user;
    }
}

export default FindUserByIdService;