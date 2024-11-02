import CreateClientService from '@modules/clients/services/CreateClientService';
import DeleteClientService from '@modules/clients/services/DeleteClientService';
import ListClientService from '@modules/clients/services/ListClientService';
import ShowClientService from '@modules/clients/services/ShowClientService';
import UpdateClientService from '@modules/clients/services/UpdateClientService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ClientsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listClients = container.resolve(ListClientService);
    
    const clients = await listClients.execute();
    
    return response.json(clients);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showClient = container.resolve(ShowClientService);

    const client = await showClient.execute({ id });

    return response.json(client);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { fullName, email, cpf, birthDate, phone } = request.body; 

    const createClient = container.resolve(CreateClientService);

    const client = await createClient.execute({
      fullName,
      email,
      cpf,
      birthDate,
      phone,
    });

    return response.json(client);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { fullName, email, cpf, birthDate, phone } = request.body;

    const { id } = request.params;

    const updateClient = container.resolve(UpdateClientService);

    const client = await updateClient.execute({
      id,
      fullName,
      email,
      cpf,
      birthDate,
      phone,
    });

    return response.json(client);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteClient = container.resolve(DeleteClientService);

    await deleteClient.execute({ id });
    
    return response.json([]);
  }
}
