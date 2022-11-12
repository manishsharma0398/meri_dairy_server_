const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const verified = jwt.verify(
      `${token.split(" ")[1]}`,
      process.env.TOKEN_SECRET
    );
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid Token!" });
  }
};
