import express from 'express';
import { findPokemon } from '../controllers/pokemonController.js';

const router = express.Router();

router.get('/', findPokemon);

export default router;
