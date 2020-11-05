import joi from 'joi';

const MIN_TEAM_NAME_SIZE = 5;
const MAX_POKEMON_NUMBER = 6;

const bodySchema = joi.object().keys({
  name: joi.string().min(MIN_TEAM_NAME_SIZE).required(),
  pokemons: joi
    .array()
    .unique()
    .max(MAX_POKEMON_NUMBER)
    .items(joi.number())
    .required(),
});

const validateTeam = (req, res, next) => {
  const { error } = bodySchema.validate(req.body);
  if (error) {
    res.status(422).json(error);
  } else {
    next();
  }
};

export default validateTeam;
