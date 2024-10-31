import isAuthenticate from "@shared/infra/http/middlewares/isAuthenticated";
import { Router } from "express"; 
import OrdersController from "../controllers/OrderController";
const orderController = new OrdersController()

const orderRoute = Router()

orderRoute.post('/', isAuthenticate, orderController.create)
orderRoute.get('/',  isAuthenticate, orderController.index)
orderRoute.get('/:id', isAuthenticate, orderController.show)
orderRoute.patch('/:id', isAuthenticate, orderController.update)
orderRoute.delete('/:id', isAuthenticate, orderController.softdelete)

export default orderRoute