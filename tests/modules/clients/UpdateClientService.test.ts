import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import UpdateClientService from '@modules/clients/services/UpdateClientService';
import ClientRepository from '@modules/clients/infra/typeorm/repositories/ClientRepository';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import AppError from '@shared/errors/AppError';


jest.mock('@modules/clients/infra/typeorm/repositories/ClientRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
          findById: jest.fn(),
          findByEmail: jest.fn(),
          findByCPF: jest.fn(),
          save: jest.fn(),
        };
      }),
    };
  });

  const clientRepository = new ClientRepository();

  const updateClientService = new UpdateClientService(clientRepository);

describe('UpdateClientService', () => {

  it('Deve dar erro caso o cliente não seja encontrado', async () => {
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
    const spyFindByEmail = jest.spyOn(clientRepository, 'findByEmail');
    const spyFindByCPF = jest.spyOn(clientRepository, 'findByCPF');

    spyFindById.mockImplementationOnce((id: string) => {
        return Promise.resolve(undefined);
    });

    spyFindByEmail.mockImplementationOnce((email: string) => {
        return Promise.resolve(client);
    });

    spyFindByCPF.mockImplementationOnce((cpf: string) => {
        return Promise.resolve(client);
    });

    //jest.spyOn(clientRepository, 'save').mockResolvedValue(client);

    const requestData = {
        id: '2',
        fullName: "Rigoberto Fernandes",
        email: "rigoberto@gmail.com",
        cpf: "123.456.789-09",
        birthDate: new Date(),
        phone: "84988884927",
    };

    await expect(updateClientService.execute(requestData)).rejects.toThrow('Client not found.');
    jest.clearAllMocks();
  });

  it('Deve dar erro caso o email já seja cadastrado em outro client', async () => {

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
    const spyFindByEmail = jest.spyOn(clientRepository, 'findByEmail');
    const spyFindByCPF = jest.spyOn(clientRepository, 'findByCPF');

    spyFindById.mockImplementationOnce((id: string) => {
        return Promise.resolve(client);
    });

    spyFindByEmail.mockImplementationOnce((email: string) => {
        return Promise.resolve(client);
    });

    spyFindByCPF.mockImplementationOnce((cpf: string) => {
        return Promise.resolve(client);
    });

    jest.spyOn(clientRepository, 'save').mockResolvedValue(client);

    const requestData = {
        id: '1',
        fullName: "Rigoberto Fernandes",
        email: "rigobert@gmail.com",
        cpf: "123.456.789-09",
        birthDate: new Date(),
        phone: "84988884927",
    };

    await expect(updateClientService.execute(requestData)).rejects.toThrow('There is already one client with this email.');
    jest.clearAllMocks();
  });

  it('Deve dar erro caso o cpf seja cadastrado em outro cliente', async () => {

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
    const spyFindByEmail = jest.spyOn(clientRepository, 'findByEmail');
    const spyFindByCPF = jest.spyOn(clientRepository, 'findByCPF');

    spyFindById.mockImplementationOnce((id: string) => {
        return Promise.resolve(client);
    });

    spyFindByEmail.mockImplementationOnce((email: string) => {
        return Promise.resolve(client);
    });

    spyFindByCPF.mockImplementationOnce((cpf: string) => {
        return Promise.resolve(client);
    });

    jest.spyOn(clientRepository, 'save').mockResolvedValue(client);

    const requestData = {
        id: '1',
        fullName: "Rigoberto Fernandes",
        email: "rigoberto@gmail.com",
        cpf: "123.456.779-09",
        birthDate: new Date(),
        phone: "84988884927",
    };

    await expect(updateClientService.execute(requestData)).rejects.toThrow('There is already one client with this CPF.');
    jest.clearAllMocks();
  });

  it('Deve dar certo ao editar o cliente após todas as validações', async () => {

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
    const spyFindByEmail = jest.spyOn(clientRepository, 'findByEmail');
    const spyFindByCPF = jest.spyOn(clientRepository, 'findByCPF');

    spyFindById.mockImplementationOnce((id: string) => {
        return Promise.resolve(client);
    });

    spyFindByEmail.mockImplementationOnce((email: string) => {
        return Promise.resolve(client);
    });

    spyFindByCPF.mockImplementationOnce((cpf: string) => {
        return Promise.resolve(client);
    });

    jest.spyOn(clientRepository, 'save').mockResolvedValue(client);

    const requestData = {
        id: '1',
        fullName: "Rigoberto Fernandes",
        email: "rigoberto@gmail.com",
        cpf: "123.456.789-09",
        birthDate: new Date(),
        phone: "84988884927",
    };

    const saveClient = await updateClientService.execute(requestData); 
    expect(saveClient);
    jest.clearAllMocks();
  });


});