import { ICreateUser } from "../models/ICreateUser";
import { IUser } from "../models/IUser";
import { IUserPaginate } from "../models/IUserPaginate";

type SearchParams = {
    name: string;
    email: string;
    deleted: boolean;
}

export interface IUserRepository {
    create(user: ICreateUser): Promise<IUser>;
    save(user: IUser): Promise<IUser>;
    findById(id: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    findAll({name, email, deleted}: SearchParams): Promise<IUserPaginate>;
}
