import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import pokemon from './routes/pokemon.js';
import team from './routes/team.js';

(async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/pokemon', pokemon);
app.use('/team', team);

export default app;
