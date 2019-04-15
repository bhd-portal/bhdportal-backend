const express = require("express");
const router = express.Router();

const Document = require("../../controllers/Documents");

router.post("/", Document.addDocument);
router.patch("/", Document.patchDocument);
router.delete("/", Document.deleteDocument);
router.get("/", Document.getDocuments);

module.exports = router;
