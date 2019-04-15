const express = require("express");
const router = express.Router();

const Product = require("../../controllers/Product");

router.post("/", Product.addProduct);
router.patch("/", Product.patchProduct);
router.delete("/", Product.deleteProduct);
router.get("/", Product.getProducts);

module.exports = router;
