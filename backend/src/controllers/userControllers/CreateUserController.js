const { user } = require("../../models");

async function createUserController(req, res) {
  // TODO validations (length, format...)
  const { status, message } = await user.insert(req.body);

  return res.status(status).json(message);
}

module.exports = createUserController;
