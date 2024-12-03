import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import FindUserById from '@modules/users/services/FindUserById';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';


jest.mock('@modules/users/infra/typeorm/repositories/UserRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
            findById: jest.fn(),
        };
      }),
    };
  });

  const userRepository = new UserRepository();

  const findUserById = new FindUserById(userRepository);

describe('ShowUsers', () => {

    it('Deve dar erro caso o usuário não seja encontrado', async () => {

      const user: User = {
        id: '1',
        fullName: "João Carlos Moreira",
        email: "joaocarlos@gmail.com",
        password: "1234567",
        createdAt: new Date(),
        deletedAt: new Date()
    };
    
        const spyFindById = jest.spyOn(userRepository, 'findById');
    
        spyFindById.mockImplementationOnce((id: string) => {
            return Promise.resolve(null);
        });
    
        const userId = '2';
    
        await expect(findUserById.execute({id: userId})).rejects.toThrow('Usuário não encontrado');
    
      });

      it('Deve retornar o usuário encontrado', async () => {

        const user: User = {
            id: '1',
            fullName: "João Carlos Moreira",
            email: "joaocarlos@gmail.com",
            password: "1234567",
            createdAt: new Date(),
            deletedAt: new Date()
        };
    
        const spyFindById = jest.spyOn(userRepository, 'findById');
    
        spyFindById.mockImplementationOnce((id: string) => {
            return Promise.resolve(user);
        });
    
        const requestData = {
            id: '1',
        };
    
        const findUser = await findUserById.execute(requestData); 
        expect(findUser);
    
      });
});