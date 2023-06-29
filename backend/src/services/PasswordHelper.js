const argon2 = require("argon2");

async function passwordHasher(password) {
  try {
    return await argon2.hash(password);
  } catch (err) {
    console.warn(err);
  }
  return false;
}

async function passwordVerification(password, hashedPassword) {
  try {
    return await argon2.verify(hashedPassword, password);
  } catch (err) {
    // internal failure
  }
  return false;
}

module.exports = {
  passwordHasher,
  passwordVerification,
};
