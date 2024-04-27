const drugController = require("../controllers/drugController");
const express = require("express");
const router = express.Router();

// get all products
router.get("/", drugController.allProducts);
// get product by id
router.get("/:productId", drugController.getProdutcDetail);

module.exports = router;