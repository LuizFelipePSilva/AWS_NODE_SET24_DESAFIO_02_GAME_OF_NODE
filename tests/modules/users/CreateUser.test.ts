import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import CreateUserService from '@modules/users/services/CreateUser';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import BcryptHashProvider from '@modules/users/providers/HashProvider/implementations/ByCriptHashProvider';

jest.mock('@modules/users/infra/typeorm/repositories/UserRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
          findByEmail: jest.fn(),
          create: jest.fn(),
        };
      }),
    };
  });

jest.mock('@modules/users/providers/HashProvider/models/IHashProvider', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
            generatedHash: jest.fn(),
        };
      }),
    };
  });

  const userRepository = new UserRepository();
  const hashProvider = new BcryptHashProvider();

  const createUserService = new CreateUserService(userRepository, hashProvider);

describe('CreateUser', () => {

  it('deve dar erro quando o email já existir', async () => {

    const user: User = {
        id: '1',
        fullName: "João Carlos Moreira",
        email: "joaocarlos@gmail.com",
        password: "1234567",
        createdAt: new Date(),
        deletedAt: new Date()
    };

    const spyFindByEmail = jest.spyOn(userRepository, 'findByEmail');
    jest.spyOn(userRepository, 'create').mockResolvedValue(user);

    spyFindByEmail.mockImplementationOnce((email: string) => {
        return Promise.resolve(user);
    });

    const requestData = {
        fullName: "João Carlos Moreira",
        email: "joaocarlos@gmail.com",
        password: "1234567"
    };

    await expect(createUserService.execute(requestData))
    .rejects
    .toThrow('Endereço de email já cadastrado')

    jest.clearAllMocks();

  });

  it('deve dar erro caso não preencha o nome', async () => {

    const user: User = {
        id: '1',
        fullName: "João Carlos Moreira",
        email: "joaocarlos@gmail.com",
        password: "1234567",
        createdAt: new Date(),
        deletedAt: new Date()
    };

    const spyFindByEmail = jest.spyOn(userRepository, 'findByEmail');
    jest.spyOn(userRepository, 'create').mockResolvedValue(user);

    spyFindByEmail.mockImplementationOnce((email: string) => {
        return Promise.resolve(null);
    });

    const requestData = {
        fullName: "",
        email: "rigoberto@gmail.com",
        password: "1234567"
    };

    await expect(createUserService.execute(requestData))
    .rejects
    .toThrow('Informe seu nome');

    jest.clearAllMocks();

  });

  it('deve dar erro caso não preencha a senha', async () => {

    const user: User = {
        id: '1',
        fullName: "João Carlos Moreira",
        email: "joaocarlos@gmail.com",
        password: "1234567",
        createdAt: new Date(),
        deletedAt: new Date()
    };

    const spyFindByEmail = jest.spyOn(userRepository, 'findByEmail');
    jest.spyOn(userRepository, 'create').mockResolvedValue(user);

    spyFindByEmail.mockImplementationOnce((email: string) => {
        return Promise.resolve(null);
    });

    const requestData = {
        fullName: "rigoberto",
        email: "rigoberto@gmail.com",
        password: ""
    };

    await expect(createUserService.execute(requestData))
    .rejects
    .toThrow('Informe uma senha');

    jest.clearAllMocks();

  });

  it('deve salvar o usuário após passar por todas as validações', async () => {

    const user: User = {
        id: '1',
        fullName: "João Carlos Moreira",
        email: "joaocarlos@gmail.com",
        password: "1234567",
        createdAt: new Date(),
        deletedAt: new Date()
    };

    const spyFindByEmail = jest.spyOn(userRepository, 'findByEmail');
    jest.spyOn(userRepository, 'create').mockResolvedValue(user);

    spyFindByEmail.mockImplementationOnce((email: string) => {
        return Promise.resolve(null);
    });

    const requestData = {
        fullName: "Rigoberto Fernandes de Paiva",
        email: "rigoberto@gmail.com",
        password: "12345678"
    };

    const saveUser = await createUserService.execute(requestData); 
    expect(saveUser);

    jest.clearAllMocks();

  });
});
