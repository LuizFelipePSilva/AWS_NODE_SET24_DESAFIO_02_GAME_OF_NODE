<<<<<<< HEAD
import { Router } from "express"; 

const orderRoute = Router()

orderRoute.post('/', )
orderRoute.get('/', )
orderRoute.get('/:id', )
orderRoute.patch('/:id',)
orderRoute.get('/:id', )
=======
import isAuthenticate from '@shared/infra/http/middlewares/isAuthenticated';
import { Router } from 'express';
import OrdersController from '../controllers/OrderController';
import { celebrate, Joi, Segments } from 'celebrate';

const orderController = new OrdersController();
const orderRoute = Router();

orderRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      clientId: Joi.string().required(),
      carId: Joi.string().required(),
      cep: Joi.string().required(),
      value: Joi.number().required(),
    },
  }),
  isAuthenticate,
  orderController.create
);

orderRoute.get('/', isAuthenticate, orderController.index);

orderRoute.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticate,
  orderController.show
);

orderRoute.patch(
  '/:id',
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
  isAuthenticate,
  orderController.update
);

orderRoute.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticate,
  orderController.softdelete
);

export default orderRoute;
>>>>>>> main
