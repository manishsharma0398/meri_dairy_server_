const Joi = require("joi");
const { customErrorMessages } = require("./customErrorList");

module.exports.transactionValidator = Joi.object({
  title: Joi.string().required().min(3).max(100).messages(customErrorMessages),
  remarks: Joi.string().min(0).max(512).messages(customErrorMessages),
  amount: Joi.number()
    .integer()
    .greater(0)
    .required()
    .messages(customErrorMessages),
  mode: Joi.string()
    .valid("cash", "online", "debt", "bank")
    .messages(customErrorMessages),
  type: Joi.string().valid("expense", "income").messages(customErrorMessages),
  date: Joi.date().required(),
});
