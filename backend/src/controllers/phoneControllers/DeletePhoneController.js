const { phone } = require("../../models");

async function deletePhoneController(req, res) {
  const { status, message } = await phone.delete(parseInt(req.params.id, 10));

  return res.status(status).json(message);
}

module.exports = deletePhoneController;
