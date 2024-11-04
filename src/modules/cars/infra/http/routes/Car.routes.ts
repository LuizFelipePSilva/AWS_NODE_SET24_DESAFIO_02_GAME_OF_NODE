import isAuthenticate from '@shared/infra/http/middlewares/isAuthenticated';
import { Router } from "express"; 
import CarController from "../controllers/CarController";
import { celebrate, Joi, Segments } from 'celebrate';

const carRoute = Router()
const carController = new CarController()


carRoute.post(
    '/',
    isAuthenticate,
    celebrate({
        [Segments.BODY]:{
            plate: Joi.string().required(),
            mark: Joi.string().required(),
            model: Joi.string().required(),
            km: Joi.number().required(),
            year: Joi.number().required(),
            price: Joi.number().required(),
            items: Joi.array().items(Joi.string()).required(),
        },
    }),
     carController.create
);

carRoute.get(
    '/:id',
    isAuthenticate,
    celebrate({
        [Segments.PARAMS]:{
            id: Joi.string().uuid().required(),
        },
    }),
    carController.findById
);


carRoute.get(
    '/', 
    isAuthenticate,
    celebrate({
        [Segments.QUERY]: {
            status: Joi.string().valid('Ativo', 'Inativo').optional(),
            plate: Joi.string().length(4).optional(),
            mark: Joi.string().optional(),
            model: Joi.string().optional(),
            items: Joi.array().items(Joi.string()).max(5).optional(),
            km: Joi.number().integer().positive().optional(),
            yearFrom: Joi.number().integer().min(1900).optional(),
            yearTo: Joi.number().integer().min(1900).optional(),
            priceMin: Joi.number().positive().optional(),
            priceMax: Joi.number().positive().optional(),
            sortBy: Joi.string().valid('price', 'year', 'km').optional(),
            order: Joi.string().valid('asc', 'desc').optional(),
            page: Joi.number().integer().min(1).default(1),
            limit: Joi.number().integer().min(1).default(10),
        },
    }),
    carController.index
);

carRoute.patch(
    '/:id',
    isAuthenticate,
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(), // validação do ID como UUID
      },
      [Segments.BODY]: {
        plate: Joi.string().optional(),
        mark: Joi.string().optional(),
        model: Joi.string().optional(),
        km: Joi.number().optional(),
        year: Joi.number().integer().optional(),
        items: Joi.array().items(Joi.string()).max(5).optional(),
        price: Joi.number().optional(),
        status: Joi.string().valid('Ativo', 'Inativo').optional(),
      },
    }),
    carController.update
);

carRoute.delete(
    '/:id',
    isAuthenticate,
    celebrate({
        [Segments.PARAMS]:{
            id: Joi.string().uuid().required(),
        },
    }),
    carController.softDelete
);

export default carRoute;