import { Router } from "express"; 
import CarController from "../controllers/CarController";

const carRoute = Router()

const carController = new CarController()

carRoute.post('/', carController.create)
carRoute.get('/', carController.index)
carRoute.get('/:id', carController.findById)
carRoute.patch('/:id')
carRoute.delete('/:id',carController.delete)

export default carRoute;