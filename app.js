import express from 'express';
import cors from 'cors';

import pokemon from './routes/pokemon.js'

const app = express();

app.use(express.json());
app.use(cors());

app.use('/pokemon', pokemon);

export default app;
