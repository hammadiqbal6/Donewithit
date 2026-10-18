const config = require("config");

const getJwtPrivateKey = () =>
  process.env.JWT_PRIVATE_KEY || config.get("jwtPrivateKey");

module.exports = { getJwtPrivateKey };
