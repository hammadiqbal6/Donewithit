const jwt = require("jsonwebtoken");
const { getJwtPrivateKey } = require("../utilities/jwt");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send({ error: "Access denied. No token provided." });

  try {
    const payload = jwt.verify(token, getJwtPrivateKey());
    req.user = payload;
    next();
  } catch (err) {
    res.status(400).send({ error: "Invalid token." });
  }
};
