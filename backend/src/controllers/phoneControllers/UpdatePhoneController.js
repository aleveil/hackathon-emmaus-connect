const fs = require("fs");
const { phone } = require("../../models");

async function updatePhoneController(req, res) {
  req.body.phone = JSON.parse(req.body.phone);
  // TODO validations (length, format...)
  if (req.file) {
    if (req.body.phone.image !== "unknownPhone.png") {
      const path = `./public/phonePics/${req.body.phone.image}`;

      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
        }
        // file removed
      });
    }
    req.body.phone.image = req.file.filename;
  } else if (req.body.phone.deletePic) {
    const path = `./public/phonePics/${req.body.phone.image}`;

    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
      }
      // file removed
    });
    req.body.phone.image = "unknownPhone.png";
    delete req.body.phone.deletePic;
  }

  const { status, message } = await phone.update(
    req.body.phone,
    parseInt(req.params.id, 10)
  );

  return res.status(status).json(message);
}

module.exports = updatePhoneController;
