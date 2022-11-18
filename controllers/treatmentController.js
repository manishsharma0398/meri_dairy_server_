const { db } = require("../database/db");
const { getUserId } = require("../utils/userId");
const { handleServerError } = require("../utils/errorHandler");

module.exports.addTreatment = (req, res) => {
  const {
    animal_id,
    date,
    vet_name,
    medicine_with_quantity,
    disease,
    disease_remarks,
    treatment_remarks,
    cost,
  } = req.body;
  const q =
    "INSERT INTO treatment(`animal_id`, `date`, `vet_name`,`medicine_with_quantity`, `disease`, `disease_remarks`,`treatment_remarks`,`cost`, `user_id`) VALUES(?)";
  const values = [
    animal_id,
    date,
    vet_name,
    medicine_with_quantity,
    disease,
    disease_remarks,
    treatment_remarks,
    cost,
    getUserId(req),
  ];

  db.query(q, [values], (err) => {
    if (err) return handleServerError(res);

    return res.status(201).json({ message: "Treatment added successfully" });
  });
};

module.exports.getAllTreatment = (req, res) => {
  const q = "SELECT * FROM treatment WHERE `user_id`=?";
  const values = [getUserId(req)];
  db.query(q, [values], (err, data) => {
    if (err) return handleServerError(res);

    return res.status(200).json(data);
  });
};

module.exports.updateTeatment = (req, res) => {
  const {
    animal_id,
    date,
    vet_name,
    medicine_with_quantity,
    disease,
    disease_remarks,
    treatment_remarks,
    cost,
  } = req.body;
  const treatmentId = req.params.tid;
  const q =
    "UPDATE treatment SET `animal_id`=?, `date`=?, `vet_name`=?,`medicine_with_quantity`=?, `disease`=?, `disease_remarks`=?,`treatment_remarks`=?,`cost`=?  WHERE `id`=? AND `user_id`=?";
  db.query(
    q,
    [
      animal_id,
      date,
      vet_name,
      medicine_with_quantity,
      disease,
      disease_remarks,
      treatment_remarks,
      cost,
      treatmentId,
      getUserId(req),
    ],
    (err, data) => {
      if (err) return handleServerError(res);
      return res.status(200).json({ message: "Successfully updated" });
    }
  );
};

module.exports.deleteTreatment = (req, res) => {
  const treatmentId = req.params.tid;
  const q = "DELETE FROM treatment WHERE `id`=? AND `user_id`=?";
  db.query(q, [treatmentId, getUserId(req)], async (err, data) => {
    if (err) return await handleServerError(res);
    return res.status(200).json({ message: "treatment Deleted Successfully" });
  });
};
