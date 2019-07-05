const express = require("express");
const router = express.Router();

const Pictures = require("../../controllers/Pictures");

router.post("/", Pictures.addPicture);
router.patch("/", Pictures.patchPicture);
router.delete("/", Pictures.deletePicture);
router.get("/", Pictures.getPictures);

module.exports = router;
