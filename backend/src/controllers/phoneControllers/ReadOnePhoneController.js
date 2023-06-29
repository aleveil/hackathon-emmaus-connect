const { phone } = require("../../models");

async function readOnePhoneController(req, res) {
  const { status, message } = await phone.find(parseInt(req.params.id, 10));

  return res.status(status).json(message);
}

module.exports = readOnePhoneController;
