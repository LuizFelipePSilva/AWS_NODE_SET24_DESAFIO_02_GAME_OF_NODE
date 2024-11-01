import { IUser } from "@modules/users/domain/models/IUser";
import { IUserPaginate } from "@modules/users/domain/models/IUserPaginate";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";

export class UserRepository implements IUserRepository {
    [x: string]: any;
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository= getRepository(User);
    }
    
    async create(user: IUser): Promise<IUser> {
        const newUser = this.ormRepository.create(user);
        return await this.ormRepository.save(newUser);
    }

    async save(user: IUser): Promise<IUser> {
        return await this.ormRepository.save(user);
    }
    
    public async findById(id: string): Promise<IUser | null> {
        return await this.ormRepository.findOne(id) || null;
    }
    
    public async findByEmail(email: string): Promise<IUser | null> {
        return await this.ormRepository.findOne(email) || null;
        
    }

    findAll({ name, email, deleted }: { name: string; email: string; deleted: boolean; }): Promise<IUserPaginate> {
        throw new Error("Method not implemented.");
    }
    
}