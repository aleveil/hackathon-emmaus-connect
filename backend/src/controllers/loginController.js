const models = require("../models");

async function loginController(req, res) {
  const { status, message } = await models.auth.login(req.body);

  return res.status(status).json(message);
}

module.exports = loginController;
