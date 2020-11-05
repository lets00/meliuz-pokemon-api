import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: String,
  pokemons: [Number],
});

const teamModel = mongoose.model('teams', teamSchema, 'teams');

export default teamModel;
