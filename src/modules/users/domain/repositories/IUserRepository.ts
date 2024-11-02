import { ICreateUser } from "../models/ICreateUser";
import { IShowUsersParams } from "../models/IShowUsersParams";
import { IUser } from "../models/IUser";
import { IUserPaginate } from "../models/IUserPaginate";


export interface IUserRepository {
    create(user: ICreateUser): Promise<IUser>;
    save(user: IUser): Promise<IUser>;
    findById(id: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    findAll(params: IShowUsersParams): Promise<IUserPaginate>;
}
