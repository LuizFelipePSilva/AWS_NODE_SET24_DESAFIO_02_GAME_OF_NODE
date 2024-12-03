import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import FindOrder from '@modules/orders/services/FindOrder';
import OrderRepository from '@modules/orders/infra/typeorm/repositories/OrderRepository';
import { Order } from '@modules/orders/infra/typeorm/entities/Order';
import AppError from '@shared/errors/AppError';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import Cars, { statusEnum } from '@modules/cars/infra/typeorm/entities/Cars';
import { SearchParams } from '@modules/orders/services/FindOrder';
import { IOrderPaginate } from '@modules/orders/domain/models/IOrderPaginate'
import { IFindRequest } from '@modules/orders/domain/models/IFindRequest';

jest.mock('@modules/orders/infra/typeorm/repositories/OrderRepository', () => {
    return {
      __esModule: true,
      default: jest.fn().mockImplementation(() => {
        return {
            findAll: jest.fn(),
        };
      }),
    };
  });

  const orderRepository = new OrderRepository();

  const findOrderService = new FindOrder(orderRepository);

  describe('FindOrder', () => {
    it('Deve listar todos os pedidos', async () => {

        const order: IFindRequest [] = [{
            id: '1',
            clientId: "1",
            clientName:"Rigoberto Fernandes",
            clientCpf: '1063697488',
            orderDate: new Date(),
            status: 'Aberto',
            cep: "12345-678",
            city: "Mossoró",
            uf: "RN",
            totalValue: 90.000,
            purchaseDate: new Date(),
            cancellationDate: new Date(),
        }];

        const spyFindAll = jest.spyOn(orderRepository, 'findAll');

        spyFindAll.mockImplementationOnce(({ page, skip, take }) => {
            return Promise.resolve({
                per_page: 1,
                total: 1,
                current_page: 1,
                data: order,
                last_page: 1,
            } as IOrderPaginate);
        });

        const requestData = {
            page: 1, limit: 1, status: 'ativo', cpf: '123', startDate: new Date(), endDate: new Date(),
        } as SearchParams;
    
        const orderDelete = await findOrderService.execute(requestData); 
        expect(orderDelete);
    
        jest.clearAllMocks();

    });

    it('Deve dar erro ao listar todos os pedidos', async () => {

        const order: IFindRequest [] = [{
            id: '1',
            clientId: "1",
            clientName:"Rigoberto Fernandes",
            clientCpf: '1063697488',
            orderDate: new Date(),
            status: 'Aberto',
            cep: "12345-678",
            city: "Mossoró",
            uf: "RN",
            totalValue: 90.000,
            purchaseDate: new Date(),
            cancellationDate: new Date(),
        }];

        const spyFindAll = jest.spyOn(orderRepository, 'findAll');

        spyFindAll.mockImplementationOnce(({ page, skip, take }) => {
            return Promise.resolve({
                per_page: 1,
                total: 0,
                current_page: 1,
                data: [],
                last_page: 1,
            } as IOrderPaginate);
        });

        const requestData = {
            page: 1, limit: 1, status: 'ativo', cpf: '123', startDate: new Date(), endDate: new Date(),
        } as SearchParams;
    
        await expect(findOrderService.execute(requestData))
        .rejects
        .toThrow('No orders found.')

        jest.clearAllMocks();

    });
})
