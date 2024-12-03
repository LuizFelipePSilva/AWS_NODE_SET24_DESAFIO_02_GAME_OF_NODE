import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import CreateSession from '@modules/users/services/CreateSession';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import BcryptHashProvider from '@modules/users/providers/HashProvider/implementations/ByCriptHashProvider';
import { IFindUser } from '@modules/users/domain/models/IFindUser';

jest.mock('@modules/users/infra/typeorm/repositories/UserRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
          findByEmail: jest.fn(),
        };
      }),
    };
  });

jest.mock('@modules/users/providers/HashProvider/models/IHashProvider', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
            compareHash: jest.fn(),
        };
      }),
    };
  });

  const userRepository = new UserRepository();
  const hashProvider = new BcryptHashProvider();

  const createSession = new CreateSession(userRepository, hashProvider);

describe('CreateSession', () => {
    it('deve dar erro quando o email estiver incorreto', async () => {

        const user: IFindUser = {
            id: '1',
            fullName: "João Carlos Moreira",
            email: "joaocarlos@gmail.com",
            password: "1234567",
            createdAt: new Date(),
            deletedAt: new Date()
        };
    
        const spyFindByEmail = jest.spyOn(userRepository, 'findByEmail');
        //jest.spyOn(userRepository, 'create').mockResolvedValue(user);
    
        spyFindByEmail.mockImplementationOnce((email: string) => {
            return Promise.resolve(null);
        });
    
        const requestData = {
            email: "joaocarlos@gmail.com",
            password: "1234567"
        };
    
        await expect(createSession.execute(requestData))
        .rejects
        .toThrow('Incorrect email/password combination.')
    
        jest.clearAllMocks();
    
    });

    it('deve dar erro quando a senha estiver incorreta', async () => {

        const user: IFindUser = {
            id: '1',
            fullName: "João Carlos Moreira",
            email: "joaocarlos@gmail.com",
            password: "1234567",
            createdAt: new Date(),
            deletedAt: new Date()
        };
    
        const spyFindByEmail = jest.spyOn(userRepository, 'findByEmail');
        //jest.spyOn(userRepository, 'create').mockResolvedValue(user);
    
        spyFindByEmail.mockImplementationOnce((email: string) => {
            return Promise.resolve(null);
        });
    
        const requestData = {
            email: "joaocarlos@gmail.com",
            password: "1234567"
        };
    
        await expect(createSession.execute(requestData))
        .rejects
        .toThrow('Incorrect email/password combination.')
    
        jest.clearAllMocks();
    
    });

})