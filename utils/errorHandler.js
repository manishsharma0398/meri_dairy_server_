module.exports.handleServerError = async (res) => {
  return res.status(500).json({
    validationError: false,
    message: "Something went wrong. Please try again later",
  });
};
