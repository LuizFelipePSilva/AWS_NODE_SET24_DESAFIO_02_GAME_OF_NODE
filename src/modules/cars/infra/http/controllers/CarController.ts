import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCarService from '@modules/cars/services/CreateCarService';
import SoftDeleteCarService from '@modules/cars/services/SoftDeleteCarService';
import ListCarService from '@modules/cars/services/ListCarService';
import ShowCarService from '@modules/cars/services/ShowCarService';
import AppError from '@shared/errors/AppError';

export default class CarController {

  public async index(request: Request, response: Response): Promise<Response> {
    const {
      status,
      plateEnd,
      mark,
      model,
      items,
      maxKm,
      yearFrom,
      yearTo,
      priceMin,
      priceMax,
      page = 1,
      limit = 15,
    } = request.query;

    const listCarService = container.resolve(ListCarService);

    const cars = await listCarService.execute({
      status: status as 'Ativo' | 'Inativo',
      plateEnd: plateEnd ? String(plateEnd) : undefined,
      mark: mark ? String(mark) : undefined,
      model: model ? String(model) : undefined,
      items: items ? (items as string[]).slice(0, 5) : undefined,
      maxKm: maxKm ? Number(maxKm) : undefined,
      yearFrom: yearFrom ? Number(yearFrom) : undefined,
      yearTo: yearTo ? Number(yearTo) : undefined,
      priceMin: priceMin ? Number(priceMin) : undefined,
      priceMax: priceMax ? Number(priceMax) : undefined,
      page: Number(page),
      limit: Number(limit),
    });

    if (cars.total === 0) {
      return response.status(404).json({ message: 'Nenhum carro encontrado.' });
    }

    return response.json(cars);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { plate, mark, model, km, year, items, price } = request.body;

    const createCar = container.resolve(CreateCarService);

    const car = await createCar.execute({
      plate,
      mark,
      model,
      km,
      year,
      items,
      price,
    });

    return response.json(car);
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCarService = container.resolve(ShowCarService);

    try {
      const car = await showCarService.execute({ id });
      return response.json(car);
    } catch (error) {
      throw new AppError('Carro não encontrado.', 404);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const softDeleteCarService = container.resolve(SoftDeleteCarService);

    const car = await softDeleteCarService.execute(id);

    return response.send(car);
  }

}
