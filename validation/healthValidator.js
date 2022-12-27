const Joi = require("joi");
const { customErrorMessages } = require("./customErrorList");

module.exports.healthValidator = Joi.object({
  animal_id: Joi.number().integer().greater(0).required(),
  treatment_type: Joi.string()
    .valid("vaccine", "deworming")
    .messages(customErrorMessages),
  medicine: Joi.string()
    .required()
    .min(5)
    .max(512)
    .messages(customErrorMessages),
  date: Joi.date().required(),
});
