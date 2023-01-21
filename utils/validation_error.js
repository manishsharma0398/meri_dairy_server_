export const validation_error = async (validation_model, inputs, response) => {
  try {
    await validation_model.validateAsync(inputs, {
      abortEarly: false,
    });
  } catch (errors) {
    const authErr = [];
    errors.details.forEach((err) => {
      const key = err.path[0];
      const obj = {};
      obj[key] = err.message;
      authErr.push(obj);
    });
    return response.status(409).json(authErr);
  }
};
