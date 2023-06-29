const { phone } = require("../../models");

async function readPhoneController(req, res) {
  const { status, message } = await phone.findAll();

  return res.status(status).json(message);
}

module.exports = readPhoneController;
