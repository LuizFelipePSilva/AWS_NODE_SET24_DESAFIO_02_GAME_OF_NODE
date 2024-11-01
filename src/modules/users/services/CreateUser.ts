import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IRequestCreateUser } from "../domain/models/IRequestCreateUser";
import AppError from "@shared/errors/AppError";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";

@injectable()
class CreateUserService {

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository, 
        
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}


    public async execute({fullName, email, password}: IRequestCreateUser) {
        const userExists = await this.userRepository.findByEmail(email);
    
        if(userExists) {
            throw new AppError('Endereço de email já cadastrado');
        }

        if(!fullName) {
            throw new AppError('Informe seu nome');
        }

        if(!password) {
            throw new AppError('Informe uma senha');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.userRepository.create({
            fullName,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        });

        return user;
    }
}

export default CreateUserService;