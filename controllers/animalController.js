const { db } = require("../database/db");

module.exports.getAllAnimals = (req, res) => {
  const q = "SELECT * FROM animals WHERE `user_id`=?";
  db.query(q, [1], (err, data) => {
    if (err) {
      return console.log(err);
    }
    return res.status(200).json(data);
  });
};

module.exports.getAnimalById = (req, res) => {
  const animalId = req.params.aid;
  const q = "SELECT * FROM animals WHERE `tag_no`=? AND `user_id`=?";

  db.query(q, [animalId, 1], (err, data) => {
    if (err) {
      return console.log(err);
    }
    return res.status(200).json(data[0]);
  });
};

module.exports.createNewAnimal = (req, res) => {
  const q =
    "INSERT INTO animals(`tag_no`, `breed`, `animal_type`, `animal_status`, `gender`, `remarks`, `photo_url`, `user_id`) VALUES(?)";
  const values = [
    req.body.tag_no,
    req.body.breed,
    req.body.animal_type,
    req.body.animal_status,
    req.body.gender,
    req.body.remarks,
    req.body.photo_url,
    1,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ error: "Something went wrong" });
    }

    return res.status(201).json({ message: "Animal added successfully" });
  });
};

module.exports.updateAnimal = (req, res) => {
  const animalId = req.params.aid;
  const q =
    "UPDATE animals SET `tag_no`=?, `breed`=?, `animal_type`=?, `animal_status`=?, `gender`=?, `remarks`=?, `photo_url`=? WHERE `tag_no`=? AND `user_id`=?";
  const values = [
    req.body.tag_no,
    req.body.breed,
    req.body.animal_type,
    req.body.animal_status,
    req.body.gender,
    req.body.remarks,
    req.body.photo_url,
  ];
  db.query(q, [...values, animalId, 1], (err, data) => {
    if (err) {
      return console.log(err);
    }
    return console.log(data);
  });
};

module.exports.deleteAnimal = (req, res) => {
  const q = "DELETE FROM animals WHERE `tag_no`=? AND `user_id`=?";
  db.query(q, [req.body.tag_no, 1], (err, data) => {
    if (err) {
      return console.log(err);
    }
    return res.status(200).json(data);
  });
};
