module.exports.handleServerError = async (res) => {
  return res.status(500).json({
    message: "Something went wrong. Please try again later",
  });
};
