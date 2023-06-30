const { phone } = require("../../models");

async function createPhoneController(req, res) {
  // TODO validations (length, format...)
  const { status, message } = await phone.insert(
    JSON.parse(req.body.phone),
    req.file ? req.file.filename : "unknownPhone.png"
  );
  return res.status(status).json(message);
}

module.exports = createPhoneController;
