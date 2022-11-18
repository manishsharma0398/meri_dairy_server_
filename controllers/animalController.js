const { db } = require("../database/db");
const { getUserId } = require("../utils/userId");
const { handleServerError } = require("../utils/errorHandler");

module.exports.getAllAnimals = (req, res) => {
  const q = "SELECT * FROM animal WHERE `user_id`=?";
  db.query(q, [getUserId(req)], async (err, data) => {
    if (err) return await handleServerError(res);

    return res.status(200).json({ data });
  });
};

module.exports.getAnimalById = (req, res) => {
  const animalId = req.params.aid;
  const q = "SELECT * FROM animal WHERE `id`=? AND `user_id`=?";

  db.query(q, [animalId, getUserId(req)], async (err, data) => {
    if (err) return await handleServerError(res);
    return res.status(200).json({ data: data[0] });
  });
};

module.exports.createNewAnimal = (req, res) => {
  const {
    identifier,
    breed,
    animal_type,
    animal_status,
    date,
    gender,
    remarks,
    photo_url,
    bull_name,
    bull_breed,
    dam_name,
    dam_breed,
  } = req.body;

  const q =
    "INSERT INTO animal(`identifier`, `breed`, `animal_type`, `animal_status`, `date`, `gender`, `remarks`, `photo_url`, `bull_name`, `bull_breed`, `dam_name`, `dam_breed`, `user_id`) VALUES(?)";
  const values = [
    identifier,
    breed,
    animal_type,
    animal_status,
    date,
    gender,
    remarks,
    photo_url,
    bull_name,
    bull_breed,
    dam_name,
    dam_breed,
    getUserId(req),
  ];
  db.query(q, [values], async (err, data) => {
    if (err) return await handleServerError(res);

    return res.status(201).json({ message: "Animal added successfully" });
  });
};

module.exports.updateAnimal = (req, res) => {
  const animalId = req.params.aid;
  const {
    identifier,
    breed,
    animal_type,
    animal_status,
    date,
    gender,
    remarks,
    photo_url,
    bull_name,
    bull_breed,
    dam_name,
    dam_breed,
  } = req.body;

  const q =
    "UPDATE animal SET (`identifier`, `breed`, `animal_type`, `animal_status`, `date`, `gender`, `remarks`, `photo_url`, `bull_name`, `bull_breed`, `dam_name`, `dam_breed`, `user_id`)  WHERE `id`=? AND `user_id`=?";

  const values = [
    identifier,
    breed,
    animal_type,
    animal_status,
    date,
    gender,
    remarks,
    photo_url,
    bull_name,
    bull_breed,
    dam_name,
    dam_breed,
    animalId,
    getUserId(req),
  ];

  db.query("", [values], (err, data) => {
    if (err) return handleServerError(res);
    return console.log(data);
  });
};

module.exports.deleteAnimal = (req, res) => {
  const animalId = req.params.aid;
  const q = "DELETE FROM animal WHERE `id`=? AND `user_id`=?";
  db.query(q, [animalId, getUserId(req)], async (err, data) => {
    if (err) return await handleServerError(req);
    return res.status(200).json({ message: "Animal Deleted Successfully" });
  });
};
