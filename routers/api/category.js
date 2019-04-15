const express = require("express");
const router = express.Router();

const Category = require("../../controllers/Category");

router.post("/", Category.addCategory);
router.patch("/", Category.patchCategory);
router.delete("/", Category.deleteCategory);
router.get("/", Category.getCategories);

module.exports = router;
