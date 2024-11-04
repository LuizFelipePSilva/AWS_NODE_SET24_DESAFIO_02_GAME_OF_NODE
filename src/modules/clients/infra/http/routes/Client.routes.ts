// import clientRoute
import isAuthenticate from '@shared/infra/http/middlewares/isAuthenticated';
import { Router } from 'express';
import ClientsController from "../controllers/ClientController";
import { celebrate, Joi, Segments } from 'celebrate';

const clientsController = new ClientsController();
const clientRoutes = Router();

clientRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      fullName: Joi.string().required(),
      birthDate: Joi.date().required(),
      cpf: Joi.string().length(11).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().optional(),
    },
  }),
  isAuthenticate,
  clientsController.create,
);

clientRoutes.get('/', isAuthenticate, clientsController.index);

clientRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticate,
  clientsController.show,
);

clientRoutes.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      fullName: Joi.string().optional(),
      birthDate: Joi.date().optional(),
      cpf: Joi.string().length(11).optional(),
      email: Joi.string().email().optional(),
      phone: Joi.string().optional(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticate,
  clientsController.update,
);

clientRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticate,
  clientsController.delete,
);

export default clientRoutes;