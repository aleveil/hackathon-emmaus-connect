const { phone } = require("../../models");

async function createPhoneController(req, res) {
  // TODO validations (length, format...)
  const { status, message } = await phone.insert(
    req.body,
    req.file ? req.file.filename : "unknownPhone.png"
  );
  return res.status(status).json(message);
}

module.exports = createPhoneController;
