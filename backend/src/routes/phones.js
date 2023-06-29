const express = require("express");

const router = express.Router();

const upload = require("../services/UploadHelper");
const isAdminMiddleware = require("../middleware/isAdminMiddleware");

const readPhoneController = require("../controllers/phoneControllers/ReadPhoneController");
const readOnePhoneController = require("../controllers/phoneControllers/ReadOnePhoneController");
const updatePhoneController = require("../controllers/phoneControllers/UpdatePhoneController");
const createPhoneController = require("../controllers/phoneControllers/CreatePhoneController");
const deletePhoneController = require("../controllers/phoneControllers/DeletePhoneController");

router.get("/", readPhoneController);
router.get("/:id", readOnePhoneController);
router.use(isAdminMiddleware);
router.put("/:id", upload.single("image"), updatePhoneController);
router.post("/", upload.single("image"), createPhoneController);
router.delete("/:id", deletePhoneController);

module.exports = router;
