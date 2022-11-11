exports.getAllAnimals = (req, res) => {
  res.json({ message: "Home page of animals" });
};

exports.getAnimalById = (req, res) => {
  res.json({ message: "get animal by id" });
};

exports.createNewAnimal = (req, res) => {
  res.json({ message: "add new animal" });
};

exports.updateAnimal = (req, res) => {
  res.json({ message: "update animal" });
};

exports.deleteAnimal = (req, res) => {
  res.json({ message: "animal deleted" });
};
