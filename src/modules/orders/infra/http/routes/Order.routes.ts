import isAuthenticate from '@shared/infra/http/middlewares/isAuthenticated';
import { Router } from 'express';
import OrdersController from '../controllers/OrderController';
import { celebrate, Joi, Segments } from 'celebrate';

const orderController = new OrdersController();
const orderRoute = Router();

orderRoute.post(
  '/', 
  isAuthenticate,
  celebrate({
    [Segments.BODY]: {
      clientId: Joi.string().required(),
      carId: Joi.string().required(),
      cep: Joi.string().required(),
      value: Joi.number().required(),
    },
  }),
  orderController.create
);

orderRoute.get('/', isAuthenticate, orderController.index);

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
      orderDate: Joi.date(),
      purchaseDate: Joi.date(),
      cep: Joi.string(),
      status: Joi.string().valid('Aberto', 'Aprovado', 'Cancelado'),
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
