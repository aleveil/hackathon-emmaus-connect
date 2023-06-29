const { user } = require("../../models");

async function updateUserController(req, res) {
  // TODO validations (length, format...)

  const { status, message } = await user.update(
    req.body,
    parseInt(req.params.id, 10)
  );

  return res.status(status).json(message);
}

module.exports = updateUserController;
