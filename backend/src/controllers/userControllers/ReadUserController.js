const { user } = require("../../models");

async function readUserController(req, res) {
  const { status, message } = await user.findAll();

  return res.status(status).json(message);
}

module.exports = readUserController;
