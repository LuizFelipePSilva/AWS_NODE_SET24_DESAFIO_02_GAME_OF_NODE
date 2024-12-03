import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import DeleteClientService from '@modules/clients/services/DeleteClientService';
import ClientRepository from '@modules/clients/infra/typeorm/repositories/ClientRepository';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import AppError from '@shared/errors/AppError';


jest.mock('@modules/clients/infra/typeorm/repositories/ClientRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
            findById: jest.fn(),
            save: jest.fn(),
        };
      }),
    };
  });

  const clientRepository = new ClientRepository();

  const deleteClientService = new DeleteClientService(clientRepository);

describe('DeleteClientService', () => {

    it('Deve dar erro caso o cliente não exista', async () => {

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
    
        //jest.spyOn(clientRepository, 'save').mockResolvedValue(client);
    
        const clientId = '2';
    
        await expect(deleteClientService.execute({id: clientId})).rejects.toThrow('Client not found.');
    
      });

      it('Deve excluir o cliente', async () => {

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
    
        jest.spyOn(clientRepository, 'save').mockResolvedValue(client);
    
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
    
        const saveClient = await deleteClientService.execute(requestData); 
        expect(saveClient);
    
      });
})