const { phone } = require("../../models");

async function updatePhoneController(req, res) {
  // TODO validations (length, format...)

  const { status, message } = await phone.update(
    req.body,
    parseInt(req.params.id, 10)
  );

  return res.status(status).json(message);
}

module.exports = updatePhoneController;
