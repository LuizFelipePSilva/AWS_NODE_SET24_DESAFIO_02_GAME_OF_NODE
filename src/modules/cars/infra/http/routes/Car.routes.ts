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
            ID: Joi.string().uuid().required(),
        },
    }),
    carController.findById
);


carRoute.get('/', carController.index)

carRoute.patch('/:id')
carRoute.delete('/:id',carController.delete)

export default carRoute;