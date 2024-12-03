import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import ShowClientService from '@modules/clients/services/ShowClientService';
import ClientRepository from '@modules/clients/infra/typeorm/repositories/ClientRepository';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import AppError from '@shared/errors/AppError';


jest.mock('@modules/clients/infra/typeorm/repositories/ClientRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
            findById: jest.fn(),
        };
      }),
    };
  });

  const clientRepository = new ClientRepository();

  const showClientService = new ShowClientService(clientRepository);

describe('ShowClientService', () => {

    it('Deve dar erro quando o cliente não for encontrado', async () => {

        const client: Client = {
            id: '1',
            fullName: 'Rigoberto Fernandes',
            email: 'rigoberto@gmail.com',
            cpf: '123.456.789-09',
            phone: '84988884927',
            birthDate: new Date(),
            orders: [],
            createdAt: new Date(),
            deletedAt: new Date(),
        };
    
        const spyFindById = jest.spyOn(clientRepository, 'findById');
    
        spyFindById.mockImplementationOnce((id: string) => {
            return Promise.resolve(undefined);
        });
    
        const clientId = '2';
    
        await expect(showClientService.execute({id: clientId})).rejects.toThrow('Client not found.');
    
      });

      it('Deve exibir o cliente', async () => {

        const client: Client = {
            id: '1',
            fullName: 'Rigoberto Fernandes',
            email: 'rigoberto@gmail.com',
            cpf: '123.456.789-09',
            phone: '84988884927',
            birthDate: new Date(),
            orders: [],
            createdAt: new Date(),
            deletedAt: new Date(),
        };
    
        const spyFindById = jest.spyOn(clientRepository, 'findById');
    
        spyFindById.mockImplementationOnce((id: string) => {
            return Promise.resolve(client);
        });
    
        const requestData = {
            id: '1',
            fullName: 'Rigoberto Fernandes',
            email: 'rigoberto@gmail.com',
            cpf: '123.456.789-09',
            phone: '84988884927',
            birthDate: new Date(),
            orders: [],
            createdAt: new Date(),
            deletedAt: new Date(),
        };
    
        const showClient = await showClientService.execute(requestData); 
        expect(showClient);
    
      });
})