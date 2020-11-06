import request from 'supertest';

import team from '../models/teamModel.js';
import app from '../app';

describe('Team create tests', () => {
  beforeEach(async () => {
    await team.deleteMany({});
  });

  afterAll(async () => {
    await team.deleteMany({});
  });

  it('Should create a valid team', async () => {
    const postBody = {
      name: 'lets00',
      pokemons: [1, 2, 3, 4],
    };
    const response = await request(app).post('/team').send(postBody);
    expect(response.status).toBe(201);
  });

  it('Should not create a team with more than 6 pokemons', async () => {
    const postBody = {
      name: 'lets00',
      pokemons: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
    const response = await request(app).post('/team').send(postBody);
    expect(response.status).toBe(422);
  });

  it('Should not create a team with short name', async () => {
    const postBody = {
      name: 'l',
      pokemons: [1],
    };
    const response = await request(app).post('/team').send(postBody);
    expect(response.status).toBe(422);
  });

  it('Should not create a team with a invalid id', async () => {
    const postBody = {
      name: 'lets00',
      pokemons: [1, 2, 99999999],
    };
    const response = await request(app).post('/team').send(postBody);
    expect(response.status).toBe(422);
  });

  it('Should not create if name is missing', async () => {
    const postBody = {
      pokemons: [1, 2, 99999999],
    };
    const response = await request(app).post('/team').send(postBody);
    expect(response.status).toBe(422);
  });

  it('Should not create if pokemons is missing', async () => {
    const postBody = {
      name: 'lets00',
    };
    const response = await request(app).post('/team').send(postBody);
    expect(response.status).toBe(422);
  });

  it('Should not create if team already create', async () => {
    const postBody = {
      name: 'lets00',
      pokemons: [1, 2, 3, 4],
    };
    const response = await request(app).post('/team').send(postBody);
    expect(response.status).toBe(201);
    const response2 = await request(app).post('/team').send(postBody);
    expect(response2.status).toBe(422);
  });

  it('Should not create if exist pokemon id repetead', async () => {
    const postBody = {
      name: 'lets00',
      pokemons: [1, 2, 3, 3],
    };
    const response = await request(app).post('/team').send(postBody);
    expect(response.status).toBe(422);
  });
});
