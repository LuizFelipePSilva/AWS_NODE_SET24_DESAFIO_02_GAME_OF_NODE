import CreateClientService from '@modules/clients/services/CreateClientService';
import DeleteClientService from '@modules/clients/services/DeleteClientService';
import ListClientService from '@modules/clients/services/ListClientService';
import ShowClientService from '@modules/clients/services/ShowClientService';
import UpdateClientService from '@modules/clients/services/UpdateClientService';
import { Request, Response } from 'express';


export default class ClientsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listClients = new ListClientService();

    const clients = await listClients.execute();

    return response.json(clients);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showClient = new ShowClientService();

    const client = await showClient.execute({ id });

    return response.json(client);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { fullName, email } = request.body;

    const createClient = new CreateClientService();

    const client = await createClient.execute({
      fullName,
      email,
    });

    return response.json(client);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { fullName, email } = request.body;
    const { id } = request.params;

    const updateClient = new UpdateClientService();

    const client = await updateClient.execute({
      id,
      fullName,
      email,
    });

    return response.json(client);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteClient = new DeleteClientService();

    await deleteClient.execute({ id });

    return response.json([]);
  }
}