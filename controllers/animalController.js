module.exports.getAllAnimals = (req, res) => {
  res.json({ message: "Home page of animals" });
};

module.exports.getAnimalById = (req, res) => {
  const animalId = req.params.aid;
  res.json({ message: `get animal by id ${animalId}` });
};

module.exports.createNewAnimal = (req, res) => {
  res.json({ message: "add new animal" });
};

module.exports.updateAnimal = (req, res) => {
  res.json({ message: "update animal" });
};

module.exports.deleteAnimal = (req, res) => {
  res.json({ message: "animal deleted" });
};
