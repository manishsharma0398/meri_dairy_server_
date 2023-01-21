import Joi from "joi";
import { customErrorMessages } from "./customErrorList.js";

export const register_validator = Joi.object({
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({ ...customErrorMessages, "any.only": "Passwords do not match" }),
  password: Joi.string()
    .required()
    .min(6)
    .max(30)
    .messages(customErrorMessages),
  email: Joi.string().email().required().messages(customErrorMessages),
});

export const login_validator = Joi.object({
  email: Joi.string().email().required().messages(customErrorMessages),
  password: Joi.string().required().messages(customErrorMessages),
});
