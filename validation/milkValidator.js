const Joi = require("joi");
const { customErrorMessages } = require("./customErrorList");

module.exports.milkValidator = Joi.object({
  time: Joi.string().valid("morning", "evening").messages(customErrorMessages),
  date: Joi.date().required(),
  quantity: Joi.number().greater(0).required(),
  a_id: Joi.number().integer().greater(0).required(),
});
