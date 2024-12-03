import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import SoftDeleteUserService from '@modules/users/services/SoftDeleteUser';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';


jest.mock('@modules/users/infra/typeorm/repositories/UserRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
            findById: jest.fn(),
            delete: jest.fn(),
        };
      }),
    };
  });

  const userRepository = new UserRepository();

  const softDeleteUserService = new SoftDeleteUserService(userRepository);

describe('SoftDeleteUser', () => {

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
    
        //jest.spyOn(clientRepository, 'save').mockResolvedValue(client);
    
        const clientId = '2';
    
        await expect(softDeleteUserService.execute({id: clientId})).rejects.toThrow('Usuário não encontrado');
    
      });

      it('Deve excluir o usuário', async () => {

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
    
        jest.spyOn(userRepository, 'delete').mockResolvedValue();
    
        const requestData = {
            id: '1',
        };
    
        const deleteUser = await softDeleteUserService.execute(requestData); 
        expect(deleteUser);
    
      });
})