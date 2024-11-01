import { IUser } from "./IUser";

export interface IUserPaginate{
    quant_pages: number;
    total: number;
    current_page: number;
    data: IUser[];
}