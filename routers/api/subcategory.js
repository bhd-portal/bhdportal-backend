const express = require("express");
const router = express.Router();

const SubCategory = require("../../controllers/SubCategory");

router.post("/", SubCategory.addSubCategory);
router.patch("/", SubCategory.patchSubCategory);
router.delete("/", SubCategory.deleteSubCategory);
router.get("/", SubCategory.getSubCategories);

module.exports = router;
