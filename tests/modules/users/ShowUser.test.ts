import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import ShowUserService from '@modules/users/services/ShowUsers';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import { IShowUsersParams } from '@modules/users/domain/models/IShowUsersParams';
import AppError from '@shared/errors/AppError';
import { IUserPaginate } from '@modules/users/domain/models/IUserPaginate';


jest.mock('@modules/users/infra/typeorm/repositories/UserRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
            findAll: jest.fn(),
        };
      }),
    };
  });

  const userRepository = new UserRepository();

  const showUserService = new ShowUserService(userRepository);

describe('ShowUsers', () => {

    it('Deve dar erro caso o usuário não seja encontrado', async () => {

        const params: IShowUsersParams = {
            name: "João Carlos Moreira",
            email: "joaocarlos@gmail.com",
            excluded: true,
            orderBy: ['name'],
            page: 1,
            size: 10,
        };
    
        const spyFindAll = jest.spyOn(userRepository, 'findAll');
    
        spyFindAll.mockImplementationOnce((param: IShowUsersParams) => {
            return Promise.resolve( {
              quant_pages: 1,
              totalUsers: 0,
              current_page: 1,
              data: [],
            });
        });
    
        const requestData : IShowUsersParams = {
          name: "João Carlos Moreira",
          email: "joaocarlos@gmail.com",
          excluded: true,
          orderBy: ['name'],
          page: 1,
          size: 10,
        };
    
        await expect(showUserService.execute(requestData)).rejects.toThrow('Nenhum usuário encontrado');
    
      });

      it('Deve exibir lista de usuários', async () => {

        const user: User = {
            id: '1',
            fullName: "João Carlos Moreira",
            email: "joaocarlos@gmail.com",
            password: "1234567",
            createdAt: new Date(),
            deletedAt: new Date()
        };
    
        const spyFindAll = jest.spyOn(userRepository, 'findAll');
    
        spyFindAll.mockImplementationOnce((param: IShowUsersParams) => {
          return Promise.resolve( {
            quant_pages: 1,
            totalUsers: 1,
            current_page: 1,
            data: [user],
          });
      });
    
        const requestData : IShowUsersParams = {
          name: "João Carlos Moreira",
          email: "joaocarlos@gmail.com",
          excluded: true,
          orderBy: ['name'],
          page: 1,
          size: 10,
        };
    
        const showUsers = await showUserService.execute(requestData); 
        expect(showUsers);
    
      });
})