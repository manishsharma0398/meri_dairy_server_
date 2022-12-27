const Joi = require("joi");
const { customErrorMessages } = require("./customErrorList");

module.exports.animalValidator = Joi.object({
  animal_type: Joi.string()
    .required()
    .min(3)
    .max(45)
    .messages(customErrorMessages),
  identifier: Joi.string()
    .required()
    .min(5)
    .max(100)
    .messages(customErrorMessages),
  breed: Joi.string().required().min(6).max(100).messages(customErrorMessages),
  gender: Joi.string().required().min(4).max(11).messages(customErrorMessages),
  animal_status: Joi.string()
    .required()
    .min(5)
    .max(100)
    .messages(customErrorMessages),
  date: Joi.date().required().messages({
    "any.required": "Yes",
  }),
  remarks: Joi.string().min(0).max(255).messages(customErrorMessages),
  bull_name: Joi.string().min(0).max(100).messages(customErrorMessages),
  bull_breed: Joi.string().min(0).max(100).messages(customErrorMessages),
  dam_name: Joi.string().min(0).max(100).messages(customErrorMessages),
  dam_breed: Joi.string().min(0).max(100).messages(customErrorMessages),
});
