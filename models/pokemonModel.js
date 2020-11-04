import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
  id: Number,
  name: String,
  height: String,
  weight: String,
  xp: Number,
  types: [String],
  image: String,
});

const pokemonModel = mongoose.model('pokemons', pokemonSchema, 'pokemons');

export default pokemonModel;
