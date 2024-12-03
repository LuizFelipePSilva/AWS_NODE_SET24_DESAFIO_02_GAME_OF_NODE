import request from 'supertest';
import {describe, expect, it} from '@jest/globals';
const server = request('localhost:3333');
describe('Localhost status', () => {
  it('deve retornar status 200 ao acessar o Servidor', async () => {
    const response = await server.get('/');
    expect(response.status).toBe(200);
  });
});