const fs = require("fs");
const { phone } = require("../../models");

async function updatePhoneController(req, res) {
  // TODO validations (length, format...)
  if (req.file) {
    if (req.body.image !== "unknownPhone.png") {
      const path = `./public/phonePics/${req.body.image}`;

      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
        }
        // file removed
      });
    }
    req.body.image = req.file.filename;
  } else if (req.body.deletePic) {
    const path = `./public/phonePics/${req.body.image}`;

    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
      }
      // file removed
    });
    req.body.image = "unknownPhone.png";
    delete req.body.deletePic;
  }

  const { status, message } = await phone.update(
    req.body,
    parseInt(req.params.id, 10)
  );

  return res.status(status).json(message);
}

module.exports = updatePhoneController;
