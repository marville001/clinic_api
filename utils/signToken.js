const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config");

module.exports = (data) => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};