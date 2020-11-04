const findPokemon = (req, res) => {
  const search = {};
  if (req.query.name) {
    search.name = req.query.name;
  }
  if (req.query.type) {
    search.type = req.query.type;
  }
  res.status(200).json({ msg: 'ok', search });
};

export { findPokemon };
