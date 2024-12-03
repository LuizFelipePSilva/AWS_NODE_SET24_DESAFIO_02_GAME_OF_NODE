import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import UpdateUserService from '@modules/users/services/UpdateUser';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import BcryptHashProvider from '@modules/users/providers/HashProvider/implementations/ByCriptHashProvider';

jest.mock('@modules/users/infra/typeorm/repositories/UserRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
            findById: jest.fn(),
            findByEmail: jest.fn(),
            save: jest.fn(),
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

  const updateUserService = new UpdateUserService(userRepository, hashProvider);

describe('UpdateUser', () => {

  it('deve dar erro quando o usuário não for encontrado', async () => {

    const user: User = {
        id: '1',
        fullName: "João Carlos Moreira",
        email: "joaocarlos@gmail.com",
        password: "1234567",
        createdAt: new Date(),
        deletedAt: new Date()
    };

    const spyFindById = jest.spyOn(userRepository, 'findById');
    const spyFindByEmail = jest.spyOn(userRepository, 'findByEmail');
    jest.spyOn(userRepository, 'save').mockResolvedValue(user);

    spyFindById.mockImplementationOnce((id: string) => {
        return Promise.resolve(null);
    });

    spyFindByEmail.mockImplementationOnce((email: string) => {
        return Promise.resolve(user);
    });

    const requestData = {
        id: '2',
        fullName: "João Carlos Moreira",
        email: "joaocarlos@gmail.com",
        password: "1234567"
    };

    await expect(updateUserService.execute(requestData))
    .rejects
    .toThrow('Usuário não encontrado')

    jest.clearAllMocks();

  });

  it('deve dar erro caso o email já esteja em uso', async () => {

    const user: User = {
        id: '1',
        fullName: "João Carlos Moreira",
        email: "joaocarlos@gmail.com",
        password: "1234567",
        createdAt: new Date(),
        deletedAt: new Date()
    };

    const spyFindById = jest.spyOn(userRepository, 'findById');
    const spyFindByEmail = jest.spyOn(userRepository, 'findByEmail');
    jest.spyOn(userRepository, 'save').mockResolvedValue(user);

    spyFindById.mockImplementationOnce((id: string) => {
        return Promise.resolve(user);
    });

    spyFindByEmail.mockImplementationOnce((email: string) => {
        return Promise.resolve(user);
    });

    const requestData = {
        id: '1',
        fullName: "João Carlos Moreira",
        email: "joaocarlos@gmail.com",
        password: "1234567"
    };

    await expect(updateUserService.execute(requestData))
    .rejects
    .toThrow('Endereço de email em uso')

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

    const spyFindById = jest.spyOn(userRepository, 'findById');
    const spyFindByEmail = jest.spyOn(userRepository, 'findByEmail');
    

    spyFindById.mockImplementationOnce((id: string) => {
        return Promise.resolve(user);
    });

    spyFindByEmail.mockImplementationOnce((email: string) => {
        return Promise.resolve(null);
    });

    jest.spyOn(userRepository, 'save').mockResolvedValue(user);


    const requestData = {
        id: '1',
        fullName: "Rigoberto Fernandes de Paiva",
        email: "rigoberto@gmail.com",
        password: ""
    };

    const saveUser = await updateUserService.execute(requestData); 
    expect(saveUser);

    jest.clearAllMocks();

  });
});
