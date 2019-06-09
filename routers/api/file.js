const express = require("express");
const router = express.Router();

const Files = require("../../controllers/Files");

router.post("/", Files.addFile);
router.delete("/", Files.deleteFile);
router.patch("/", Files.patchFile);
router.get("/", Files.getFile);

module.exports = router;
