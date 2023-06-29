const express = require("express");

const router = express.Router();

const readPhoneController = require("../controllers/phoneControllers/ReadPhoneController");
const readOnePhoneController = require("../controllers/phoneControllers/ReadOnePhoneController");
const updatePhoneController = require("../controllers/phoneControllers/UpdatePhoneController");
const createPhoneController = require("../controllers/phoneControllers/CreatePhoneController");
const deletePhoneController = require("../controllers/phoneControllers/DeletePhoneController");

router.get("/", readPhoneController);
router.get("/:id", readOnePhoneController);
router.put("/:id", updatePhoneController);
router.post("/", createPhoneController);
router.delete("/:id", deletePhoneController);

module.exports = router;
