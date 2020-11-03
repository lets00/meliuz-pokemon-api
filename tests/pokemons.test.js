import request from 'supertest';
import fs from 'fs';
import util from 'util';
import app from '../app';

describe('Pokemon get tests', () => {
  it('Should be get all pokemons', async () => {
    const readFilePromise = util.promisify(fs.readFile);

    const file = await readFilePromise('./tests/pokemon.json');
    const fileJson = await JSON.parse(file);
    const result = await request(app).get('/pokemon');
    console.log(result.body);
    expect(result.body).toMatchObject(fileJson);
  });
})
