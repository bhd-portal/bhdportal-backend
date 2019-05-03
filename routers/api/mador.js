const express = require("express");
const router = express.Router();

const Mador = require("../../controllers/Mador");

router.post("/", Mador.addMador);
router.patch("/", Mador.patchMador);
router.delete("/", Mador.deleteMador);
router.get("/", Mador.getMadors);

module.exports = router;
