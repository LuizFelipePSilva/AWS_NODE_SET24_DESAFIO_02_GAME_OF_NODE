export interface IShowUsersParams {
    name?: string;
    email?: string;
    excluded?: boolean;
    orderBy?: ('name' | 'createdAt' | 'deletedAt')[];
    page: number,
    size: number,
}