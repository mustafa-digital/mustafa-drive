const bcrypt = require("bcrypt");

async function validatePassword(password, hash) {
  const result = await bcrypt.compare(password, hash);
  return result;
}

async function genPasswordHash(password) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  validatePassword,
  genPasswordHash,
};
