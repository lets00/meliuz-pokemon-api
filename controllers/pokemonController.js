import pokemonModel from '../models/pokemonModel.js';

const findPokemon = async (req, res) => {
  const stringSearch = {};

  if (req.query.name) {
    stringSearch.name = { $regex: req.query.name, $options: 'i' };
  }
  if (req.query.types) {
    stringSearch.types = { $in: req.query.types.split(',') };
  }

  try {
    const data = await pokemonModel.find(stringSearch);
    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: 'internal error' });
  }
};

export default findPokemon;
