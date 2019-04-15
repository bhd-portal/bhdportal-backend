const express = require("express");
const router = express.Router();

const ABGuidanceDocument = require("../../controllers/ABGuidanceDocument");

router.post("/", ABGuidanceDocument.addDocument);
router.patch("/", ABGuidanceDocument.patchDocument);
router.delete("/", ABGuidanceDocument.deleteDocument);
router.get("/", ABGuidanceDocument.getDocuments);

module.exports = router;
