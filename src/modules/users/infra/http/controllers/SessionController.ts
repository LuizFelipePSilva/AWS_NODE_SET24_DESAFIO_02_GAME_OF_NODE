import { ICreateSession } from '@modules/users/domain/models/ICreateSession';
import CreateSessionService from '@modules/users/services/CreateSession';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password }: ICreateSession = request.body;

    try {
      const createSessionService = container.resolve(CreateSessionService);

      const { user, token } = await createSessionService.execute({
        email,
        password,
      });

      return response.json(instanceToInstance({ user, token }));
    } catch (error) {
      const errorMessage = (error as Error).message || 'Erro desconhecido';
      return response.status(401).json({ message: errorMessage });
    }
  }
}

export default SessionController;
