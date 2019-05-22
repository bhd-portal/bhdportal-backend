const express = require("express");
const router = express.Router();

const Powerpoint = require("../../controllers/Powerpoints");

router.post("/", Powerpoint.addPowerpoint);
router.patch("/", Powerpoint.patchPowerpoint);
router.delete("/", Powerpoint.deletePowerpoint);
router.get("/", Powerpoint.getPowerpoints);

module.exports = router;
