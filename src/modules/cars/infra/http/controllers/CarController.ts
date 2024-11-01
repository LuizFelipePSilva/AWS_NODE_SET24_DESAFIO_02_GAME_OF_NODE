import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCarService from '@modules/cars/services/CreateCarService';
import ShowCarService from '@modules/cars/services/ShowCarService';
import ListCarService from '@modules/cars/services/ListCarService';
import UpdateCarService from '@modules/cars/services/UpdateCarService';
//import DeleteCarService from '@modules/cars/services/DeleteCarService';

export default class CarController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;
    const { status, plate, mark, model, year, km, priceMin, priceMax } = request.query;

    const listCar = container.resolve(ListCarService);
    const cars = await listCar.execute({ page, limit, status, plate, mark, model, year, km, priceMin, priceMax });

    return response.json(cars);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCar = container.resolve(ShowCarService);
    const car = await showCar.execute({ id });

    return response.json(car);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { plate, mark, model, km, year, items, price, status } = request.body;

    const createCar = container.resolve(CreateCarService);
    const car = await createCar.execute({ plate, mark, model, km, year, items, price, status });

    return response.status(201).json(car);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { plate, mark, model, km, year, items, price, status } = request.body;

    const updateCar = container.resolve(UpdateCarService);
    const car = await updateCar.execute({ id, plate, mark, model, km, year, items, price, status });

    return response.json(car);
  }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const { id } = request.params;

  //   const deleteCar = container.resolve(DeleteCarService);
  //   await deleteCar.execute({ id });

  //   return response.status(204).send();
  // }
}
