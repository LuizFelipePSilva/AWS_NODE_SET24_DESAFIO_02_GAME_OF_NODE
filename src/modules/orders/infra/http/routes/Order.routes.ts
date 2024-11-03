import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticate from '@shared/infra/http/middlewares/isAuthenticated';
import OrdersController from '../controllers/OrderController';

const orderController = new OrdersController();
const orderRoute = Router();

orderRoute.post(
  '/', 
  isAuthenticate,
  celebrate({
    [Segments.BODY]: {
      clientId: Joi.string().uuid().required(),
      carId: Joi.string().uuid().required(),
      cep: Joi.string().required(),
      value: Joi.number().required(),
    },
  }),
  orderController.create
);


orderRoute.get(
  '/',
  isAuthenticate,
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().integer().min(1).default(1),
      limit: Joi.number().integer().min(1).default(10),
      status: Joi.string().valid('Aberto', 'Aprovado', 'Cancelado').optional(),
      cpf: Joi.string().optional(),
      startDate: Joi.date().optional(),
      endDate: Joi.date().optional(),
      order: Joi.string().valid('ASC', 'DESC').default('DESC'),
    },
  }),
  orderController.index
);


orderRoute.get(
  '/:id',
  isAuthenticate,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  orderController.show
);


orderRoute.patch(
  '/:id',
  isAuthenticate,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      orderDate: Joi.date().optional(),
      purchaseDate: Joi.date().optional(),
      cep: Joi.string().optional(),
      status: Joi.string().valid('Aberto', 'Aprovado', 'Cancelado').optional(),
    },
  }),
  orderController.update
);

orderRoute.delete(
  '/:id',
  isAuthenticate,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  orderController.softdelete
);

export default orderRoute;
