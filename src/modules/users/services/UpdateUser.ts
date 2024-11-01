import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUser } from "../domain/models/IUser";
import AppError from "@shared/errors/AppError";

@injectable()
class UpdateUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,      
    ) {}

    public async execute({id, fullName, email, password}: IRequestUpdateUser): Promise<IUser> {
        const user = await this.userRepository.findById(id);

        if(!user) {
            throw new AppError('Usuário não encontrado');
        }

        if (fullName) {
            user.fullName = fullName;
        }

        if (email) {
            const userExists = await this.userRepository.findByEmail(email);

            if(userExists) {
                throw new AppError('Endereço de email em uso');
            } else {
                user.email = email;
            }
        }

        if (password) {
            user.password = password;
        }

        return await this.userRepository.save(user)
    }
}

export default UpdateUserService;