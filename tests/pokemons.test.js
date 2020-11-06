import request from 'supertest';
import app from '../app';

describe('Pokemon get tests', () => {
  it('Should be get all pokemons', async () => {
    const result = await request(app).get('/pokemon');
    expect(result.status).toBe(200);
  });

  it('Shoud be return a list of 3 pokemons', async () => {
    const result = await request(app).get('/pokemon?name=saur&type=grass,fire');
    expect(result.status).toBe(200);
    expect(result.body.length).toBe(3);
  });

  it('Shoud be return a list of 0 pokemons', async () => {
    const result = await request(app).get('/pokemon?name=saurasdasdasd&type=grass,fire');
    expect(result.status).toBe(200);
    expect(result.body.length).toBe(0);
  });
});
