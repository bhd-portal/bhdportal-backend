const express = require("express");
const router = express.Router();

const Albums = require("../../controllers/Albums");

router.post("/", Albums.addAlbum);
router.patch("/", Albums.patchAlbum);
router.delete("/", Albums.deleteAlbum);
router.get("/", Albums.getAlbums);

module.exports = router;
