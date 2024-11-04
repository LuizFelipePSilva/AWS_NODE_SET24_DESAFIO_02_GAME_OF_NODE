import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '@modules/orders/services/CreateOrder';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import ListOrderService from '@modules/orders/services/FindOrder';
import UpdateOrderService from '@modules/orders/services/UpdateOrderService';
import SoftDeleteOrderService from '@modules/orders/services/SoftDeleteOrder';

export default class OrdersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      page = 1,
      limit = 10,
      order,
      status,
      cpf,
      startDate,
      endDate,
    } = request.query;

    const listOrderService = container.resolve(ListOrderService);

    const orders = await listOrderService.execute({
      page: Number(page),
      limit: Number(limit),
      status: status as string,
      cpf: cpf as string,
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
    });

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
    const { id } = request.params;
    const { orderDate, purchaseDate, cep, status } = request.body;

    const updateOrder = container.resolve(UpdateOrderService);

    const order = await updateOrder.execute({
      id,
      orderDate,
      purchaseDate,
      cep,
      status,
    });

    return response.json(order);
  }

  public async softdelete(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const softDelete = container.resolve(SoftDeleteOrderService);
    const order = await softDelete.execute({ id });

    return response.send(order);
  }
}
