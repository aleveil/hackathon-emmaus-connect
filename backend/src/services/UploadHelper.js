/* eslint-disable no-bitwise */
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: "public/phonePics/",
    filename(req, file, cb) {
      const extension = file.mimetype.split("/")[1];
      const fileName = `${(new Date().getTime() / 1000) | 0}.${extension}`;
      cb(null, fileName);
    },
  }),
  limits: {
    // make the limit of the file (third element)
    fileSize: 1024 * 1024 * 15, // MB
  },
  fileFilter: (req, file, cb) => {
    const valid =
      file.mimetype === "image/jpeg" || file.mimetype === "image/png";
    cb(null, valid);
  },
});

module.exports = upload;
