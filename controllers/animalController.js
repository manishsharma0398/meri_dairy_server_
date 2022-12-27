const { db } = require("../database/db");
const { getUserId } = require("../utils/userId");
const { handleServerError } = require("../utils/errorHandler");
const { animalValidator } = require("../validation/animalValidator");

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

module.exports.createNewAnimal = async (req, res) => {
  const { photo_url, ...otherData } = req.body;

  try {
    await animalValidator.validateAsync(otherData, {
      abortEarly: false,
    });
  } catch (errors) {
    const animalErr = [];
    errors.details.forEach((err) => {
      const key = err.path[0] + "_error";
      const obj = {};
      obj[key] = err.message;
      animalErr.push(obj);
    });
    return res.status(409).json(animalErr);
  }

  const q =
    "INSERT INTO animal(`identifier`, `breed`, `animal_type`, `animal_status`, `date`, `gender`, `remarks`, `photo_url`, `bull_name`, `bull_breed`, `dam_name`, `dam_breed`, `user_id`) VALUES(?)";

  const values = [
    req.body.identifier,
    req.body.breed,
    req.body.animal_type,
    req.body.animal_status,
    req.body.date,
    req.body.gender,
    req.body.remarks,
    req.body.photo_url,
    req.body.bull_name,
    req.body.bull_breed,
    req.body.dam_name,
    req.body.dam_breed,
    getUserId(req),
  ];
  db.query(q, [values], async (err, data) => {
    console.log(err);
    if (err) return await handleServerError(res);

    return res.status(201).json({ message: "Animal added successfully" });
  });
};

module.exports.updateAnimal = async (req, res) => {
  const { photo_url, ...otherData } = req.body;

  try {
    await animalValidator.validateAsync(otherData, {
      abortEarly: false,
    });
  } catch (errors) {
    const animalErr = [];
    errors.details.forEach((err) => {
      const key = err.path[0] + "_error";
      const obj = {};
      obj[key] = err.message;
      animalErr.push(obj);
    });
    return res.status(409).json(animalErr);
  }

  const animalId = req.params.aid;

  const q =
    "UPDATE animal SET `identifier`=?,`breed`=?,`animal_type`=?,`animal_status`=?,`date`=?,`gender`=?,`remarks`=?,`photo_url`=?,`bull_name`=?,`bull_breed`=?,`dam_name`=?,`dam_breed`=?  WHERE `id`=? AND `user_id`=?";

  db.query(
    q,
    [
      req.body.identifier,
      req.body.breed,
      req.body.animal_type,
      req.body.animal_status,
      req.body.date,
      req.body.gender,
      req.body.remarks,
      req.body.photo_url,
      req.body.bull_name,
      req.body.bull_breed,
      req.body.dam_name,
      req.body.dam_breed,
      animalId,
      getUserId(req),
    ],
    (err, data) => {
      if (err) return handleServerError(res);
      return res.status(200).json({ message: "Sucessfully Updated" });
    }
  );
};

module.exports.deleteAnimal = (req, res) => {
  const animalId = req.params.aid;
  const q = "DELETE FROM animal WHERE `id`=? AND `user_id`=?";
  db.query(q, [animalId, getUserId(req)], async (err, data) => {
    if (err) return await handleServerError(req);
    return res.status(200).json({ message: "Animal Deleted Successfully" });
  });
};
