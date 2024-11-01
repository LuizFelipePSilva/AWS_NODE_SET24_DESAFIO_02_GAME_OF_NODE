// import clientRoute
import isAuthenticate from '@shared/infra/http/middlewares/isAuthenticated';
import { Router } from 'express';
import ClientsController from "../controllers/ClientController";
import { celebrate, Joi, Segments } from 'celebrate';

const clientsController = new ClientsController();
const clientRoutes = Router();

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

clientRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      fullname: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  isAuthenticate,
  clientsController.create,
);

clientRoutes.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      fullname: Joi.string().required(),
      email: Joi.string().email().required(),
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