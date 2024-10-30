import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '@modules/orders/services/CreateOrder';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import ListOrderService from '@modules/orders/services/FindOrder';

export default class OrdersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;
    const listOrders = container.resolve(ListOrderService);

    const orders = await listOrders.execute({ page, limit });

    return response.json(orders);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { clientId, carId, cep, value } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({ clientId, carId, cep, value });

    return response.json(order);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const {id} = request.params
    const { cep, orderDate,  } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({ clientId, carId, cep, value });

    return response.json(order);
  }
}
