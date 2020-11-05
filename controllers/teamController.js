import team from '../models/teamModel.js';

const createTeam = async (req, res) => {
  try {
    const { name, pokemons } = req.body;
    await team.create({ name, pokemons });
    res.status(201).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'internal error' });
  }
};

export default createTeam;
