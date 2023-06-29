const { user } = require("../../models");

async function deleteUserController(req, res) {
  const { status, message } = await user.delete(parseInt(req.params.id, 10));

  return res.status(status).json(message);
}

module.exports = deleteUserController;
