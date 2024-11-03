import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindUserByIdService from '@modules/users/services/FindUserById';
import ListUsersService from '@modules/users/services/ShowUsers';
import CreateUserService from '@modules/users/services/CreateUser';
import UpdateUserService from '@modules/users/services/UpdateUser';
import SoftDeleteUserService from '@modules/users/services/SoftDeleteUser';
import { instanceToInstance } from 'class-transformer';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      page = 1,
      size = 10,
      name,
      email,
      excluded,
      orderBy,
    } = request.query;

    const pageNumber = Number(page);
    const pageSize = Number(size);
    const isExcluded = excluded ? excluded === 'true' : undefined;

    const allowedOrderFields = ['name', 'createdAt', 'deletedAt'] as const;
    type OrderField = typeof allowedOrderFields[number];

    const orderFields = orderBy
      ? ((orderBy as string[]).filter((field) =>
          allowedOrderFields.includes(field as OrderField)
        ) as OrderField[])
      : undefined;

    const userRepository = container.resolve(ListUsersService);

    const users = await userRepository.execute({
      page: pageNumber,
      size: pageSize,
      name: name as string,
      email: email as string,
      excluded: isExcluded,
      orderBy: orderFields,
    });

    return response.json(instanceToInstance(users));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const userById = container.resolve(FindUserByIdService);

    const user = await userById.execute({ id });

    return response.json(instanceToInstance(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { fullName, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ fullName, email, password });

    return response.json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { fullName, email, password } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      fullName,
      email,
      password,
    });

    return response.json(instanceToInstance(instanceToInstance(user)));
  }

  public async softDelete(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const softDelete = container.resolve(SoftDeleteUserService);
    const user = await softDelete.execute({ id });

    return response.json(user);
  }
}
