const { phone } = require("../../models");

async function createPhoneController(req, res) {
  // TODO validations (length, format...)
  const { status, message } = await phone.insert(req.body);

  return res.status(status).json(message);
}

module.exports = createPhoneController;
