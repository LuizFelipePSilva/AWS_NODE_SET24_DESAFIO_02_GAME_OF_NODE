import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import ListClientService from '@modules/clients/services/ListClientService';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import ClientRepository from '@modules/clients/infra/typeorm/repositories/ClientRepository';
import AppError from '@shared/errors/AppError';

jest.mock('@modules/clients/infra/typeorm/repositories/ClientRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
            find: jest.fn(),
        };
      }),
    };
  });

  const clientRepository = new ClientRepository();

  const listClientService = new ListClientService(clientRepository);

describe('ListClientService', () => {
    it('Deve listar todos os clientes', async () => {

        const client: Client [] = [{
            id: '1',
            fullName: 'Rigoberto Fernandes',
            email: 'rigoberto@gmail.com',
            cpf: '123.456.789-09',
            phone: '84988884927',
            birthDate: new Date(),
            orders: [],
            createdAt: new Date(),
            deletedAt: new Date(),
        },]
    
        const spyFind = jest.spyOn(clientRepository, 'find');
    
        spyFind.mockImplementationOnce((...args: unknown[]) => {
            return Promise.resolve(client);
        });
    
        const requestData = {
            page: 1,
            size: 1,
            fullname: 'Rigoberto',
            email: 'rigoberto@gmail.com',
            excluded: undefined,
            orderBy: undefined,
        };
    
        const listClient = await listClientService.execute(requestData); 
        expect(listClient);

        jest.clearAllMocks();

      });

});