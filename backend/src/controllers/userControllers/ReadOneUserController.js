const { user } = require("../../models");

async function readOneUserController(req, res) {
  const { status, message } = await user.find(parseInt(req.params.id, 10));

  return res.status(status).json(message);
}

module.exports = readOneUserController;
