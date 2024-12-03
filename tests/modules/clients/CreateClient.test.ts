import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import CreateClientService from '@modules/clients/services/CreateClientService';
import ClientRepository from '@modules/clients/infra/typeorm/repositories/ClientRepository';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import AppError from '@shared/errors/AppError';


jest.mock('@modules/clients/infra/typeorm/repositories/ClientRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
          findByEmail: jest.fn(),
          findByCPF: jest.fn(),
          create: jest.fn(),
        };
      }),
    };
  });

  const clientRepository = new ClientRepository();

  const createClientService = new CreateClientService(clientRepository);

describe('CreateClientService', () => {

  it('Deve dar erro caso o email já exista', async () => {

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

    const spyFindByEmail = jest.spyOn(clientRepository, 'findByEmail');
    const spyFindByCPF = jest.spyOn(clientRepository, 'findByCPF');

    spyFindByEmail.mockImplementationOnce((email: string) => {
        return Promise.resolve(client);
    });

    jest.spyOn(clientRepository, 'create').mockResolvedValue(client);

    const requestData = {
        fullName: "Rigoberto Fernandes",
        email: "rigoberto@gmail.com",
        cpf: "123.456.789-09",
        birthDate: new Date(),
        phone: "84988884927",
    };

    await expect(createClientService.execute(requestData)).rejects.toThrow('Email address already used.');

  });

  it('Deve dar erro caso o cpf já exista', async () => {

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

    const spyFindByEmail = jest.spyOn(clientRepository, 'findByEmail');
    const spyFindByCPF = jest.spyOn(clientRepository, 'findByCPF');

    spyFindByCPF.mockImplementationOnce((cpf: string) => {
        return Promise.resolve(client);
    });

    jest.spyOn(clientRepository, 'create').mockResolvedValue(client);

    const requestData = {
        fullName: "Rigoberto Fernandes",
        email: "rigoberto@gmail.com",
        cpf: "123.456.789-09",
        birthDate: new Date(),
        phone: "84988884927",
    };

    await expect(createClientService.execute(requestData)).rejects.toThrow('CPF already used.');

  });

  it('Deve dar erro caso o cpf seja inválido', async () => {

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

    const spyFindByEmail = jest.spyOn(clientRepository, 'findByEmail');
    const spyFindByCPF = jest.spyOn(clientRepository, 'findByCPF');

    spyFindByCPF.mockImplementationOnce((cpf: string) => {
        return Promise.resolve(client);
    });

    jest.spyOn(clientRepository, 'create').mockResolvedValue(client);

    const requestData = {
        fullName: "Rigoberto Fernandes",
        email: "rigoberto@gmail.com",
        cpf: "123.456.789-9",
        birthDate: new Date(),
        phone: "84988884927",
    };

    await expect(createClientService.execute(requestData)).rejects.toThrow('Invalid CPF.');

  });

  it('Deve dar salvar o cliente após todas as validações', async () => {

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

    const spyFindByEmail = jest.spyOn(clientRepository, 'findByEmail');
    const spyFindByCPF = jest.spyOn(clientRepository, 'findByCPF');

    jest.spyOn(clientRepository, 'create').mockResolvedValue(client);

    const requestData = {
        fullName: "Rigoberto Fernandes",
        email: "rigoberto@gmail.com",
        cpf: "123.456.789-09",
        birthDate: new Date(),
        phone: "84988884927",
    };

    const saveClient = await createClientService.execute(requestData); 
    expect(saveClient);

  });

});
