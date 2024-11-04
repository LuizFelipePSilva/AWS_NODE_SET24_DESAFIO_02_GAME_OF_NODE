import { Router } from 'express';
import UserController from '../controllers/UserController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticate from '@shared/infra/http/middlewares/isAuthenticated';

const userController = new UserController();
const userRoutes = Router();

userRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      fullName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  userController.create
);

userRoutes.get('/', isAuthenticate, userController.index);

userRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticate,
  userController.show
);

userRoutes.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      fullName: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(6),
    },
  }),
  isAuthenticate,
  userController.update
);

userRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticate,
  userController.softDelete
);

export default userRoutes;
