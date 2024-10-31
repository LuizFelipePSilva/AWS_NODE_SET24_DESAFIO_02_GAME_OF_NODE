import { IUser } from "../models/IUser";
import { IUserPaginate } from "../models/IUserPaginate";

type SearchParams = {
    name: string;
    email: string;
    deleted: boolean;
}

export interface IUserRepository {
    create(user: IUser): Promise<IUser>;
    findById(id: string): Promise<IUser | null>;
    findAll({name, email, deleted}: SearchParams): Promise<IUserPaginate>;
}
